import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import koLocale from "@fullcalendar/core/locales/ko";
import interactionPlugin from "@fullcalendar/interaction";
import "../../styles/Calandar.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { dragChange } from "../../utils/calendar/dragChange";
import { EventDropArg, EventInput } from "@fullcalendar/core/index.js";
import { useNavigate } from "react-router";
import { getProjectList } from "../../api/project";
import { useAuthStore } from "../../store/authStore";
import AlertModal from "../common/AlertModal";
import { getAssignedTaskList } from "../../api/task";
import { CALENDAR_COLORS } from "../../constants/calendarColors";
import { dragChangeTask } from "../../utils/calendar/dragChangeTask";

const Calendar = () => {
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

  // 모달 적용
  const [modalText, setModalText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (text: string) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalText("");
    setIsModalOpen(false);
  };

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
      console.log(response);
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
          },
        };
      });
    },
  });

  useEffect(() => {
    console.log(projectListData, taskListData, isLoading);
  }, [projectListData, taskListData]);

  // 데이터 수정
  const { mutate } = useMutation({
    mutationFn: (info: EventDropArg) => dragChange(info),
  });

  const { mutate: mutateTask } = useMutation({
    mutationFn: (info: EventDropArg) => dragChangeTask(info),
  });

  if (isLoading) {
    return <div>로딩</div>;
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
          } else if (showTasks) {
            navigate(`project-room/${info.event.id}`);
          }
        }}
        dayMaxEvents={3}
        dayMaxEventRows={true}
        // 드래그
        editable={true}
        droppable={true}
        eventDrop={(info: EventDropArg) => {
          if (!showTasks) {
            if (loginUser?.id !== info.event.extendedProps.creatorId) {
              openModal("프로젝트 생성자만 수정할 수 있습니다");
              info.revert();
              return;
            }
          }
          {
            showTasks ? mutateTask(info) : mutate(info);
          }
          console.log(info);
        }}
        // 일정 길이 변경 드래그
        eventResize={(info: any) => {
          console.log(info);
          {
            showTasks ? mutateTask(info) : mutate(info);
          }
        }}
      />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <AlertModal text={modalText} onClose={closeModal} />
        </div>
      )}
    </>
  );
};

export default Calendar;
