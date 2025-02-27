import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/animations/loading_note.json";

const CreateAINoteModal = ({
  onClose,
  AINote,
  title,
  isLoading,
  selectedStartDate,
  selectedEndDate,
}: {
  onClose: () => void;
  AINote: AINoteType | undefined;
  title: string;
  isLoading: boolean;
  selectedStartDate: selectedDateType;
  selectedEndDate: selectedDateType;
}) => {
  const AIresult =
    AINote?.choices?.[AINote.choices.length - 1]?.message?.content;
  const chatContent = AIresult?.split("회의 내용:")?.[1]?.trim() || "";
  // 참석 멤버를 배열로 추출 ex. ["member1", "member2", "member3"]
  const chatMember = AIresult?.match(
    /회의 참석자:\s*([\s\S]*?)\n2. 회의 내용/
  )?.[1]
    ?.trim()
    ?.split(/\s+/);

  const chatStartTime = `${selectedStartDate.year}.${selectedStartDate.month}.${selectedStartDate.day}. ${selectedStartDate.ampm} ${selectedStartDate.hour}:${selectedStartDate.minute}`;
  const chatEndTime = `${selectedEndDate.year}.${selectedEndDate.month}.${selectedEndDate.day}. ${selectedEndDate.ampm} ${selectedEndDate.hour}:${selectedEndDate.minute}`;

  //AI가 생성한 회의록 내용을 초기값으로 지정
  const [isAINote, setIsAINote] = useState(chatContent);

  const handleAINote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsAINote(e.target.value);
  };
  useEffect(() => {
    console.log(AINote);
  }, []);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus(); // textarea에 포커스 설정
      const length = textAreaRef.current.value.length; // 텍스트 길이
      textAreaRef.current.setSelectionRange(length, length); // 커서를 끝으로 이동
    }
  }, [AINote]);

  return (
    <>
      {isLoading ? (
        <div>
          <Lottie
            animationData={LoadingAnimation}
            loop={true}
            className="w-80 h-80"
          />
        </div>
      ) : (
        <div className="w-[1000px] h-[613px] bg-white flex flex-col py-[30px] px-[50px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex justify-center">
              <span className="font-bold text-[16px] text-black">{title}</span>
            </div>
            <div className="flex items-center gap-[20px]">
              <span className="font-bold text-[16px] text-black">회의기간</span>
              <span className="text-[14px] text-black">
                {chatStartTime} ~ {chatEndTime}
              </span>
            </div>
            <div className="flex items-center gap-[20px]">
              <span className="font-bold text-[16px] text-black">참여인원</span>
              <div className="flex items-center gap-[10px]">
                {chatMember &&
                  chatMember?.map((member) => (
                    <span className="text-[14px] text-black">{member}</span>
                  ))}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <span className="font-bold text-[16px] text-black">회의내용</span>
              <div className="w-[900px] h-[300px] pt-[10px] px-[10px] border overflow-y-auto">
                <textarea
                  ref={textAreaRef}
                  value={isAINote}
                  onChange={handleAINote}
                  className="w-full h-full resize-none focus:outline-none"
                ></textarea>
              </div>
              <div className=" h-auto flex flex-col justify-center">
                <span className="text-center font-bold text-[16px] text-black">
                  AI가 작성한 희의록입니다.
                  <br /> 등록하시겠습니까?
                </span>
                <div className="flex justify-center gap-[20px] mt-[15px]">
                  <Button
                    text="등록"
                    size="md"
                    css="w-[128px] h-[29px] border border-main-green01 bg-white text-main-green01 font-bold"
                  />
                  <Button
                    text="취소"
                    size="md"
                    css="w-[128px] h-[29px] border border-logo-gree1 bg-logo-green text-main-beige01 font-bold"
                    onClick={onClose}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAINoteModal;
