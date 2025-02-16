import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import TodaySchedule from "../components/MainPage/TodaySchedule";
import { useOutletContext } from "react-router";
import { twMerge } from "tailwind-merge";
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";

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
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          height={"calc(100vh - 50px)"}
          headerToolbar={{
            start: "prev title next",
            center: "",
            end: "",
          }}
          // 한국어
          locale={koLocale}
          // 데이터
          events={[
            {
              title: "event 1",
              date: "2025-02-14",
              color: "#CAD2CB",
              start: "2025-02-14",
              end: "2025-02-23",
            },
            { title: "event 2", date: "2025-02-20" },
          ]}
          // 데이터 클릭이벤트
          eventClick={(info) => {
            // alert("Event:" + info.event.title);
          }}
          // 드래그
          editable={true}
          droppable={true}
          eventDrop={() => alert("ss")}
        />
      </div>

      {/* 오늘의 일정 */}
      <TodaySchedule />
    </div>
  );
};

export default MainPage;
