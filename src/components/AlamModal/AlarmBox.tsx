import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface AlarmBoxProps {
  project: string;
  meetingRoom?: string;
  task?: string;
  theme:
    | "message"
    | "newTask"
    | "newProject"
    | "urgentTask"
    | "urgentProject"
    | "upcomingTask"
    | "upcomingProject";
  css?: string;
}

const AlarmBox = ({
  project,
  meetingRoom,
  task,
  theme,
  css,
}: AlarmBoxProps) => {
  const navigate = useNavigate();
  const BASE_STYLE = "p-[10px]  rounded-[5px] cursor-pointer";

  const ASSIGN_STYLE = "border border-header-red-hover bg-red";
  const TIME_STYLE = "border border-main-green01 bg-main-green02";

  const THEME_STYLE = {
    message: "border border-main-green01 bg-main-beige01",
    newTask: ASSIGN_STYLE,
    newProject: ASSIGN_STYLE,
    urgentTask: TIME_STYLE,
    urgentProject: TIME_STYLE,
    upcomingTask: TIME_STYLE,
    upcomingProject: TIME_STYLE,
  }[theme];

  const THEME_TEXT = {
    message: "새로운 메시지가 있습니다",
    newTask: "회원님에게 업무가 배정되었습니다",
    newProject: "새로운 프로젝트에 초대되었습니다",
    urgentTask: "업무 시작 1시간 전입니다",
    urgentProject: "프로젝트 시작 하루 전입니다",
    upcomingTask: "업무 마감 1시간 전입니다",
    upcomingProject: "프로젝트 마감이 하루 남았습니다",
  }[theme];

  const THEME_FROM = {
    message: `${meetingRoom}-${project}`,
    newTask: `${task}-${project}`,
    newProject: `${project}`,
    urgentTask: `${task}-${project}`,
    urgentProject: `${project}`,
    upcomingTask: `${task}-${project}`,
    upcomingProject: `${project}`,
  }[theme];

  //임시 projectId
  const projectId = ":projectIc";

  const THEME_NAVIGATE = {
    message: `/projectRoom/${projectId}/meetingRoom`,
    newTask: `/projectRoom/${projectId}`,
    newProject: `/projectRoom/${projectId}`,
    urgentTask: `/projectRoom/${projectId}`,
    urgentProject: `/projectRoom/${projectId}`,
    upcomingTask: `/projectRoom/${projectId}`,
    upcomingProject: `/projectRoom/${projectId}`,
  }[theme];

  return (
    <div
      className={twMerge(BASE_STYLE, THEME_STYLE, css)}
      onClick={() => navigate(THEME_NAVIGATE)}
    >
      <div className="flex flex-col gap-[5px]">
        <span className="text-3 font-bold text-main-green">{THEME_TEXT}</span>
        <span className="text-[10px] text-main-green">{THEME_FROM}</span>
      </div>
    </div>
  );
};

export default AlarmBox;

/* 메시지 => 기본 스타일/  배정 => 초록색/ 마감, 시작 => 빨간색
- 초대받은 미팅에 대한 알람
=> 새로운 메시지가 있습니다 / 미팅룸명 - 프로젝트명

- 초대받은 프로젝트에 대한 알람
=> 새로운 프로젝트에 초대되었습니다 / 프로젝트명

- 업무 배정에 대한 알람 (추가)
=> 회원님에게 업무가 배정되었습니다 / 업무명 - 프로젝트명
   
- 업무 시작 시간 1시간 전 알람
=> 업무 시작 1시간 전입니다 / 업무명 - 프로젝트명

- 업무 끝나기 30분 전 알람
=> 업무 마감 1시간 전입니다 / 업무명 - 프로젝트명

- 프로젝트 시작 24시간 전 알람
=> 프로젝트 시작 24시간 전입니다 / 프로젝트명

- 프로젝트 마감 24시간 전 알람
=> 프로젝트 마감 24시간 전입니다 / 프로젝트명
*/
