import { formatToAMPM } from "../../utils/aiNote/dateUtils";

const NoteListBox = ({
  onClick,
  note,
}: {
  onClick: () => void;
  note: AINoteListType;
}) => {
  const startDateFormatted = formatToAMPM(note.startDate);
  const endDateFormatted = formatToAMPM(note.endDate);

  return (
    <div
      onClick={onClick}
      className="flex w-full px-[5px] border border-main-green02 cursor-pointer"
    >
      <div className="flex w-full justify-between">
        <div className="flex items-center">
          <span className="text-main-green font-medium text-[12px] ">
            {note.title}
          </span>
        </div>
        <div className="flex items-center gap-[10px]">
          <span className="text-main-green font-medium text-[12px] ">
            회의기간
          </span>
          <div className="flex flex-col ">
            <span className="font-light text-main-green text-[10px] text-right">
              {startDateFormatted}
            </span>
            <span className="font-light text-main-green text-[10px] text-right">
              ~{endDateFormatted}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteListBox;
