import { useRef, useState } from "react";
import Button from "../common/Button";

const NoteDetailModal = ({
  onClose,
  onGoBack,
}: {
  onClose: () => void;
  onGoBack: () => void;
}) => {
  //추후 기존 회의록 내용을 초기값으로 지정
  const [isAINote, setIsAINote] = useState("기존 회의록 내용");
  const [isEdit, setIsEdit] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAINote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsAINote(e.target.value);
  };
  const handleEdit = () => {
    setIsEdit((prev) => {
      const newEditState = !prev;

      if (!newEditState) {
        // 편집 모드일 때
        setTimeout(() => {
          if (textareaRef.current) {
            const length = textareaRef.current.value.length;
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(length, length);
          }
        }, 0);
      } else {
        textareaRef.current?.blur();
      }
      return newEditState;
    });
  };

  return (
    <div className="w-[1000px] h-[613px] bg-white flex flex-col py-[30px] px-[50px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-center">
          <span className="font-bold text-[16px] text-black">회의록 제목</span>
        </div>
        <div className="flex items-center gap-[20px]">
          <span className="font-bold text-[16px] text-black">회의기간</span>
          <span className="text-[14px] text-black">
            2025.02.13. AM 09:00 ~ 2025.02.13. AM 11:15
          </span>
        </div>
        <div className="flex items-center gap-[20px]">
          <span className="font-bold text-[16px] text-black">참여인원</span>
          <div className="flex items-center gap-[10px]">
            <span className="text-[14px] text-black">박선형</span>
            <span className="text-[14px] text-black">한규혁</span>
            <span className="text-[14px] text-black">성송원</span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="flex justify-between w-full">
            <span className="font-bold text-[16px] text-black">회의내용</span>
            <Button
              text={isEdit ? "수정" : "등록"}
              size="sm"
              css={`w-[38px] h-[24px] px-[5px] py-[2px] text-[14px] ${
                isEdit
                  ? "bg-white border border-logo-green text-logo-green"
                  : "border border-logo-green1 bg-logo-green text-main-beige01"
              }`}
              onClick={handleEdit}
            />
          </div>
          <div className="w-[900px] h-[300px] pt-[10px] px-[10px] border overflow-y-auto">
            <textarea
              value={isAINote}
              ref={textareaRef}
              onChange={handleAINote}
              className="w-full h-full resize-none focus:outline-none"
              disabled={isEdit}
            ></textarea>
          </div>
          <div className=" h-auto flex justify-center mt-[15px] gap-[20px]">
            <Button
              text="이전"
              size="md"
              onClick={onGoBack}
              css="w-[128px] h-[29px] border border-main-green01 bg-white text-main-green01 font-bold"
            />
            <Button
              text="닫기"
              size="md"
              css="w-[128px] h-[29px] border border-logo-green1 bg-logo-green text-main-beige01 font-bold"
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailModal;
