import { useEffect, useMemo, useRef, useState } from "react";
import ScheduleBox from "./ScheduleBox";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const TodaySchedule = () => {
  dayjs.locale("ko");
  // 현재 날짜
  const now = useMemo(() => dayjs(), []);
  const year = now.format("YY"); // '24' 형식
  const month = now.format("MM"); // '02' 형식
  const nowDate = now.format("DD"); // '16' 형식
  const day = now.format("ddd"); // 요일 (0: 일요일 ~ 6: 토요일)

  // 현재 시간
  const timeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const updateClock = () => {
      if (timeRef.current) {
        timeRef.current.textContent = dayjs().format("HH:mm:ss");
      }
    };

    updateClock(); // 최초 1회 실행
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  // 임시 배열입니다
  const [arr, setArr] = useState(Array.from({ length: 20 }, (_, i) => i));

  return (
    <div
      className="w-[400px] px-5 py-10 border border-main-green02 rounded-[10px]
      flex flex-col gap-10 items-center bg-white"
      style={{ maxHeight: "calc(100vh - 50px)" }}
    >
      <div className="flex flex-col items-center">
        <p className="font-medium">
          {year}년 {month}월 {nowDate}일 ({day})
        </p>
        <p className="font-bold text-[26px]" ref={timeRef}>
          00:00:00
        </p>
      </div>

      <div className="w-full flex-1 min-h-0">
        <div className="overflow-y-auto scrollbar-none w-full h-full flex flex-col gap-2 min-h-0">
          {arr.map((_, i) => (
            <ScheduleBox
              key={i}
              endTime="15:00"
              remainingTime="40분"
              scheduleName="퍼블리싱"
              projectName="이룸 프로젝트"
              isDeadline={i < 4} // 임시
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;
