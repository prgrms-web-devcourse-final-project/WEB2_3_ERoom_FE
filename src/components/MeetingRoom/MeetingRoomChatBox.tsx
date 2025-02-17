import Button from "../common/Button";
import SendIcon from "../../assets/icons/sendMessage.svg";
import { useEffect, useRef, useState } from "react";
const MeetingRoomChatBox = () => {
  const [text, setText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "27px";
    }
  }, []);

  const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    }
  };

  return (
    <div className="flex flex-col p-[30px] gap-[10px] relative h-[calc(100vh-60px)]">
      <div className="flex justify-between">
        <span className="font-bold">프로젝트 명</span>
        <div className="flex gap-[10px]">
          <Button
            text="회의록"
            size="sm"
            css="border-main-green01 bg-white text-main-green01 text-[14px] font-bold"
          />
          <Button
            text="미팅룸 나가기"
            size="sm"
            css="border-header-red bg-header-red/70 text-white text-[14px] font-bold"
          />
        </div>
      </div>
      <div className="flex-grow border-main-green01 bg-white border-[1px] rounded-[10px] overflow-y-auto scrollbar-none ">
        채팅내용
      </div>
      <div className="w-full h-auto flex bg-main-green01 rounded-[10px] pr-[15px] items-end">
        <textarea
          ref={textAreaRef}
          value={text}
          onChange={handleMessage}
          className="ml-[15px] mr-[10px] w-full my-[5px] rounded-[5px] bg-white resize-none px-[10px] pt-[5px] pb-[8px] text-[14px] focus:outline-none overflow-y-auto leading-[17px] placeholder:text-[14px] max-h-[120px] min-h-[27px]"
          style={{
            height: "27px",
            minHeight: "27px",
            maxHeight: "120px",
          }}
          placeholder="채팅 내용을 입력해주세요"
        ></textarea>
        <button>
          <img src={SendIcon} alt="전송버튼" className="cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default MeetingRoomChatBox;
