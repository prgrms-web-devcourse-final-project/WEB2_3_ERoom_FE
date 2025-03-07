import { useOutletContext, useParams, useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import TaskList from "../../components/Task/TaskList";
import { useEffect, useState } from "react";
import MeetingRoomChatBox from "../../components/MeetingRoom/MeetingRoomChatBox";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
import { useQuery } from "@tanstack/react-query";
import { OutletContextType } from "../../components/layout/Layout";
import { useSideManagerStore } from "../../store/sideMemberStore";
import { getProjectDetail } from "../../api/project";

interface ProjectDetailType {
  projectId: number;
  projectName: string;
  categoryName: string;
  subCategories: subCategories[];
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED"; // 프로젝트 상태 Enum
  tasks: Task[];
  members: members[];
}

interface subCategories {
  id: number;
  name: string;
  tags: tags[];
}

interface tags {
  id: number;
  name: string;
}

interface members {
  memberId: number;
  username: string;
  profile: string;
}

interface ManageTasksType {
  name: string;
  tasks: Task[];
}

interface AllTasksType {
  IN_PROGRESS: Task[];
  COMPLETED: Task[];
  BEFORE_START: Task[];
  HOLD: Task[];
}

const ProjectRoomDetail = () => {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));
  const [isEditTaskModal, setIsEditTaskModal] = useState<boolean>(false);

  const { setManagers } = useOutletContext<OutletContextType>();

  /* 프로젝트 상세 정보 불러오기 */
  const {
    data: projectDetailList,
    isLoading,
    refetch,
  } = useQuery<ProjectDetailType>({
    queryKey: ["ProjectDetail", projectId],
    queryFn: async () => {
      return await getProjectDetail(Number(projectId!));
    },
  });
  console.log(projectDetailList?.members);

  // 전체 업무 상태
  const [allTasks, setAllTasks] = useState<AllTasksType>({
    IN_PROGRESS: [],
    COMPLETED: [],
    BEFORE_START: [],
    HOLD: [],
  });

  // 담당자 업무 상태
  const [manageTasks, setManageTasks] = useState<ManageTasksType[]>([]);
  // 프로젝트 참여자 상태
  const [member, setMember] = useState<members[]>(
    projectDetailList?.members || []
  );

  useEffect(() => {
    if (projectDetailList) {
      setMember(projectDetailList.members);
    }
  }, [projectDetailList]);

  console.log(member);

  useEffect(() => {
    console.log(projectDetailList, isLoading);
    if (projectDetailList) {
      console.log(projectDetailList);
      // 사이드메 담당자 탭 멤버 설정
      setManagers(projectDetailList.members);

      // 전체 업무 분류
      const tasks = projectDetailList.tasks;

      const tasksGroup = tasks.reduce(
        (acc: AllTasksType, cur: Task) => {
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

      // 담당자별 업무
      const manageGroupTasks = tasks.reduce<{ name: string; tasks: Task[] }[]>(
        (acc, task) => {
          const assignee = task.assignedMemberName;
          const existingGroup = acc.find((group) => group.name === assignee);

          if (existingGroup) {
            existingGroup.tasks.push(task);
          } else {
            acc.push({ name: assignee, tasks: [task] });
          }

          return acc;
        },
        []
      );
      setManageTasks(manageGroupTasks);
    }
  }, [projectDetailList]);

  // 사이드바에서 체크된 담당자
  const checkedManagers = useSideManagerStore((state) => state.checkedManagers);

  const [filterManageTasks, setFilterManageTasks] = useState<ManageTasksType[]>(
    []
  );

  useEffect(() => {
    console.log(checkedManagers);
    console.log(manageTasks);

    const filterTasks = manageTasks
      .map((task) => {
        if (checkedManagers.includes(task.name)) {
          return task;
        }
      })
      .filter((value) => value !== undefined);
    console.log(filterTasks);

    setFilterManageTasks(filterTasks);
  }, [checkedManagers]);

  useEffect(() => {
    console.log(searchParams.get("category"));
    setCategory(searchParams.get("category"));
  }, [searchParams.get("category")]);

  return (
    <>
      {/* 미팅룸 */}
      {category === "meeting" ? (
        <div className="flex flex-col gap-10 w-full min-h-[calc(100vh-60px)] bg-white/60 ">
          <MeetingRoomChatBox css="pb-[30px]" projectId={Number(projectId)} />
        </div>
      ) : (
        <div
          className="w-[calc(100vw-140px)] h-[calc(100vh-50px)] p-[30px] 
          flex flex-col gap-[30px]
          bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
        >
          <div className="w-full flex justify-between items-center">
            {/* 헤더 */}
            <div className="flex flex-col justify-between items-start gap-[10px]">
              <h1 className="font-bold text-[22px]">
                {projectDetailList?.projectName}
              </h1>

              {/* 태그 목록 */}
              <div className="flex justify-start gap-[10px]">
                {/* 분야 */}
                {projectDetailList?.categoryName && (
                  <p># {projectDetailList?.categoryName}</p>
                )}

                {/* 세부분야 1 */}
                {projectDetailList?.subCategories[0] &&
                  projectDetailList?.subCategories[0].tags.map((item) => (
                    <p key={item.name}># {item.name}</p>
                  ))}

                {/* 세부분야2 */}
                {projectDetailList?.subCategories[1] &&
                  projectDetailList?.subCategories[1].tags.map((item) => (
                    <p key={item.name}># {item.name}</p>
                  ))}
              </div>
            </div>

            {/* 업무 생성 버튼 */}
            <Button
              text="+ 업무 생성"
              size="md"
              css="bg-transparent border-main-green01 
              text-main-green01 text-[14px]"
              onClick={() => {
                setIsEditTaskModal(true);
              }}
            />
          </div>

          {/* 전체 업무 리스트 */}
          {(category === "all" || !category) && (
            <div
              className="w-full h-full overflow-scroll scrollbar px-[20px]
              flex justify-start gap-[30px]"
            >
              <TaskList
                name="진행 중"
                taskInfo={allTasks.IN_PROGRESS}
                refetch={refetch}
              />
              <TaskList
                name="진행 예정"
                taskInfo={allTasks.BEFORE_START}
                refetch={refetch}
              />
              <TaskList
                name="진행 완료"
                taskInfo={allTasks.COMPLETED}
                refetch={refetch}
              />
              <TaskList
                name="보류"
                taskInfo={allTasks.HOLD}
                refetch={refetch}
              />
            </div>
          )}
          {/* 담당자 업무 리스트 */}
          {category === "manager" && (
            <div
              className="w-full h-full overflow-scroll scrollbar
          flex justify-start gap-[30px]"
            >
              {filterManageTasks.map((task, idx) => {
                return (
                  <div key={idx}>
                    <TaskList
                      isAll={false}
                      taskInfo={task.tasks}
                      name={task.name}
                      refetch={refetch}
                    />
                  </div>
                );
              })}
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
              <CreateTaskModal
                onClose={setIsEditTaskModal}
                projectId={Number(projectId)}
                refetch={refetch}
                setIsModal={setIsEditTaskModal}
                memberData={member}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectRoomDetail;
