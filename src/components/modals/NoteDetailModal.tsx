import { useRef, useState } from "react";
import Button from "../common/Button";
import { formatTo24Hour } from "../../utils/aiNote/dateUtils";
import { useMutation } from "@tanstack/react-query";
import { editAINote } from "../../api/meetingroom";
import { showToast } from "../../utils/toastConfig";

const NoteDetailModal = ({
  onClose,
  onGoBack,
  note,
  refetchAINoteList,
}: {
  onClose: () => void;
  onGoBack: () => void;
  note: AINoteListType | undefined;
  refetchAINoteList: () => void;
}) => {
  //추후 기존 회의록 내용을 초기값으로 지정
  const [isAINote, setIsAINote] = useState(note?.content);
  const [isEdit, setIsEdit] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAINote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsAINote(e.target.value);
  };

  //AI 회의록 등록(수정 반영해)
  const { mutateAsync: fetchEditAINote } = useMutation<
    void,
    Error,
    { reportId: number | undefined; content: string | undefined }
  >({
    mutationFn: async ({ reportId, content }) =>
      await editAINote(reportId, content),
    onSuccess: () => {
      showToast("success", "회의록이 수정되었습니다.");
    },
    onError: (error) => {
      console.error("회의록 수정 실패:", error);
    },
  });

  const reportId = note?.id;

  const handleRegisterAINote = async () => {
    if (reportId === null || isAINote === "") {
      console.error("유효한 reportId가 없거나 회의록 내용이 비어 있습니다.");
      return;
    }

    // 값이 변경되지 않았다면 API 요청을 하지 않음
    if (isAINote === note?.content) {
      // console.log("변경된 내용이 없어 수정 요청을 보내지 않습니다.");
      return;
    }
    // console.log("등록 요청 reportId:", reportId);
    // console.log("등록 요청 content:", isAINote);

    try {
      await fetchEditAINote({ reportId, content: isAINote });
      refetchAINoteList();
    } catch (error) {
      console.error("회의록 등록 실패:", error);
    }
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

  const handleGoBack = () => {
    refetchAINoteList();
    onGoBack();
  };

  const startDateFormatted = formatTo24Hour(note?.startDate);
  const endDateFormatted = formatTo24Hour(note?.endDate);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[613px] bg-white flex flex-col py-[30px] px-[50px]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-center">
          <span className="font-bold text-[16px] text-black">
            {note?.title}
          </span>
        </div>
        <div className="flex items-center gap-[20px]">
          <span className="font-bold text-[16px] text-black">회의기간</span>
          <span className="text-[14px] text-black">
            {startDateFormatted} ~ {endDateFormatted}
          </span>
        </div>
        <div className="flex items-center gap-[20px]">
          <span className="font-bold text-[16px] text-black">참여인원</span>
          <div className="flex items-center gap-[10px]">
            {note?.members &&
              note.members.map((member, index) => (
                <span key={index} className="text-[14px] text-black">
                  {member}
                </span>
              ))}
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
              onClick={() => {
                if (!isEdit) {
                  handleRegisterAINote();
                }
                handleEdit();
              }}
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
              onClick={handleGoBack}
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
