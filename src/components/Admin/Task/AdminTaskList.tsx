import React, { useEffect, useState } from "react";
import EditIcon from "../../../assets/icons/edit.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import { twMerge } from "tailwind-merge";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import { PROGRESS_STATUS } from "../../../constants/status";
import ProgressStatusBox from "../ProgressStatusBox";
import { progressType } from "../../../utils/progressType";

interface TaskList {
  taskId: number;
  taskName: string;
  projectName: string;
  assignedMember: string;
  assignedEmail: string;
  taskStatus: string;
  startDate: string;
  endDate: string;
}

const AdminTaskList = ({
  task,
  index,
  onUpdateTask,
  page,
  isAllCheck,
  setIsCheckedId,
}: {
  task: TaskList;
  index: number;
  onUpdateTask: (id: number, updatedTask: TaskList) => void;
  page: number;
  isAllCheck: boolean;
  setIsCheckedId: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  // 체크 상태
  const [isChecked, setIsChecked] = useState(false);
  // 진행상태 체크
  const [status, setStatus] = useState<string>(
    PROGRESS_STATUS[task.taskStatus]!
  );

  // 전체 체크 시 선택 함수
  useEffect(() => {
    isAllCheck && page - 1 <= index && page - 1 + 14 >= index
      ? setIsChecked(true)
      : setIsChecked(false);
  }, [isAllCheck, page]);

  // 체크 시 체크된 항목 배열에 id 추가
  useEffect(() => {
    setIsCheckedId((prev) =>
      isChecked
        ? prev.includes(task.taskId)
          ? prev
          : [...prev, task.taskId]
        : prev.filter((prevIds) => prevIds !== task.taskId)
    );
  }, [isChecked]);

  // 저장 함수
  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateTask(task.taskId, editedTask);
  };
  // console.log(editedTask);

  // 기간 데이터 형식 변경 함수
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, "."); // 공백 제거
  };

  // 기간 데이터 형식 변경
  const formattedStartDate = formatDate(task.startDate);
  const formattedEndDate = formatDate(task.endDate);

  // 수정/저장버튼 클릭 함수
  const handleEditClick = () => setIsEditing(true);

  // 내용수정 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

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
        "flex flex-row",
        isChecked || isEditing ? "bg-main-green03" : "bg-transparent"
      )}
    >
      <div
        className="grid grid-cols-[5%_5%_10%_10%_10%_25%_10%_20%_5%] h-full w-full 
        text-main-green text-[14px] py-[5px]"
      >
        {/* 체크박스 */}
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

        {/* 넘버 */}
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
            <p
              className="whitespace-nowrap overflow-hidden text-ellipsis 
              hover:whitespace-pre-wrap hover:overflow-visible"
            >
              {task.taskName}
            </p>
          )}
        </div>

        {/* 프로젝트 명 */}
        <div className="flex items-center justify-center">
          <p
            className="whitespace-nowrap overflow-hidden text-ellipsis 
              hover:whitespace-pre-wrap hover:overflow-visible"
          >
            {task.projectName}
          </p>
        </div>

        {/* 담당자 */}
        <div className="flex items-center justify-center">
          <p>{task.assignedMember}</p>
        </div>

        <div className="flex justify-center items-center relative">
          <span>{task.assignedEmail}</span>
        </div>

        {/* 진행상태 */}
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

        {/* 기간 */}
        <div className="flex justify-center items-center">
          <p>{formattedStartDate}</p>
          <p>~ {formattedEndDate}</p>
        </div>

        {/* 수정/저장 버튼 */}
        <div className="flex justify-center items-center">
          {isEditing ? (
            <button
              onClick={handleSaveClick}
              className="cursor-pointer w-[37px] h-[27px]"
            >
              <img src={SaveIcon} alt="저장" />
            </button>
          ) : (
            <button
              onClick={handleEditClick}
              className="cursor-pointer w-[37px] h-[27px]"
            >
              <img src={EditIcon} alt="수정" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTaskList;
