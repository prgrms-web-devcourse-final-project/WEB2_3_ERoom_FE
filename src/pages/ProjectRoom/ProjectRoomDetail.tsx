import { useParams, useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import TaskList from "../../components/Task/TaskList";
import { useEffect, useState } from "react";
import MeetingRoomChatBox from "../../components/MeetingRoom/MeetingRoomChatBox";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../../utils/api/getProjectDetail";
// import newTaskIcon from "../../assets/icons/newTaskIcon.svg";

interface AllTasksType {
  IN_PROGRESS: TaskType[];
  COMPLETED: TaskType[];
  BEFORE_START: TaskType[];
  HOLD: TaskType[];
}

const ProjectRoomDetail = () => {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));
  const [isEditTaskModal, setIsEditTaskModal] = useState<boolean>(false);

  console.log(projectId);

  const { data: projectDetailList, isLoading } =
    useQuery<ProjectDetailListType>({
      queryKey: ["ProjectDetail"],
      queryFn: () => getProjectDetail(projectId!),
    });

  const [allTasks, setAllTasks] = useState<AllTasksType>({
    IN_PROGRESS: [],
    COMPLETED: [],
    BEFORE_START: [],
    HOLD: [],
  });
  const [manageTasks, setManageTasks] = useState([]);

  useEffect(() => {
    console.log(projectDetailList, isLoading);
    if (projectDetailList) {
      // 전체 업무 분류
      const tasks = projectDetailList.tasks;

      const tasksGroup = tasks.reduce(
        (acc: AllTasksType, cur: TaskType) => {
          acc[cur.status]?.push(cur);
          return acc;
        },
        {
          IN_PROGRESS: [],
          COMPLETED: [],
          BEFORE_START: [],
          HOLD: [],
        }
      );

      setAllTasks(tasksGroup);

      console.log(tasksGroup);
    }
  }, [projectDetailList]);

  useEffect(() => {
    console.log(searchParams.get("category"));
    setCategory(searchParams.get("category"));
  }, [searchParams.get("category")]);

  return (
    <div
      className="w-[calc(100vw-140px)] h-[calc(100vh-50px)] p-[30px] 
      flex flex-col gap-[30px]
      bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
    >
      <div className="w-full flex justify-between items-center">
        {/* 헤더 */}
        <div className="flex flex-col justify-between items-start gap-[10px]">
          <h1 className="font-bold text-[22px]">프로젝트 명</h1>

          {/* 태그 목록 */}
          <div className="flex justify-start gap-[10px]">
            <p># 개발</p>
            <p># 리액트</p>
            <p># TypeScript</p>
            <p># Tailwind CSS</p>
          </div>
        </div>

        {/* 업무 생성 버튼 */}
        <Button
          text="+ 업무 생성"
          size="md"
          css="bg-transparent border-main-green01 
              text-main-green01 text-[14px]"
          onClick={() => setIsEditTaskModal(true)}
        />
      </div>

      {/* 전체 업무 리스트 */}
      {(category === "all" || !category) && (
        <div
          className="w-full h-full overflow-scroll scrollbar
          flex justify-start gap-[30px]"
        >
          <TaskList name="진행 중" taskInfo={allTasks.IN_PROGRESS} />
          <TaskList name="진행 예정" taskInfo={allTasks.BEFORE_START} />
          <TaskList name="진행 완료" taskInfo={allTasks.COMPLETED} />
          <TaskList name="보류" taskInfo={allTasks.HOLD} />
        </div>

        // </>
      )}
      {/* 담당자 업무 리스트 */}
      {category === "manager" && (
        <div
          className="w-full h-full overflow-scroll scrollbar
          flex justify-start gap-[30px]"
        >
          {/* <TaskList name="박선형" isAll={false} />
          <TaskList name="한규혁" isAll={false} />
          <TaskList name="성송원" isAll={false} />
          <TaskList name="성송원" isAll={false} />
          <TaskList name="성송원" isAll={false} />
          <TaskList name="성송원" isAll={false} />
          <TaskList name="성송원" isAll={false} /> */}
        </div>
      )}

      {/* 업무 생성 모달 */}
      {isEditTaskModal && (
        <div
          className="fixed inset-0 flex items-center justify-center 
        bg-black/70 z-50"
          onClick={() => {
            setIsEditTaskModal(false);
          }}
        >
          <CreateTaskModal onClose={setIsEditTaskModal} />
        </div>
      )}
    </div>
  );
};

export default ProjectRoomDetail;
