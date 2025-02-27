import { useState } from "react";
import Button from "../common/Button";
import DayNoteList from "../NoteList/DayNoteList";
import CreateNotePeriodModal from "./CreateNotePeriodModal";

const NoteListModal = ({
  onClose,
  chatRoomId,
}: {
  onClose: () => void;
  chatRoomId: number;
}) => {
  const [isCreateNote, setIsCreateNote] = useState(false);
  const handleCreateNotePeriod = () => {
    setIsCreateNote(true);
  };

  return (
    <>
      {!isCreateNote ? (
        <div className="flex flex-col bg-white w-[500px] max-h-[643px] px-[50px] py-[30px]">
          <div>
            <div className="flex justify-center mb-[20px]">
              <span className="font-bold text-[16px] text-main-green">
                회의록
              </span>
            </div>
            <div className="max-h-[500px] flex-grow flex flex-col overflow-y-auto scrollbar-none mb-[20px] gap-[20px]">
              <DayNoteList onClose={onClose} />
              <DayNoteList onClose={onClose} />
            </div>
            <div className="flex justify-between mb-0 mt-auto">
              <Button
                size="md"
                text="AI 회의록 생성"
                css="w-[90px] h-[24px] text-[12px] font-bold border border-main-green01 text-main-green01"
                onClick={handleCreateNotePeriod}
              />
              <Button
                size="sm"
                css="w-[41px] h-[24px] text-[12px] font-bold bg-logo-green text-main-beige01 border-none"
                text="닫기"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <CreateNotePeriodModal onClose={onClose} chatRoomId={chatRoomId} />
        </div>
      )}
    </>
  );
};

export default NoteListModal;
