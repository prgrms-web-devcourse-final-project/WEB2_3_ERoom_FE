import AdminButton from "../../common/AdminButton";
import Button from "../../common/Button";
import SearchIcon from "../../../assets/icons/search.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import ResotreIcon from "../../../assets/icons/restore_account.svg";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import AdminTaskList from "./AdminTaskList";

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

const AdminTask = () => {
  // 더미 데이터
  const dummyTasks: TasksListType[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    taskName: "1차 퍼블리싱",
    manager: "성송원",
    projectName: "프로젝트 A",
    taskStatus: "IN_PROGRESS",
    createdAt: "2025-02-11",
    startDate: "2025-02-11",
    endDate: "2025-02-20",
    isActive: i % 3 !== 0,
  }));

  const [tasks, setTasks] = useState(dummyTasks);

  //추후 프로젝트 정보 업데이트 API 나오면 연동 추가
  const handleUpdateTask = (
    id: number,
    updatedTask: Partial<TasksListType>
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };

  //활성계정, 비활성계정 페이지 이동과 버튼 UI변경

  const [taskMenu, setTaskMenu] = useState("active");

  const handleButtonClick = (type: "active" | "inactive") => {
    setTaskMenu(type);
  };

  const filterTasks = tasks.filter((task) =>
    taskMenu === "active" ? task.isActive : !task.isActive
  );

  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 한 페이지에 보여줄 항목 개수
  const totalPages = Math.ceil(tasks.length / itemsPerPage);

  // 현재 페이지에 해당하는 데이터만 필터링
  // 활성 프로젝트
  const paginatedTasks = filterTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [taskMenu]);

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="min-h-[calc(100vh-80px)] mx-[30px] mb-[30px] px-[30px] pt-[30px] flex flex-col bg-white/60">
        <div className="pl-[20px] mb-[30px]">
          <span className="text-[22px] font-bold text-main-green">
            업무 정보
          </span>
        </div>
        <div className="flex justify-between mb-[30px]">
          <div className="flex gap-[10px]">
            <AdminButton
              text="활성 업무"
              type={taskMenu === "active" ? "green" : "white"}
              onClick={() => handleButtonClick("active")}
            />
            <AdminButton
              text="비활성 업무"
              type={taskMenu === "inactive" ? "green" : "white"}
              onClick={() => handleButtonClick("inactive")}
            />
          </div>
          <div className="flex gap-[10px]">
            <input
              className="w-[250px] h-[27px] border border-header-green rounded-[5px] focus:outline-none flex px-[10px] items-center text-[14px]"
              placeholder="업무명 또는 프로젝트명 검색"
            />
            <Button
              text="검색"
              logo={SearchIcon}
              size="sm"
              css="h-[27px] text-[14px] text-main-beige01 bg-header-green"
            />
          </div>
          <div className="flex gap-[5px] w-[80px] justify-end">
            {taskMenu === "inactive" && (
              <button>
                <img src={ResotreIcon} alt="계정 복구 버튼" />
              </button>
            )}
            <button>
              <img src={DeleteIcon} alt="계정 삭제 버튼" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] flex-grow mb-[30px]">
          {/* 제목 부분 */}
          <div className="grid grid-cols-[5%_5%_15%_20%_10%_10%_10%_20%_5%] h-[36px] w-full text-main-green text-[14px] border-b border-b-header-green">
            <div className="flex justify-center items-center">
              <button onClick={toggleCheckBox}>
                <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
              </button>
            </div>
            <div className="flex justify-center items-center">
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
              <span>진행상태</span>
            </div>
            <div className="flex justify-center items-center">
              <span>생성일</span>
            </div>
            <div className="flex justify-center items-center">
              <span>기간</span>
            </div>
            <div className="flex justify-center items-center">
              <span>수정</span>
            </div>
          </div>
          {paginatedTasks.map((task, index) => (
            <AdminTaskList
              key={task.id}
              task={task}
              index={(currentPage - 1) * itemsPerPage + index}
              onUpdateTask={handleUpdateTask}
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
      </div>
    </div>
  );
};

export default AdminTask;
