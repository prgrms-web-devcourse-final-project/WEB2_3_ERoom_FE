import { useState } from "react";
import NoteListBox from "./NoteListBox";
import NoteDetailModal from "../modals/NoteDetailModal";

const DayNoteList = ({ onClose }: { onClose: () => void }) => {
  const [openNoteDetail, setOpenNoteDetail] = useState(false);

  const handleNoteDetail = () => {
    setOpenNoteDetail((prev) => !prev);
  };
  return (
    <>
      {!openNoteDetail ? (
        <div>
          <div className="flex justify-between mb-[15px]">
            <span>2025-02-13</span> <span>6개</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <NoteListBox onClick={handleNoteDetail} />
            <NoteListBox onClick={handleNoteDetail} />
            <NoteListBox onClick={handleNoteDetail} />
            <NoteListBox onClick={handleNoteDetail} />
            <NoteListBox onClick={handleNoteDetail} />
            <NoteListBox onClick={handleNoteDetail} />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <NoteDetailModal onClose={onClose} />
        </div>
      )}
    </>
  );
};

export default DayNoteList;
