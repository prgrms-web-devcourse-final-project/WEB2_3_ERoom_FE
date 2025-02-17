import Button from "../common/Button";
import SendIcon from "../../assets/icons/sendMessage.svg";
import SampleProfile from "../../assets/sample_default_profile.png";
import { useEffect, useRef, useState } from "react";
const MeetingRoomChatBox = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false); //조합문자 판별

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "27px";
    }
  }, []);

  useEffect(() => {
    // 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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

  const handleSendMessage = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    if (text.trim() === "") return;
    setMessages((prevMessages) => [...prevMessages, text]);
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

  return (
    <div className="flex flex-col px-[30px] pt-[30px] gap-[10px] relative min-h-full">
      <div className="flex justify-between w-[calc(100%-60px)] ">
        <span className="font-bold">프로젝트 명</span>
        <div className="flex gap-[10px]">
          <Button
            text="회의록"
            size="sm"
            css="border-main-green01 bg-white text-main-green01 text-[14px] font-bold"
          />
          <Button
            text="미팅룸 나가기"
            to="/projectRoom"
            size="sm"
            css="border-header-red bg-header-red/70 text-white text-[14px] font-bold"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow w-[calc(100%-60px)] gap-[10px]">
        <div
          ref={chatContainerRef}
          className="flex-grow h-0 border-main-green01 bg-white border-[1px] rounded-[10px] overflow-y-auto scrollbar-none "
        >
          {/* 사용자가 아닐 경우 프로필 사진과 이름 표시 */}
          <div className="flex flex-col mx-[10px] pr-[50px] my-[10px] gap-[5px]">
            <div className="flex items-center gap-[10px]">
              <img
                src={SampleProfile}
                alt="샘플프로필이미지"
                className="w-[30px] h-[30px] rounded-full"
              />
              <span className="text-[14px]">사용자이름</span>
            </div>
            {/* 팀원이 보낸 채팅 내용 bg-main-green02 */}
            <div className="w-auto h-auto min-h-[33px] bg-main-green02 rounded-[5px] px-[10px] py-[8px] max-w-[calc(100%-50px)] self-start">
              <span className="text-[14px] whitespace-pre-wrap">내용</span>
            </div>
          </div>
          {/* 사용자가 보낸 채팅일 경우 채팅만 표시 bg-main-beige */}
          {messages.map((message, index) => (
            <div
              key={index}
              className="flex flex-col mx-[10px] pl-[50px] my-[10px] gap-[5px]"
            >
              <div className="flex justify-end w-auto h-auto min-h-[33px] bg-main-beige rounded-[5px] px-[10px] py-[8px] max-w-[calc(100%-50px)] self-end">
                <span className="text-[14px] whitespace-pre-wrap">
                  {message}
                </span>
              </div>
            </div>
          ))}
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
            className="ml-[15px] mr-[10px] w-full my-[5px] rounded-[5px] bg-white resize-none px-[10px] pt-[5px] pb-[8px] text-[14px] focus:outline-none overflow-y-auto scrollbar-none leading-[17px] placeholder:text-[14px] max-h-[120px] min-h-[27px]"
            style={{
              height: "27px",
              minHeight: "27px",
              maxHeight: "120px",
            }}
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
