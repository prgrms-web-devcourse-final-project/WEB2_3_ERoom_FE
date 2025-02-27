import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/Calandar.css";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useEffect } from "react";
import { dragChange } from "../../utils/calendar/dragChange";
import { EventDropArg, EventInput } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import { getProjectList } from "../../api/project";

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
  const navigate = useNavigate();

  // fullcalandar 타입 때문에 EventInput 타입 적용
  const { data: projectListData, isLoading } = useQuery<EventInput[]>({
    queryKey: ["ProjectList"],
    queryFn: async () => {
      const response = await getProjectList();
      const filterInProgress = response.filter(
        (project: ProjectListType) =>
          project.status === "IN_PROGRESS" || project.status === "BEFORE_START"
      );
      return filterInProgress.map((project: ProjectListType) => {
        return {
          id: project.id,
          title: project.name,
          start: project.startDate,
          end: project.endDate,
          textColor: project.colors.text,
          color: project.colors.background,
          category: project.categoryName,
          subCategories: project.subCategories,
          status: project.status,
        };
      });
    },
  });

  useEffect(() => {
    console.log(projectListData, isLoading);
  }, [projectListData]);

  // 데이터 수정
  const { mutate } = useMutation({
    mutationFn: (info: EventDropArg) => dragChange(info),
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
      timeZone="local"
      displayEventTime={false}
      // 데이터
      events={projectListData}
      // 데이터 클릭이벤트
      eventClick={(info) => {
        navigate(`project-room/${info.event.id}`);
      }}
      dayMaxEvents={3}
      dayMaxEventRows={true}
      // 드래그
      editable={true}
      droppable={true}
      eventDrop={(info: EventDropArg) => {
        mutate(info);
        console.log(info);
      }}
      // 일정 길이 변경 드래그
      eventResize={(info: any) => {
        mutate(info);
      }}
    />
  );
};

export default Calendar;
