import { useState } from "react";
import NoteListBox from "./NoteListBox";
import NoteDetailModal from "../modals/NoteDetailModal";

const DayNoteList = ({
  onClose,
  date,
  notes,
  refetchAINoteList,
}: {
  onClose: () => void;
  date: string;
  notes: AINoteListType[];
  refetchAINoteList: () => void;
}) => {
  const [openNoteDetail, setOpenNoteDetail] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const handleNoteDetail = (id: number) => {
    setSelectedNoteId(id);
    setOpenNoteDetail(true);
  };

  const handleGoBack = () => {
    setOpenNoteDetail(false);
    setSelectedNoteId(null);
  };
  return (
    <>
      {!openNoteDetail ? (
        <div>
          <div className="flex justify-between mb-[15px]">
            <span>{date}</span> <span>{notes.length}개</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            {notes &&
              notes.map((note) => (
                <NoteListBox
                  key={note.id}
                  onClick={() => handleNoteDetail(note.id)}
                  note={note}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <NoteDetailModal
            onClose={onClose}
            onGoBack={handleGoBack}
            note={notes.find((note) => note.id === selectedNoteId)}
            refetchAINoteList={refetchAINoteList}
          />
        </div>
      )}
    </>
  );
};

export default DayNoteList;
