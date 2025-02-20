import { useState } from "react";
import TaskBox from "./TaskBox";
import UpdateTaskModal from "../modals/UpdateTaskModal";

interface TaskListProps {
  name: string;
  isAll?: boolean;
  taskInfo: TaskType[];
}

const TaskList = ({ name, isAll = true, taskInfo }: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState<{
    id: number;
    name: string;
    memberId: number;
    memberName: string;
    startDate: string;
    endDate: string;
  } | null>(null);

  // 더미 데이터 (담당자 이름 및 기간 추가)
  // const dummyTasks = [
  //   {
  //     id: 1,
  //     name: "업무 A",
  //     memberId: 101,
  //     memberName: "김철수",
  //     startDate: "2025-02-11 09:00",
  //     endDate: "2025-02-11 18:00",
  //   },
  //   {
  //     id: 2,
  //     name: "업무 B",
  //     memberId: 202,
  //     memberName: "이영희",
  //     startDate: "2025-02-12 10:00",
  //     endDate: "2025-02-12 17:30",
  //   },
  // ];

  const openModal = () => {
    // setSelectedTask(dummyTasks[0]); // 임의로 첫 번째 더미 데이터를 선택
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  //추후 로그인한 사용자와 테스크의 memberId가 같은 테스크박스에만 모달 열리게 처리 필요

  return (
    <div
      className={`flex flex-col gap-4 items-center px-2 py-1 min-w-[320px] bg-white/60
          ${!isAll ? "bg-white/60" : ""}`}
    >
      <h1 className="font-bold text-main-green text-[22px] sticky">{name}</h1>
      {taskInfo.map((task) => {
        return (
          <TaskBox
            key={task.taskId}
            onClick={openModal}
            isAll={isAll}
            task={task}
          />
        );
      })}

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <UpdateTaskModal task={selectedTask} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default TaskList;
