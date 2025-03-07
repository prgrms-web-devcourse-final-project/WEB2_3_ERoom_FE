import { useState } from "react";
import TaskBox from "./TaskBox";
import UpdateTaskModal from "../modals/UpdateTaskModal";
import { useMutation } from "@tanstack/react-query";
import { deleteTask, updateTask } from "../../api/task";
import { useAuthStore } from "../../store/authStore";

const TaskList = ({
  name,
  isAll = true,
  taskInfo,
  refetch,
  projectData,
}: TaskListProps) => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { member } = useAuthStore();
  // console.log(projectData?.members);

  const openModal = (task: Task) => {
    setSelectedTask(task); // 임의로 첫 번째 더미 데이터를 선택
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  // console.log(taskInfo);

  /* 업무 수정 */
  const updateMutation = useMutation({
    mutationFn: ({
      taskId,
      updateData,
    }: {
      taskId: number;
      updateData: UpdateTask;
    }) => updateTask(taskId, updateData),
    onSuccess: () => {
      refetch();
      console.log("성공");
    },
  });

  const handleUpdateTask = async (taskId: number, updateData: UpdateTask) => {
    console.log("업데이트 데이터:", taskId, updateData);
    try {
      await updateMutation.mutateAsync({ taskId, updateData });
      console.log("업무 수정 완료:", taskId, updateData);

      // 프로젝트 상세 정보를 다시 불러옴
      refetch();

      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("업무 수정 실패:", error);
    }
  };

  /* 업무 삭제 */
  const deleteMutation = useMutation({
    mutationFn: async (taskId: number) => {
      await deleteTask(taskId);
    },
    onSuccess: () => {
      refetch();
      console.log("성공");
    },
  });

  const handleDeleteTask = async (taskId: number) => {
    try {
      console.log("업무 삭제 요청:", taskId); // 디버깅용 로그
      await deleteMutation.mutateAsync(taskId);
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

  //추후 로그인한 사용자와 테스크의 memberId가 같은 테스크박스에만 모달 열리게 처리 필요

  return (
    <div
      className={`flex flex-col relative gap-4 items-center px-2 py-5 
        min-w-[320px] min-h-[450px] h-fit bg-white/60`}
    >
      <h1 className="font-bold text-main-green text-[22px]">{name}</h1>
      {taskInfo.map((task) => {
        return (
          <TaskBox
            key={task.taskId}
            onClick={() => {
              task.assignedMemberName === member?.username && openModal(task);
            }}
            isAll={isAll}
            task={task}
            onUpdate={handleUpdateTask}
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
          />
        </div>
      )}
    </div>
  );
};

export default TaskList;
