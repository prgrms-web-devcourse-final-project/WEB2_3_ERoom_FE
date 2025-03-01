import { useEffect, useState } from "react";
import EditIcon from "../../../assets/icons/edit.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import { twMerge } from "tailwind-merge";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import { PROGRESS_STATUS } from "../../../constants/status";
import { progressType } from "../../../utils/progressType";
import ProgressStatusBox from "../ProgressStatusBox";

const AdminProjectList = ({
  project,
  index,
  onUpdateProject,
}: {
  project: ProjectsListType;
  index: number;
  onUpdateProject: (
    id: number,
    updatedProject: Partial<ProjectsListType>
  ) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState({ ...project });

  const handleDropdown = () => {
    if (isEditing) return;
    setIsOpen((prev) => !prev);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateProject(project.id, editedProject);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProject({ ...editedProject, [name]: value });
    if (name === "projectName") {
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  // 진행상태 체크
  const [status, setStatus] = useState<string>(
    PROGRESS_STATUS[project.projectStatus]
  );

  useEffect(() => {
    console.log(status);
    setEditedProject((prev) => ({
      ...prev,
      projectStatus: progressType(status),
    }));
  }, [status]);

  return (
    <div
      className={twMerge(
        "flex flex-col cursor-pointer",
        isOpen ? "bg-main-green03" : "bg-transparent"
      )}
    >
      <div
        className="grid grid-cols-[5%_5%_15%_15%_45%_10%] h-[37px] w-full 
        text-main-green text-[14px] py-[5px] cursor-pointer"
        onClick={handleDropdown}
      >
        <div className="flex justify-center items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCheckBox();
            }}
          >
            <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <span>{index + 1}</span>
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <input
              type="text"
              name="projectName"
              value={editedProject.projectName}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedProject.projectName.length + 2}ch` }}
            />
          ) : (
            <span>{project.projectName}</span>
          )}
        </div>
        <div className="flex justify-center items-center relative">
          {/* 드롭다운박스 */}
          {isEditing ? (
            <ProgressStatusBox status={status} setStatus={setStatus} />
          ) : (
            <span>{status}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <span>{project.createdAt}</span>
          ) : (
            <span>{project.createdAt}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          <p>
            {project.startDate} - {project.endDate}
          </p>
        </div>
      </div>
      {isOpen && (
        <div className="grid grid-cols-[10%_15%_1fr_10%_5%] h-[40px] w-full text-main-green text-[14px] py-[5px]">
          <div></div>

          <ul className="flex justify-center items-center gap-2">
            {[project.tag1, project.tag2, project.tag3].map((tag, idx) => (
              <li key={idx}>#{tag}</li>
            ))}
          </ul>
          <div></div>
          <div className="flex justify-center items-center">
            {isEditing ? (
              <button onClick={handleSaveClick} className="cursor-pointer">
                <img src={SaveIcon} alt="저장" />
              </button>
            ) : (
              <button onClick={handleEditClick} className="cursor-pointer">
                <img src={EditIcon} alt="수정" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectList;
