import { useEffect, useMemo, useRef, useState } from "react";
import ScheduleBox from "./ScheduleBox";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useAuthStore } from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import { getAssignedTaskList } from "../../api/task";

const TodaySchedule = () => {
  const loginUser = useAuthStore((state) => state.member);
  // console.log(loginUser);

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

  const { data: userTask, isLoading } = useQuery<GetAssignedTask[]>({
    queryKey: ["UserTask"],
    queryFn: async () => {
      if (!loginUser) return [];
      const response = await getAssignedTaskList(loginUser?.id);

      const sortedResponse = response.sort(
        (a: GetAssignedTask, b: GetAssignedTask) => {
          const dateA = new Date(a.endDate);
          const dateB = new Date(b.endDate);

          return dateA.getTime() - dateB.getTime();
        }
      );
      return sortedResponse;
    },
  });

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
          {userTask
            ?.filter((task) => {
              const end = new Date(task.endDate);
              return end.getTime() > new Date().getTime(); // 현재 시간보다 이후인 것만 표시
            })
            .map((task, i) => (
              <ScheduleBox key={i} task={task} currentTime={currentTime} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TodaySchedule;
