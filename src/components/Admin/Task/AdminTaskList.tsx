import { useEffect, useState } from "react";
import EditIcon from "../../../assets/icons/edit.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import { twMerge } from "tailwind-merge";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import { PROGRESS_STATUS } from "../../../constants/status";
import ProgressStatusBox from "../ProgressStatusBox";
import { progressType } from "../../../constants/progressType";

interface TasksListType {
  id: number;
  taskName: string;
  manager: string;
  projectName: string;
  taskStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const AdminTaskList = ({
  task,
  index,
  onUpdateTask,
}: {
  task: TasksListType;
  index: number;
  onUpdateTask: (id: number, updatedTask: Partial<TasksListType>) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateTask(task.id, editedTask);
  };

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  // 진행상태 체크
  const [status, setStatus] = useState<string>(
    PROGRESS_STATUS[task.taskStatus]!
  );

  useEffect(() => {
    console.log(status);
    setEditedTask((prev) => ({
      ...prev,
      taskStatus: progressType(status),
    }));
  }, [status]);

  return (
    <div
      className={twMerge(
        "flex flex-col",
        isChecked || isEditing ? "bg-main-green03" : "bg-transparent"
      )}
    >
      <div
        className="grid grid-cols-[5%_5%_15%_20%_10%_10%_10%_20%_5%] h-[37px] w-full 
        text-main-green text-[14px] py-[5px]"
      >
        <div className="flex justify-center items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCheckBox();
            }}
            className="cursor-pointer"
          >
            <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <span>{index + 1}</span>
        </div>
        {/* 업무 명 */}
        <div className="flex justify-center items-center">
          {isEditing ? (
            <input
              type="text"
              name="taskName"
              value={editedTask.taskName}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedTask.taskName.length + 2}ch` }}
            />
          ) : (
            <span>{task.taskName}</span>
          )}
        </div>
        {/* 프로젝트 명 */}
        <div className="flex items-center justify-center">
          <p>{task.projectName}</p>
        </div>
        {/* 담당자 */}
        <div className="flex items-center justify-center">
          {isEditing ? (
            <input
              type="text"
              name="manager"
              value={editedTask.manager}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedTask.manager.length + 2}ch` }}
            />
          ) : (
            <span>{task.manager}</span>
          )}
        </div>
        <div className="flex justify-center items-center relative">
          {/* 드롭다운박스 */}
          {isEditing ? (
            <ProgressStatusBox
              height="h-[40px]"
              status={status}
              setStatus={setStatus}
            />
          ) : (
            <span>{status}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <span>{task.createdAt}</span>
          ) : (
            <span>{task.createdAt}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          <p>
            {task.startDate} - {task.endDate}
          </p>
        </div>
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
    </div>
  );
};

export default AdminTaskList;
