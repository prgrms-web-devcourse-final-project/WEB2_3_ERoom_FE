import { useState } from "react";
import ScheduleBox from "./ScheduleBox";

const TodaySchedule = () => {
  // 임시 배열입니다
  const [arr, setArr] = useState(Array.from({ length: 20 }, (_, i) => i));

  return (
    <div
      className="w-[450px] px-5 py-10 border border-main-green02 rounded-[10px]
      flex flex-col gap-10 items-center bg-white"
      style={{ maxHeight: "calc(100vh - 50px)" }}
    >
      <p className="font-bold text-[26px]">현재 날짜 시간</p>

      <div className="w-full flex-1 min-h-0">
        <div className="overflow-y-auto scrollbar-none w-full h-full flex flex-col gap-2 min-h-0">
          {arr.map((_, i) => (
            <ScheduleBox
              key={i}
              endTime="15:00"
              remainingTime="40분"
              scheduleName="퍼블리싱"
              projectName="이룸 프로젝트"
              isDeadline={i < 4}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;
