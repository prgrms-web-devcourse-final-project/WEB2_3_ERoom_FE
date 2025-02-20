const NoteListBox = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full px-[5px] border border-main-green02"
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <span className="text-main-green font-medium text-[12px] ">
            회의록 제목
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-main-green font-medium text-[12px] ">
            회의기간
          </span>
          <div className="flex flex-col ">
            <span className="font-light text-main-green text-[10px] text-right">
              2025-03-13 AM 09:00
            </span>
            <span className="font-light text-main-green text-[10px] text-right">
              ~2025-03-13 AM 14:43
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteListBox;
