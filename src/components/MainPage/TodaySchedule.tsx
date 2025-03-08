import { useEffect, useMemo, useRef, useState } from "react";
import ScheduleBox from "./ScheduleBox";
import dayjs from "dayjs";
import "dayjs/locale/ko";

interface TodayScheduleProps {
  taskData: GetAssignedTask[];
  isLoading: boolean;
}

const TodaySchedule = ({ taskData, isLoading }: TodayScheduleProps) => {
  dayjs.locale("ko");
  // 현재 날짜
  const now = useMemo(() => dayjs(), []);
  const year = now.format("YY"); // '24' 형식
  const month = now.format("MM"); // '02' 형식
  const nowDate = now.format("DD"); // '16' 형식
  const day = now.format("ddd"); // 요일 (0: 일요일 ~ 6: 토요일)

  // 현재 시간
  const [currentTime, setCurrentTime] = useState(dayjs().format("HH:mm:ss"));
  const timeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const updateClock = () => {
      if (timeRef.current) {
        timeRef.current.textContent = dayjs().format("HH:mm:ss");
        setCurrentTime(dayjs().format("HH:mm:ss"));
      }
    };

    updateClock(); // 최초 1회 실행
    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div
        className="w-[400px] px-5 py-10 border border-main-green02 rounded-[10px]
      flex flex-col gap-10 items-center bg-white animate-pulse"
        style={{ maxHeight: "calc(100vh - 50px)" }}
      >
        {/* 날짜 & 시간 스켈레톤 */}
        <div className="flex flex-col items-center">
          <div className="w-[180px] h-[20px] bg-gray-200 rounded-md animate-pulse mb-2"></div>
          <div className="w-[100px] h-[30px] bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* 일정 리스트 스켈레톤 */}
        <div className="w-full flex-1 min-h-0">
          <div className="overflow-y-auto scrollbar-none w-full h-full flex flex-col gap-2 min-h-0">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="w-full h-[110px] bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          현재 시간
        </p>
      </div>

      <div className="w-full flex-1 min-h-0">
        <div className="overflow-y-auto scrollbar-none w-full h-full flex flex-col gap-2 min-h-0">
          {taskData?.filter((task) => {
            const end = new Date(task.endDate);
            const currentStatus = task.status;
            const currentDate = new Date().getTime();
            return (
              end.getTime() > currentDate &&
              (currentStatus === "BEFORE_START" ||
                currentStatus === "IN_PROGRESS")
            );
          }).length > 0 ? (
            taskData
              .filter((task) => {
                const end = new Date(task.endDate);
                const currentStatus = task.status;
                const currentDate = new Date().getTime();
                return (
                  end.getTime() > currentDate &&
                  (currentStatus === "BEFORE_START" ||
                    currentStatus === "IN_PROGRESS")
                );
              })
              .map((task, i) => (
                <ScheduleBox key={i} task={task} currentTime={currentTime} />
              ))
          ) : (
            <div
              className="flex flex-col justify-center h-full text-center 
            text-main-green"
            >
              <p className="text-[18px] font-semibold">
                오늘 예정된 업무가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;
