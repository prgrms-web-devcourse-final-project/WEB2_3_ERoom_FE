import AdminButton from "../../common/AdminButton";
import Button from "../../common/Button";
import SearchIcon from "../../../assets/icons/search.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import AdminTaskList from "./AdminTaskList";
import { useMutation, useQuery } from "@tanstack/react-query";
import ResotreIcon from "../../../assets/icons/restore_account.svg";
import {
  adminRestoreTask,
  deleteTask,
  getAdminDeleteTaskList,
  getAdminTaskList,
  updateTask,
} from "../../../api/admin";
import ConfirmModal from "../../modals/ConfirmModal";
import { queryClient } from "../../../main";

export interface TasksListType {
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

interface updatedTaskInfo {
  taskName: string;
  taskStatus: string;
}

const AdminTask = () => {
  // 활성 업무리스트 데이터
  const { data: taskList, refetch: refetchActive } = useQuery<TaskList[]>({
    queryKey: ["TaskList"],
    queryFn: async () => {
      const taskListData = await getAdminTaskList();
      return taskListData;
    },
    // staleTime: 0,
  });

  // 비활성 업무리스트 데이터
  const { data: deleteTaskList, refetch: refetchInactive } = useQuery<
    TaskList[]
  >({
    queryKey: ["DeleteTaskList"],
    queryFn: async () => {
      const deleteTaskListData = await getAdminDeleteTaskList();
      return deleteTaskListData;
    },
    // staleTime: 0,
  });

  // 활성비활성 상태
  const [taskMenu, setTaskMenu] = useState("active");
  // 활성 업무리스트 상태
  const [tasks, setTasks] = useState(taskList);
  // 비활성 업무리스트 상태
  const [deleteTasks, setDeleteTasks] = useState(deleteTaskList);
  // 전체 체크박스 체크 상태
  const [isChecked, setIsChecked] = useState(false);
  // 체크된 비활성 업무 상태
  const [isCheckedTask, setIsCheckedTask] = useState<number[]>([]);
  // 모달 상태
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);

  // 업무 수정
  const { mutateAsync: updateTaskFn } = useMutation({
    mutationFn: ({
      taskId,
      updatedTaskInfo,
    }: {
      taskId: number;
      updatedTaskInfo: updatedTaskInfo;
    }) => updateTask(taskId, updatedTaskInfo),
  });

  // 업무 수정 호출 함수
  const editTask = async (taskId: number, updatedTaskInfo: updatedTaskInfo) => {
    const response = await updateTaskFn({
      taskId: taskId,
      updatedTaskInfo,
    });
    console.log(response);
  };

  // 업무 삭제
  const { mutateAsync: deleteTaskFn } = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
  });

  // 업무 삭제 함수
  const handleTaskDelete = async () => {
    if (isCheckedTask.length === 0) {
      console.log("선택된 업무가 없습니다.");
      return;
    }

    try {
      console.log(isCheckedTask);
      // 삭제 요청 실행 (모든 삭제 요청이 완료될 때까지 대기)
      await Promise.all(isCheckedTask.map((taskId) => deleteTaskFn(taskId)));

      console.log("삭제 완료");

      // 삭제 요청이 성공한 후 상태 업데이트
      setDeleteTasks((prevTasks) =>
        prevTasks
          ? prevTasks.filter((task) => !isCheckedTask.includes(task.taskId))
          : []
      );

      // 선택된 ID 목록에서도 제거
      setIsCheckedTask((prevTasks) =>
        prevTasks.filter((taskId) => !isCheckedTask.includes(taskId))
      );

      // 최신 데이터 다시 불러오기
      await refetchInactive();
    } catch (error) {
      console.error("업무 삭제 중 오류 발생:", error);
    }
  };

  // set함수에 업무 넣기
  useEffect(() => {
    setTasks(taskList);
    setDeleteTasks(deleteTaskList);
  }, [taskList, deleteTaskList]);

  // console.log(tasks, deleteTasks);

  // 업무 정보 수정 내용 반영 및 호출 함수
  const handleUpdateTask = async (id: number, updatedTask: TaskList) => {
    console.log("수정 id :", id, "수정 정보 :", {
      taskName: updatedTask.taskName,
      taskStatus: updatedTask.taskStatus,
    });

    setTasks((prevTasks) =>
      prevTasks?.map((task) =>
        task.taskId === id ? { ...task, ...updatedTask } : task
      )
    );

    await editTask(id, {
      taskName: updatedTask.taskName,
      taskStatus: updatedTask.taskStatus,
    });

    await refetchActive();
    await refetchInactive();
  };

  //활성계정, 비활성계정 페이지 이동과 버튼 UI변경
  const handleButtonClick = (type: "active" | "inactive") => {
    setTaskMenu(type);
  };

  // 업무 활성 전환(복구)
  const { mutate: restoreTask } = useMutation({
    mutationFn: (taskId: number) => adminRestoreTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["TaskList"] });
      queryClient.invalidateQueries({ queryKey: ["DeleteTaskList"] });
    },
  });

  const handleTaskRestore = async () => {
    if (isCheckedTask.length === 0) {
      console.log("선택된 업무가 없습니다.");
      return;
    }

    console.log(isCheckedTask);
    // 삭제 요청 실행 (모든 삭제 요청이 완료될 때까지 대기)
    await Promise.all(isCheckedTask.map((taskId) => restoreTask(taskId)));
    setIsCheckedTask([]);
    alert("복구완료");
    console.log("복구 완료");
  };

  useEffect(() => {
    console.log(isCheckedTask);
  }, [isCheckedTask]);

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지에 보여줄 항목 개수
  const totalPages = Math.ceil(
    (tasks?.length ? tasks?.length : 0) / itemsPerPage
  );

  // 체크박스 상태 변경 함수
  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  // taskMenu 변경 될 때 페이지 1로 이동
  useEffect(() => {
    setIsCheckedTask([]);
    setCurrentPage(1);
  }, [taskMenu]);

  // 업무 검색 입력 상태
  const [searchTaskName, setSearchTaskName] = useState<string>("");

  // 검색 함수
  const handleSearchTask = () => {
    taskMenu === "active"
      ? setTasks(
          tasks?.filter((task) => task.taskName.includes(searchTaskName))
        )
      : setDeleteTasks(
          deleteTasks?.filter((task) => task.taskName.includes(searchTaskName))
        );
  };

  // 검색어가 없을 경우 원래 데이터로 초기화
  useEffect(() => {
    if (searchTaskName.trim() === "") {
      setTasks(taskList);
      setDeleteTasks(deleteTaskList);
    }
  }, [searchTaskName]);

  // 페이지 구분
  const filterTasks =
    taskMenu === "active"
      ? tasks?.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : deleteTasks?.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="min-h-[calc(100vh-80px)] mx-[30px] mb-[30px] px-[30px] pt-[30px] flex flex-col bg-white/60">
        <div className="pl-[20px] mb-[30px]">
          <span className="text-[22px] font-bold text-main-green">
            업무 정보
          </span>
        </div>
        <div className="flex justify-between mb-[30px]">
          {/* 활성탭 */}
          <div className="flex gap-[10px]">
            <AdminButton
              text="활성 업무"
              type={taskMenu === "active" ? "green" : "white"}
              onClick={() => handleButtonClick("active")}
            />

            {/* 비활성 탭 */}
            <AdminButton
              text="비활성 업무"
              type={taskMenu === "inactive" ? "green" : "white"}
              onClick={() => handleButtonClick("inactive")}
            />
          </div>

          {/* 검색 창 */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearchTask();
            }}
            className="flex gap-[10px]"
          >
            <input
              className="w-[250px] h-[27px] border border-header-green rounded-[5px] focus:outline-none flex px-[10px] items-center text-[14px]"
              placeholder="업무명 또는 프로젝트명 검색"
              value={searchTaskName}
              onChange={(e) => setSearchTaskName(e.target.value)}
            />
            <Button
              text="검색"
              logo={SearchIcon}
              size="sm"
              css="h-[27px] text-[14px] text-main-beige01 bg-header-green"
            />
          </form>

          {/* 삭제 버튼 */}
          <div className="flex gap-[5px] w-[80px] justify-end">
            {taskMenu === "inactive" && (
              <>
                <button onClick={handleTaskRestore} className="cursor-pointer">
                  <img src={ResotreIcon} alt="복구 버튼" />
                </button>
                <button>
                  <img
                    src={DeleteIcon}
                    alt="계정 삭제 버튼"
                    className="cursor-pointer"
                    onClick={() => {
                      isCheckedTask.length !== 0 && setIsConfirmModal(true);
                    }}
                  />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow mb-[30px]">
          {/* 제목 부분 */}
          <div
            className="grid grid-cols-[5%_5%_10%_10%_10%_25%_10%_20%_5%] h-[36px] w-full 
          text-main-green text-[14px] border-b border-b-header-green"
          >
            {/* 전체 체크박스 */}
            <div className="flex justify-center items-center">
              <button onClick={toggleCheckBox}>
                <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
              </button>
            </div>
            <div className="h-full flex justify-center items-center">
              <span>No.</span>
            </div>
            <div className="flex justify-center items-center">
              <span>업무명</span>
            </div>
            <div className="flex justify-center items-center">
              <span>프로젝트명</span>
            </div>
            <div className="flex justify-center items-center">
              <span>담당자</span>
            </div>
            <div className="flex justify-center items-center">
              <span>담당자 이메일</span>
            </div>
            <div className="flex justify-center items-center">
              <span>진행상태</span>
            </div>
            <div className="flex justify-center items-center">
              <span>기간</span>
            </div>
            <div className="flex justify-center items-center">
              <span>수정</span>
            </div>
          </div>

          {/* 업무목록 */}
          {filterTasks?.map((task, index) => (
            <AdminTaskList
              key={task.taskId}
              task={task}
              index={(currentPage - 1) * itemsPerPage + index}
              onUpdateTask={handleUpdateTask}
              page={currentPage}
              isAllCheck={isChecked}
              setIsCheckedId={setIsCheckedTask}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-auto mb-[30px]">
          <Pagination
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            menu={taskMenu}
          />
        </div>

        {/* 삭제 확인 모달 */}
        {isConfirmModal && (
          <div
            className="absolute inset-0 w-screen h-fit min-h-screen
            flex justify-center items-center bg-black/70 z-50"
            onClick={() => setIsConfirmModal(false)}
          >
            <ConfirmModal
              processType="업무"
              value="삭제"
              setIsModal={setIsConfirmModal}
              onDeleteTask={handleTaskDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTask;
