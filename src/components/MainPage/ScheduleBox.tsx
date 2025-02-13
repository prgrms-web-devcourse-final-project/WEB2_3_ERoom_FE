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
        `font-bold w-full h-[80px] flex justify-around flex-shrink-0
          items-center px-5 bg-[#a1a1a1] cursor-pointer
          ${isDeadline && "bg-[#FF7676] text-white"}`
      )}
    >
      {/* 마감시간, 남은시간 */}
      <div>
        <div className="flex items-center gap-2">
          <p className="text-[12px]">마감시간</p>
          <p>{endTime}</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-[12px]">남은시간</p>
          <p>{remainingTime}</p>
        </div>
      </div>

      {/* 업무명, 프로젝트 명 */}
      <div>
        <p>{scheduleName}</p>
        <p>{projectName}</p>
      </div>
    </div>
  );
};

export default ScheduleBox;
