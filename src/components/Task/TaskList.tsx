import { useState } from "react";
import TaskBox from "./TaskBox";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { useMutation } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../../api/task";
import { useAuthStore } from "../../store/authStore";
import dayjs from "dayjs";
import { showToast } from "../../utils/toastConfig";
import { useDroppable } from "@dnd-kit/core";
import { progressType } from "../../utils/progressType";

const TaskList = ({
  name,
  isAll = true,
  taskInfo,
  refetch,
  projectData,
  projectEditInfo,
}: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { member } = useAuthStore();

  const openModal = (task: Task) => {
    setSelectedTask(task); // 임의로 첫 번째 더미 데이터를 선택
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  /* 업무 수정 */
  const { mutateAsync: updateMutation, isPending: updateTaskPending } =
    useMutation({
      mutationFn: ({
        taskId,
        updateData,
      }: {
        taskId: number;
        updateData: UpdateTask;
      }) => updateTask(taskId, updateData),
      onSuccess: () => {
        refetch();
        showToast("success", "업무가 수정되었습니다.");
        console.log("성공");
      },
    });

  const handleUpdateTask = async (taskId: number, updateData: UpdateTask) => {
    console.log("업데이트 데이터:", taskId, updateData);
    try {
      await updateMutation({ taskId, updateData });
      console.log("업무 수정 완료:", taskId, updateData);

      // 프로젝트 상세 정보를 다시 불러옴
      refetch();

      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("업무 수정 실패:", error);
    }
  };

  /* 업무 삭제 */
  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: async (taskId: number) => {
      await deleteTask(taskId);
    },
    onSuccess: () => {
      refetch();
      showToast("success", "업무가 삭제되었습니다.");
      console.log("성공");
    },
  });

  const handleDeleteTask = async (taskId: number) => {
    try {
      console.log("업무 삭제 요청:", taskId); // 디버깅용 로그
      await deleteMutation(taskId);
      console.log("업무 삭제 완료");

      // 업무 상세 정보를 다시 불러옴
      refetch();

      // 모달을 닫기 전에 데이터가 반영되었는지 확인
      setTimeout(() => {
        setSelectedTask(null);
      }, 50); // 비동기 처리 후 UI 반영을 위해 약간의 딜레이 추가
    } catch (error) {
      console.error("업무 생성 실패 :", error);
    }
  };

  const IS_PROJECT_END =
    projectEditInfo?.endDate &&
    projectEditInfo?.endDate < dayjs().format("YYYY-MM-DDTHH:mm:ss");

  // drag
  const { setNodeRef } = useDroppable({
    id: `taskList ${name}`,
    data: {
      taskListName: isAll ? progressType(name) : "",
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col relative gap-4 items-center px-2 py-5 
        min-w-[320px] min-h-[650px] h-fit bg-gradient-to-b from-white/60 to-white/5`}
    >
      <h1 className="font-bold text-main-green text-[22px]">{name}</h1>
      {taskInfo.map((task) => {
        return (
          <TaskBox
            key={task.taskId}
            onClick={() => {
              if (task.assignedMemberName === member?.username) {
                if (IS_PROJECT_END) {
                  showToast(
                    "warning",
                    "마감기한이 지난 프로젝트는 업무 수정 및 생성이 안됩니다."
                  );
                  console.log("first");
                } else {
                  openModal(task);
                }
              }
            }}
            isProjectEnd={IS_PROJECT_END}
            isAll={isAll}
            task={task}
            onUpdate={handleUpdateTask}
            refetch={refetch}
          />
        );
      })}

      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <UpdateTaskModal
            task={selectedTask}
            onClose={closeModal}
            value="편집"
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            refetch={refetch}
            projectData={projectData}
            projectEditInfo={projectEditInfo}
            updateTaskPending={updateTaskPending}
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
