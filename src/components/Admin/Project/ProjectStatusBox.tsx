import { twMerge } from "tailwind-merge";

const STATUS_NAME = ["진행 중", "진행 예정", "진행 완료"];

interface ProjectStatusBoxProps {
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setEditedProject: React.Dispatch<
    React.SetStateAction<{
      id: number;
      projectName: string;
      projectStatus: string;
      createdAt: string;
      startDate: string;
      endDate: string;
      tag1: string;
      tag2: string;
      tag3: string;
    }>
  >;
}

const ProjectStatusBox = ({
  status,
  setStatus,
  setEditedProject,
}: ProjectStatusBoxProps) => {
  const getType = (name: string) => {
    if (name === "진행 중") return "IN_PROGRESS";
    else if (name === "진행 예정") return "";
    else return "COMPLETED";
  };
  const handleItemClick = (name: string) => {
    setStatus(name);
    setEditedProject((prev) => ({ ...prev, projectStatus: getType(name) }));
  };

  return (
    <ul
      className="border border-main-green w-[100px]
      bg-main-green03 text-main-green absolute top-0"
    >
      {STATUS_NAME.map((name, idx) => {
        return (
          <li
            key={idx}
            className={twMerge(`${
              status === name && "bg-main-green02"
            } h-[25px] flex items-center justify-center
            border border-main-green02 hover:bg-main-green02/50`)}
            onClick={() => handleItemClick(name)}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default ProjectStatusBox;
