import { twMerge } from "tailwind-merge";

interface ScheduleBoxProps {
  endTime: string; // 마감시간
  remainingTime: string; // 남은 시간
  scheduleName: string;
  projectName: string;
  isDeadline?: boolean; // 마감시간 임박 시 true
}

const ScheduleBox = ({
  endTime,
  remainingTime,
  scheduleName,
  projectName,
  isDeadline = false,
}: ScheduleBoxProps) => {
  return (
    <div
      className={twMerge(
        `w-full h-[110px] flex flex-col justify-around flex-shrink-0 text-main-green01
          items-center px-3 pb-2 bg-main-green02 cursor-pointer rounded-[10px]
          ${isDeadline && "bg-[#FF6854] text-white"}`
      )}
    >
      {/* 마감시간, 남은시간 */}
      <div>
        <div className="flex items-center gap-4 text-[30px] ">
          <p>{endTime}</p>

          <p className="text-[14px]">{remainingTime} 남음</p>
        </div>
      </div>

      {/* 업무명, 프로젝트 명 */}
      <div className="w-full py-1 px-2 shadow-2xl bg-white/25 rounded-[5px]">
        <p className="font-bold">{scheduleName}</p>
        <p>{projectName}</p>
      </div>
    </div>
  );
};

export default ScheduleBox;
