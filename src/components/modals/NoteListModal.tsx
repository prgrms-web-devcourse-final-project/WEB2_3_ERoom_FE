import { useState } from "react";
import Button from "../common/Button";
import DayNoteList from "../NoteList/DayNoteList";
import CreateNotePeriodModal from "./CreateNotePeriodModal";
import { useQuery } from "@tanstack/react-query";
import { getAINoteList } from "../../api/meetingroom";

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

  // AI회의록 리스트 가져오기
  const { data: AINoteList = null, refetch } = useQuery<AINoteListType[]>({
    queryKey: ["AINoteList", chatRoomId],
    queryFn: () => {
      console.log("chatroomId 값:", chatRoomId);
      return getAINoteList(chatRoomId);
    },
  });

  // createdAt 날짜별로 그룹화하는 함수
  const groupNotesByDate = (notes: AINoteListType[]) => {
    return notes.reduce((acc, note) => {
      const date = note.createdAt.split("T")[0];

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(note);

      return acc;
    }, {} as Record<string, AINoteListType[]>);
  };

  const groupedNotes = groupNotesByDate(AINoteList || []);

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
              {groupedNotes && Object.keys(groupedNotes).length > 0 ? (
                Object.entries(groupedNotes).map(([date, notes]) => (
                  <DayNoteList
                    key={date}
                    date={date}
                    onClose={onClose}
                    notes={notes}
                    refetchAINoteList={refetch}
                  />
                ))
              ) : (
                <span className="text-[14px] text-center text-main-green">
                  아직 생성된 AI 회의록이 없습니다
                </span>
              )}
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
          <CreateNotePeriodModal
            onClose={onClose}
            refetchAINoteList={refetch}
            AINoteList={AINoteList}
            chatRoomId={chatRoomId}
          />
        </div>
      )}
    </>
  );
};

export default NoteListModal;
