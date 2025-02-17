import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface AlarmBoxProps {
  project: string;
  task?: string;
  theme: "message" | "newTask" | "newProject" | "endProject";
  css?: string;
  onRemove?: () => void;
}

const AlarmBox = ({ project, task, theme, css, onRemove }: AlarmBoxProps) => {
  const navigate = useNavigate();
  const BASE_STYLE = "p-[10px]  rounded-[5px] cursor-pointer";

  const THEME_STYLE = {
    message: "border border-main-green01 bg-main-beige01 text-main-green",
    newTask: "border border-main-green01 bg-main-green02 text-main-green",
    newProject: "border border-main-green01 bg-main-green02 text-main-green",
    endProject: "border border-header-red-hover bg-red text-header-red",
  }[theme];

  const THEME_TEXT = {
    message: "새로운 메시지가 있습니다",
    newTask: "회원님에게 업무가 배정되었습니다",
    newProject: "새로운 프로젝트에 초대되었습니다",
    endProject: "프로젝트 마감이 1일 남았습니다",
  }[theme];

  const THEME_FROM = {
    message: `${project}`,
    newTask: `${task}-${project}`,
    newProject: `${project}`,
    endProject: `${project}`,
  }[theme];

  //임시 projectId
  const projectId = ":projectIc";

  const THEME_NAVIGATE = {
    message: `/projectRoom/${projectId}/meetingRoom`,
    newTask: `/projectRoom/${projectId}`,
    newProject: `/projectRoom/${projectId}`,
    endProject: `/projectRoom/${projectId}`,
  }[theme];

  const handleClick = () => {
    navigate(THEME_NAVIGATE);
    if (onRemove) onRemove();
  };

  return (
    <div
      className={twMerge(BASE_STYLE, THEME_STYLE, css)}
      onClick={handleClick}
    >
      <div className="flex flex-col gap-[5px]">
        <span className="text-[12px] font-bold">{THEME_TEXT}</span>
        <span className="text-[10px] ">{THEME_FROM}</span>
      </div>
    </div>
  );
};

export default AlarmBox;
