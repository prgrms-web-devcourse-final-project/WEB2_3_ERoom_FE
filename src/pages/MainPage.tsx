import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import TodaySchedule from "../components/MainPage/TodaySchedule";
import { useOutletContext } from "react-router";
import { twMerge } from "tailwind-merge";

const MainPage = () => {
  const sidebarToggle = useOutletContext();

  return (
    <div
      className={twMerge(
        `px-5 bg-gray-100 flex gap-2 ${sidebarToggle ? "" : "pl-[130px]"}`
      )}
      style={{ height: "calc(100vh - 50px)" }}
    >
      {/* 캘린더 */}
      <div className="flex-1 px-[60px] flex flex-col gap-2">
        <div className="flex justify-end">
          <ul className="flex gap-2 font-bold">
            <li className="bg-[#a1a1a1] px-3 py-1 cursor-pointer">프로젝트</li>
            <li className="bg-[#a1a1a1] px-3 py-1 cursor-pointer">개인업무</li>
          </ul>
        </div>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height={"calc(100vh - 50px)"}
        />
      </div>

      {/* 오늘의 일정 */}
      <TodaySchedule />
    </div>
  );
};

export default MainPage;
