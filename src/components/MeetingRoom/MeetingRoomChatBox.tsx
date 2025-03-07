import Button from "../common/Button";
import SendIcon from "../../assets/icons/sendMessage.svg";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import MeetingRoomMessage from "./MeetingRoomMessage";
import NoteListModal from "../modals/NoteListModal";
import { getMeetingroom } from "../../api/meetingroom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useAuthStore } from "../../store/authStore";

const MeetingRoomChatBox = ({
  css,
  projectId,
}: {
  css?: string;
  projectId: number;
}) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false); //조합문자 판별

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "27px";
    }
  }, []);

  const handleHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "27px";
      let newHeight = textAreaRef.current.scrollHeight;

      if (newHeight > 120) {
        newHeight = 120;
        textAreaRef.current.style.overflowY = "auto";
      } else {
        textAreaRef.current.style.overflowY = "hidden";
      }

      textAreaRef.current.style.height = `${newHeight}px`;

      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }
  };

  //채팅 내역 API 요청하는 useQuery
  const { data: messageList = null } = useQuery<MeetingroomType>({
    queryKey: ["meetingroom", projectId],
    queryFn: () => getMeetingroom(projectId),
    select: (data) => data || ({} as MeetingroomType),
  });

  useEffect(() => {
    if (messageList?.groupChatRoom?.messages) {
      setMessages(messageList.groupChatRoom.messages);
    }
    console.log("API 요청 중... projectId:", projectId);
  }, [projectId]);

  useEffect(() => {
    console.log("채팅 내역 데이터:", messageList);
    console.log(
      "채팅 내역 메시지 데이터:",
      messageList?.groupChatRoom?.messages
    );
    if (messageList?.groupChatRoom?.messages) {
      setMessages(messageList.groupChatRoom.messages);
    }
  }, [messageList]);

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const queryClient = useQueryClient();

  //웹소켓 연결 설정
  useEffect(() => {
    if (!messageList?.groupChatRoom?.chatRoomId) return;

    if (messageList?.groupChatRoom?.messages) {
      setMessages(messageList.groupChatRoom.messages);
    }

    const { accessToken } = useAuthStore.getState();

    const socket = new SockJS(`${import.meta.env.VITE_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // 재연결 설정 (5초)
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        console.log("Connected to WebSocket");

        // 기존 구독을 해제하고 새로 구독
        client.unsubscribe(
          `/topic/chatroom/${messageList.groupChatRoom.chatRoomId}`
        );

        // 채팅방 구독
        client.subscribe(
          `/topic/chatroom/${messageList.groupChatRoom.chatRoomId}`,
          (msg) => {
            const newMessage = JSON.parse(msg.body);
            console.log("새로운 메시지 도착:", newMessage);

            // 새 메시지를 추가하지 않고, 서버 데이터를 다시 불러오도록 트리거
            queryClient.invalidateQueries({
              queryKey: ["meetingroom", projectId],
            });
          }
        );

        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
      },
    });
    client.activate();

    return () => {
      if (client) client.deactivate();
    };
  }, [messageList?.groupChatRoom.chatRoomId]);

  const userName = useAuthStore((state) => state.member?.username);
  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!stompClient || !text.trim() || !messageList?.groupChatRoom.chatRoomId)
      return;

    stompClient.publish({
      destination: "/app/chat/send",
      body: JSON.stringify({
        senderName: userName,
        message: text,
        chatRoomId: messageList.groupChatRoom.chatRoomId,
        senderProfile: messageList.groupChatRoom.senderProfile, // 프로필 이미지 추가
      }),
    });

    setText("");

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "27px";
    }

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (isComposing) return;
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const [isOpenNoteList, setIsOpenNoteList] = useState(false);

  const handleOpenNoteList = () => {
    setIsOpenNoteList((prev) => !prev);
  };

  const [isClientReady, setIsClientReady] = useState(false);
  // WebSocket 연결 후 실제 UI가 렌더링될 때 트리거
  useEffect(() => {
    if (stompClient) {
      console.log(" WebSocket 연결 완료, UI 전환됨");
      setIsClientReady(true); //  WebSocket 연결 후 UI 렌더링 트리거
    }
  }, [stompClient]);

  useEffect(() => {
    if (isClientReady && chatContainerRef.current) {
      setTimeout(() => {
        console.log("🛠 스크롤 이동 실행!");
        chatContainerRef.current!.scrollTop =
          chatContainerRef.current?.scrollHeight ?? 0;
      }, 100); // UI가 렌더링된 후 실행 보장
    }
  }, [isClientReady, messages]); //

  if (!stompClient) {
    return (
      <div
        className={twMerge(
          "flex flex-col flex-grow px-[30px] pt-[30px] gap-[10px] relative min-h-full",
          css
        )}
      >
        <div className="flex justify-between w-[calc(100%-60px)]">
          <div className="bg-gray-200 h-full w-[120px] h-[20px] rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-full w-[80px] h-[30px] rounded-md animate-pulse"></div>
        </div>

        <div className="flex flex-col flex-grow w-[calc(100%-60px)] gap-[10px]">
          <div className="flex-grow border bg-gray-100 animate-pulse border-main-green01 rounded-[10px] overflow-hidden">
            <div className="w-full h-[250px] bg-gray-100 animate-pulse"></div>
          </div>

          <div className="w-full h-auto flex bg-main-green01 rounded-[10px] pr-[15px] items-center p-2">
            <div className="bg-gray-200 w-[93%] h-[32px] rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        `flex flex-col flex-grow px-[30px] pt-[30px] gap-[10px] relative min-h-full`,
        css
      )}
    >
      <div className="flex justify-between w-[calc(100%-60px)] ">
        <span className="font-bold">{messageList?.projectName}</span>
        <div className="flex gap-[10px]">
          <Button
            text="회의록"
            size="sm"
            css="border-main-green01 bg-white text-main-green01 text-[14px] font-bold"
            onClick={handleOpenNoteList}
          />
        </div>
        {isOpenNoteList && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <NoteListModal
              onClose={handleOpenNoteList}
              chatRoomId={messageList?.groupChatRoom.chatRoomId}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-grow w-[calc(100%-60px)] gap-[10px]">
        <div
          ref={chatContainerRef}
          className="flex-grow h-0 border-main-green01 bg-white border-[1px] rounded-[10px] overflow-y-auto scrollbar-none "
        >
          <MeetingRoomMessage messages={messages} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="w-full h-auto flex bg-main-green01 rounded-[10px] pr-[15px] items-center "
        >
          <textarea
            ref={textAreaRef}
            value={text}
            onChange={handleHeight}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            className="ml-[15px] mr-[10px] w-full my-[5px] rounded-[5px] bg-white resize-none px-[10px] pt-[7px] pb-[5px] text-[14px] focus:outline-none overflow-y-auto scrollbar-none leading-[17px] placeholder:text-[14px] max-h-[120px] min-h-[27px]"
            style={{
              height: "32px",
              minHeight: "32px",
              maxHeight: "120px",
            }}
            spellCheck="false" // 맞춤법검사 비활성화
            placeholder="채팅 내용을 입력해주세요"
          ></textarea>
          <button type="submit">
            <img src={SendIcon} alt="전송버튼" className="cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default MeetingRoomChatBox;
