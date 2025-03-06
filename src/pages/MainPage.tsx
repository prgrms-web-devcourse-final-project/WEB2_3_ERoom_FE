import TodaySchedule from "../components/MainPage/TodaySchedule";
import { twMerge } from "tailwind-merge";
import Calendar from "../components/MainPage/Calendar";
import { useAuthStore } from "../store/authStore";
import GuestMain from "../components/MainPage/GuestMain";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getAssignedTaskList } from "../api/task";

const MainPage = () => {
  const isAuthenticated = useAuthStore((state) => state.accessToken);
  const loginUser = useAuthStore((state) => state.member);
  const now = useMemo(() => dayjs(), []);
  const year = now.format("YY"); // '24' 형식
  const month = now.format("MM"); // '02' 형식
  const nowDate = now.format("DD"); // '16' 형식

  // 유저 개인 업무 불러오기
  const { data: userTask, refetch } = useQuery<GetAssignedTask[]>({
    queryKey: ["UserTask"],
    queryFn: async () => {
      if (!loginUser) return [];
      const response = await getAssignedTaskList(loginUser?.id);

      const filterResponse = response.filter(
        (task: GetAssignedTask) =>
          task.endDate.split("T")[0] === `20${year}-${month}-${nowDate}`
      );
      // console.log(filterResponse);

      const sortedResponse = filterResponse.sort(
        (a: GetAssignedTask, b: GetAssignedTask) => {
          const dateA = new Date(a.endDate);
          const dateB = new Date(b.endDate);

          return dateA.getTime() - dateB.getTime();
        }
      );
      return sortedResponse;
    },
  });

  const [taskData, setTaskData] = useState<GetAssignedTask[]>([]);

  const handleRefetch = async () => {
    const { data } = await refetch(); // refetch()의 결과를 받아옴
    if (data) {
      setTaskData(data); // 상태 업데이트로 강제 리렌더링
    }
  };
  console.log("확인", taskData);

  useEffect(() => {
    if (isAuthenticated) {
      handleRefetch(); // 컴포넌트 마운트 시 refetch 실행
    }
  }, [isAuthenticated]);

  console.log("실제 업무", userTask);

  return isAuthenticated ? (
    <div
      className={twMerge(
        `bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0
          px-5 py-5 flex gap-2 h-[calc(100vh-50px)]`
      )}
    >
      {/* 캘린더 */}
      <div className="flex-1 pl-[50px] pr-[40px]">
        <div className="h-[calc(100vh-90px)] border rounded-[10px] border-main-green02 px-5 py-5 bg-white">
          <Calendar refetch={handleRefetch} />
        </div>
      </div>

      {/* 오늘의 일정 */}
      <TodaySchedule taskData={userTask || []} />
    </div>
  ) : (
    <GuestMain />
  );
};

export default MainPage;
