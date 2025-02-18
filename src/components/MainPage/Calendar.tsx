import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/Calandar.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProjectList } from "../../utils/api/getProjectList";
import { useEffect } from "react";
import { dragChange } from "../../utils/calendar/dragChange";
import dayjs from "dayjs";
import { queryClient } from "../../main";
import { EventDropArg } from "@fullcalendar/core/index.js";

// 캘린더 상단 커스텀 버튼(프로젝트, 개인업무)
const PROJECT_BUTTON = {
  text: "프로젝트",
  click: (info: any) => console.log(info),
};

const TASK_BUTTON = {
  text: "개인업무",
  click: (info: any) => console.log(info),
};

const Calendar = () => {
  const { data, isLoading } = useQuery<ProjectListType[]>({
    queryKey: ["ProjectList"],
    queryFn: getProjectList,
  });

  useEffect(() => {
    console.log(data, isLoading);
  }, [data]);

  // 데이터 수정
  const { mutate } = useMutation({
    mutationFn: (info: EventDropArg) => dragChange(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ProjectList"] });
    },
  });

  if (isLoading) {
    return <div>로딩</div>;
  }

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
      events={data?.map((project: ProjectListType) => {
        return {
          id: project.id,
          title: project.name,
          data: project.startDate,
          start: project.startDate,
          end: project.endDate,
          textColor: "black",
          color: project.color,
        };
      })}
      // 데이터 클릭이벤트
      eventClick={() => {
        // alert("Event:" + info.event.title);
      }}
      // 드래그
      editable={true}
      droppable={true}
      eventDrop={(info: EventDropArg) => {
        console.log(dayjs(info.event.start).format("YYYY-MM-DD"));
        mutate(info);
      }}
      // 일정 길이 변경 드래그
      eventResize={(info: any) => {
        mutate(info);
      }}
    />
  );
};

export default Calendar;
