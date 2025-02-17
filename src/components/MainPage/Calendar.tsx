import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/Calandar.css";

const PROJECT_BUTTON = {
  text: "프로젝트",
  click: (info: any) => console.log(info),
};

const TASK_BUTTON = {
  text: "개인업무",
  click: (info: any) => console.log(info),
};
const Calendar = () => {
  // 캘린더 상단 커스텀 버튼(프로젝트, 개인업무)

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      customButtons={{ project: PROJECT_BUTTON, task: TASK_BUTTON }}
      initialView="dayGridMonth"
      height="100%"
      viewHeight="100%"
      headerToolbar={{
        left: "prev title next",
        center: "",
        right: "project task",
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
          textColor: "black",
        },
        {
          title: "event 2",
          date: "2025-02-20",
          color: "#FEE500",
          textColor: "black",
        },
      ]}
      // 데이터 클릭이벤트
      eventClick={() => {
        // alert("Event:" + info.event.title);
      }}
      // 드래그
      editable={true}
      droppable={true}
      eventDrop={(info) => console.log(info)}
    />
  );
};

export default Calendar;
