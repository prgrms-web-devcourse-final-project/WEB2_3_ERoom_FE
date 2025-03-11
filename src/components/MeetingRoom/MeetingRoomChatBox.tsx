import Button from "../common/Button";
import SendIcon from "../../assets/icons/sendMessage.svg";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import MeetingRoomMessage from "./MeetingRoomMessage";
import NoteListModal from "../modals/NoteListModal";
import { getMeetingroom } from "../../api/meetingroom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StompSubscription } from "@stomp/stompjs";
import { useAuthStore } from "../../store/authStore";
import useWebSocketStore from "../../store/useWebSocketStore";
import { showToast } from "../../utils/toastConfig";

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

  //메시지 데이터 업데이트
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

  const { stompClient, connectWebSocket } = useWebSocketStore(); // WebSocket 가져오기
  const [currentSubscription, setCurrentSubscription] =
    useState<StompSubscription | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = useAuthStore((state) => state.member?.id);
  const queryClient = useQueryClient(); // 올바른 방식

  //  WebSocket 연결 및 채팅방 구독
  useEffect(() => {
    if (!messageList?.groupChatRoom?.chatRoomId) return;
    if (!accessToken || !memberId) return;
    const chatRoomId = messageList.groupChatRoom.chatRoomId;

    //  WebSocket이 없으면 연결
    connectWebSocket(accessToken, memberId);

    if (!stompClient) {
      console.warn("WebSocket이 아직 연결되지 않음.");
      return;
    }

    //  기존 구독 해제 후 새 채팅방 구독
    if (currentSubscription) {
      console.log(` 기존 구독 해제: ${currentSubscription.id}`);
      stompClient.unsubscribe(currentSubscription.id);
    }

    const subscriptionPath = `/topic/chatroom/${chatRoomId}`;
    console.log(` 새 채팅방 구독: ${subscriptionPath}`);

    const subscription = stompClient.subscribe(subscriptionPath, (msg) => {
      const newMessage = JSON.parse(msg.body);
      console.log(" 받은 메시지:", newMessage);
      queryClient.invalidateQueries({ queryKey: ["meetingroom", projectId] });
    });

    setCurrentSubscription(subscription);

    return () => {
      if (subscription) {
        console.log(`구독 해제 ${subscriptionPath}`);
        subscription.unsubscribe();
      }
    };
  }, [messageList?.groupChatRoom?.chatRoomId, projectId, stompClient]);

  const userName = useAuthStore((state) => state.member?.username);
  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (!stompClient || !text.trim() || !messageList?.groupChatRoom.chatRoomId)
      return;

    if (
      messageList.status === "COMPLETED" ||
      messageList.status === "BEFORE_START"
    ) {
      showToast("error", `진행 중인 프로젝트가 아닙니다`);
      return;
    }
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
      if (isComposing) return; // 한글 입력 중이면 return
      e.preventDefault(); // 기본 Enter 동작(줄바꿈) 방지
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
            placeholder={
              messageList?.status === "IN_PROGRESS"
                ? "채팅 내용을 입력해주세요"
                : "진행 중인 프로젝트가 아닙니다"
            }
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
