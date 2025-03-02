import TodaySchedule from "../components/MainPage/TodaySchedule";
import { twMerge } from "tailwind-merge";
import Calendar from "../components/MainPage/Calendar";
import { useAuthStore } from "../store/authStore";
import GuestMain from "../components/MainPage/GuestMain";
const MainPage = () => {
  const user = useAuthStore((state) => state.user);

  return user ? (
    <div
      className={twMerge(
        `bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0
          px-5 py-5 flex gap-2 h-[calc(100vh-50px)]`
      )}
    >
      {/* 캘린더 */}
      <div className="flex-1 pl-[50px] pr-[40px]">
        <div className="h-[calc(100vh-90px)] border rounded-[10px] border-main-green02 px-5 py-5 bg-white">
          <Calendar />
        </div>
      </div>

      {/* 오늘의 일정 */}
      <TodaySchedule />
    </div>
  ) : (
    <GuestMain />
  );
};

export default MainPage;
