import { useState } from "react";
import TaskBox from "./TaskBox";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { useQuery } from "@tanstack/react-query";

const TaskList = ({ name, isAll = true, taskInfo }: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const openModal = (task: Task) => {
    setSelectedTask(task); // 임의로 첫 번째 더미 데이터를 선택
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  //추후 로그인한 사용자와 테스크의 memberId가 같은 테스크박스에만 모달 열리게 처리 필요

  return (
    <div
      className={`flex flex-col gap-4 items-center px-2 py-1 min-w-[320px] bg-white/60
          ${!isAll ? "bg-white/60" : ""} bg-white/60`}
    >
      <h1 className="font-bold text-main-green text-[22px] sticky">{name}</h1>
      {taskInfo.map((task) => {
        return (
          <TaskBox
            key={task.taskId}
            onClick={() => openModal(task)}
            isAll={isAll}
            task={task}
          />
        );
      })}

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <UpdateTaskModal
            task={selectedTask}
            onClose={closeModal}
            value="편집"
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
