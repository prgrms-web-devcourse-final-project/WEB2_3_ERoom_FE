import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/Calandar.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { dragChange } from "../../utils/calendar/dragChange";
import { EventDropArg, EventInput } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import { getProjectList } from "../../api/project";
import { useAuthStore } from "../../store/authStore";
import { getAssignedTaskList } from "../../api/task";
import { CALENDAR_COLORS } from "../../constants/calendarColors";
import { dragChangeTask } from "../../utils/calendar/dragChangeTask";
import { showToast } from "../../utils/toastConfig";

interface CalendarProps {
  refetch: () => void;
}

const Calendar = ({ refetch }: CalendarProps) => {
  // 프로젝트 및 업무 토글 상태
  const [showTasks, setShowTasks] = useState(false);

  const PROJECT_BUTTON = {
    text: "프로젝트",
    click: () => setShowTasks(false), // 프로젝트 데이터 표시
  };

  const PROJECT_CLICK_BUTTON = {
    text: "프로젝트",
    click: () => setShowTasks(false), // 프로젝트 데이터 표시
  };

  const TASK_BUTTON = {
    text: "개인업무",
    click: () => setShowTasks(true), // 개인업무 데이터 표시
  };

  const TASK_CLICK_BUTTON = {
    text: "개인업무",
    click: () => setShowTasks(true), // 개인업무 데이터 표시
  };

  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.member);

  // 랜덤 색상 함수
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * CALENDAR_COLORS.length);
    return CALENDAR_COLORS[randomIndex];
  };

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
        const subCate = project?.subCategories.map((data) => ({
          subCategoryId: data.id,
          tagIds: data.tags.map((tag) => tag.id),
        }));

        const members = project.members.map((member) => member.memberId);
        return {
          id: project.id,
          title: project.name,
          start: project.startDate,
          end: project.endDate,
          textColor: project.colors.text,
          color: project.colors.background,
          category: project.categoryName,
          subCategories: subCate,
          status: project.status,
          membersIds: members,
          creatorId: project.creatorId,
        };
      });
    },
  });

  // fullcalandar에 맞게 업무 데이터 타입 조정
  const { data: taskListData } = useQuery<EventInput[]>({
    queryKey: ["TaskList"],
    queryFn: async () => {
      if (!loginUser?.id) return [];

      const response = await getAssignedTaskList(loginUser.id);

      const filterInProgress = response.filter(
        (task: GetAssignedTask) =>
          task.status === "IN_PROGRESS" || task.status === "BEFORE_START"
      );

      return filterInProgress.map((task: GetAssignedTask) => {
        const { background, text } = getRandomColor();

        return {
          id: task.id,
          title: task.title,
          start: task.startDate,
          end: task.endDate,
          color: background,
          textColor: text,
          extendedProps: {
            assignedMemberName: task.assignedMemberName,
            assignedMemberId: task.assignedMemberId,
            status: task.status,
            profileImage: task.assignedMemberProfile,
            projectId: task.projectId,
          },
        };
      });
    },
  });

  // 데이터 수정
  const { mutate } = useMutation({
    mutationFn: (info: EventDropArg) => dragChange(info),
  });

  const { mutate: mutateTask } = useMutation({
    mutationFn: (info: EventDropArg) => dragChangeTask(info),
    onSuccess: () => {
      refetch();
    },
  });

  if (isLoading) {
    return (
      <div className="h-full border rounded-[10px] border-main-green02 px-5 py-5 bg-white animate-pulse flex flex-col gap-5">
        {/* 캘린더 헤더 스켈레톤 */}
        <div className="flex justify-between items-center">
          <div className="w-[150px] h-[20px] bg-gray-200 rounded-md animate-pulse"></div>
          <div className="w-[120px] h-[20px] bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        {/* 캘린더 본문 (전체를 하나의 큰 박스로 표시) */}
        <div className="w-full h-full bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    );
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        customButtons={{
          project: PROJECT_BUTTON,
          projectclick: PROJECT_CLICK_BUTTON,
          task: TASK_BUTTON,
          taskclick: TASK_CLICK_BUTTON,
        }}
        initialView="dayGridMonth"
        height="100%"
        viewHeight="100%"
        headerToolbar={{
          left: "prev title next",
          center: "",
          right: `${showTasks ? "project" : "projectclick"} ${
            showTasks ? "taskclick" : "task"
          }`,
        }}
        // 한국어
        locale={koLocale}
        timeZone="local"
        displayEventTime={false}
        // 데이터
        events={showTasks ? taskListData : projectListData}
        // 데이터 클릭이벤트
        eventClick={(info) => {
          if (!showTasks) {
            navigate(`project-room/${info.event.id}`);
          } else {
            const projectId = info.event.extendedProps?.projectId;
            if (projectId) {
              navigate(`project-room/${projectId}`);
            } else {
              console.error("Project ID not found for this task.");
            }
          }
          refetch();
        }}
        dayMaxEvents={3}
        dayMaxEventRows={true}
        // 드래그
        editable={true}
        droppable={true}
        eventDrop={(info: EventDropArg) => {
          if (showTasks) {
            mutateTask(info);
            refetch();
          } else {
            if (loginUser?.id !== info.event.extendedProps.creatorId) {
              showToast("error", "프로젝트 생성자만 수정할 수 있습니다");
              info.revert();
              return;
            }
            mutate(info);
            refetch();
          }
          // console.log(info);
        }}
        // 일정 길이 변경 드래그
        eventResize={(info: any) => {
          // console.log(info);
          if (showTasks) {
            mutateTask(info);
          } else {
            mutate(info);
          }
          refetch();
        }}
      />
    </>
  );
};

export default Calendar;
