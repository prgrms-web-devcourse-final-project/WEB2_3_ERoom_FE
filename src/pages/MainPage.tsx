import TodaySchedule from "../components/MainPage/TodaySchedule";
import { useOutletContext } from "react-router";
import { twMerge } from "tailwind-merge";
import Calendar from "../components/MainPage/Calendar";

const MainPage = () => {
  const sidebarToggle = useOutletContext();

  return (
    <div
      className={twMerge(
        `bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0
        px-5 py-5 flex gap-2 h-[calc(100vh-50px)] ${
          sidebarToggle ? "" : "pl-[130px]"
        }`
      )}
    >
      {/* 캘린더 */}
      <div className="flex-1 pl-[50px] pr-[40px] ">
        <div className="h-[calc(100vh-90px)] border rounded-[10px] border-main-green02 px-5 py-5 bg-white">
          <Calendar />
        </div>
      </div>

      {/* 오늘의 일정 */}
      <TodaySchedule />
    </div>
  );
};

export default MainPage;
