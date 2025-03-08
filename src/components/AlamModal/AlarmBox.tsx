import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

const AlarmBox = ({
  id,
  project,
  projectId,
  theme,
  css,
  onRemove,
}: AlarmBoxProps) => {
  const navigate = useNavigate();
  const BASE_STYLE = "p-[10px]  rounded-[5px] cursor-pointer";

  const THEME_STYLE = {
    MESSAGE_SEND: "border border-main-green01 bg-main-beige01 text-main-green",
    TASK_ASSIGN: "border border-main-green01 bg-main-green02 text-main-green",
    PROJECT_INVITE:
      "border border-main-green01 bg-main-green02 text-main-green",
    PROJECT_EXIT: "border border-header-red-hover bg-red text-header-red",
  }[theme];

  const THEME_TEXT = {
    MESSAGE_SEND: "새로운 메시지가 있습니다",
    TASK_ASSIGN: "회원님에게 업무가 배정되었습니다",
    PROJECT_INVITE: "새로운 프로젝트에 초대되었습니다",
    PROJECT_EXIT: "프로젝트 마감이 1일 남았습니다",
  }[theme];

  const projectParts = project.split(",");
  const part1 = projectParts[0]?.trim() || "";
  const part2 = projectParts[1]?.trim() || "";

  const THEME_FROM = {
    MESSAGE_SEND: part2,
    TASK_ASSIGN: `${part1}-${part2}`,
    PROJECT_INVITE: project,
    PROJECT_EXIT: project,
  }[theme];

  const projectIdParts = projectId ? projectId.split(",") : [""];
  const partId2 = projectIdParts[1]?.trim() || "";

  const THEME_ID = {
    MESSAGE_SEND: partId2,
    TASK_ASSIGN: partId2,
    PROJECT_INVITE: projectId,
    PROJECT_EXIT: projectId,
  }[theme];

  const THEME_NAVIGATE = {
    MESSAGE_SEND: `/project-room/${THEME_ID}?category=meeting`,
    TASK_ASSIGN: `/project-room/${THEME_ID}`,
    PROJECT_INVITE: `/project-room/${THEME_ID}`,
    PROJECT_EXIT: `/project-room/${THEME_ID}`,
  }[theme];
  const handleClick = () => {
    console.log("알람 클릭됨, ID:", id, "NAVIGATE:", THEME_NAVIGATE);
    navigate(THEME_NAVIGATE);
  };

  return (
    <div
      className={twMerge(BASE_STYLE, THEME_STYLE, css)}
      onClick={() => {
        handleClick();
        onRemove(id);
      }}
    >
      <div className="flex flex-col gap-[5px]">
        <span className="text-[13px] font-bold">{THEME_TEXT}</span>
        <span className="text-[11px] ">{THEME_FROM}</span>
      </div>
    </div>
  );
};

export default AlarmBox;
