import { useOutletContext, useParams, useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import TaskList from "../../components/Task/TaskList";
import { useEffect, useRef, useState } from "react";
import MeetingRoomChatBox from "../../components/MeetingRoom/MeetingRoomChatBox";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { OutletContextType } from "../../components/layout/Layout";
import { useSideManagerStore } from "../../store/sideMemberStore";
import { getProjectById, getProjectDetail } from "../../api/project";
import dayjs from "dayjs";
import { showToast } from "../../utils/toastConfig";
import axios from "axios";
import { DndContext } from "@dnd-kit/core";
import { updateTask } from "../../api/task";
import { queryClient } from "../../main";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import loadingLottie from "../../assets/animations/loadingLottie.json";

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
    error,
    refetch: getProjectDetailRefetch,
  } = useQuery<ProjectDetailType>({
    queryKey: ["ProjectDetail", projectId],
    queryFn: async () => {
      return await getProjectDetail(Number(projectId!));
    },
    retry: false,
  });

  useEffect(() => {
    if (
      error &&
      axios.isAxiosError(error) &&
      (error.response?.status === 403 || error.response?.status === 404)
    ) {
      console.warn("403 또는 404 오류 발생 → Not Found 페이지로 이동");
      window.location.href = "/not-found"; // 강제 이동
    }
  }, [error]);

  console.log(projectDetailList);

  const { data: projectEditInfo } = useQuery<GetProjectById>({
    queryKey: ["ProjectEditInfo", projectId],
    queryFn: async () => {
      return await getProjectById(projectId as string);
    },
  });

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
    const filterTasks = manageTasks
      .map((task) => {
        if (checkedManagers.includes(task.name)) {
          return task;
        }
      })
      .filter((value) => value !== undefined);

    setFilterManageTasks(filterTasks);
  }, [manageTasks, checkedManagers]);

  // useEffect(() => {
  //   console.log(filterManageTasks);
  //   console.log(projectDetailList);
  // }, [projectDetailList]);

  useEffect(() => {
    setCategory(searchParams.get("category"));
  }, [searchParams.get("category")]);

  // drag
  const { mutateAsync: taskDragUpdate, isPending: taskDragUpdatePending } =
    useMutation({
      mutationFn: ({
        taskId,
        updateData,
      }: {
        taskId: number;
        updateData: UpdateTask;
      }) => updateTask(taskId, updateData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ProjectDetail"] });
        queryClient.invalidateQueries({ queryKey: ["ProjectEditInfo"] });
        showToast("success", "업무가 수정되었습니다.");
      },
    });

  const handleDragEnd = async (event: any) => {
    console.log("drag");
    const { active, over } = event;
    console.log(active, over);
    if (!over) return; // 드롭할 곳이 없으면 그대로 유지

    const taskInfo = active.data.current.updatedData;

    const taskListName = over.data.current.taskListName;

    console.log({
      taskId: taskInfo.id,
      updateData: { ...taskInfo, status: taskListName },
    });

    await taskDragUpdate({
      taskId: taskInfo.id,
      updateData: { ...taskInfo, status: taskListName },
    });
  };

  // 로티 ref
  // const lottieRef = useRef<LottieRefCurrentProps>(null);
  // useEffect(() => {
  //   if (lottieRef.current) {
  //     lottieRef.current.setSpeed(0.7);
  //   }
  // }, []);

  // if (taskDragUpdatePending) {
  //   return (
  //     <div>
  //       <Lottie
  //         lottieRef={lottieRef}
  //         animationData={loadingLottie}
  //         loop={true}
  //         className="w-80 h-80"
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      {/* 미팅룸 */}
      {category === "meeting" ? (
        <div className="flex flex-col gap-10 w-full min-h-[calc(100vh-60px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0 ">
          <MeetingRoomChatBox css="pb-[30px]" projectId={Number(projectId)} />
        </div>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
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
                  if (projectEditInfo) {
                    if (
                      projectEditInfo.endDate <
                      dayjs().format("YYYY-MM-DDTHH:mm:ss")
                    ) {
                      showToast(
                        "error",
                        "마감기한이 지난 프로젝트는 업무 생성 및 수정이 불가합니다."
                      );
                      return;
                    }
                  }
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
                  refetch={getProjectDetailRefetch}
                  projectData={projectDetailList}
                  projectEditInfo={projectEditInfo}
                />
                <TaskList
                  name="진행 예정"
                  taskInfo={allTasks.BEFORE_START}
                  refetch={getProjectDetailRefetch}
                  projectData={projectDetailList}
                  projectEditInfo={projectEditInfo}
                />
                <TaskList
                  name="진행 완료"
                  taskInfo={allTasks.COMPLETED}
                  refetch={getProjectDetailRefetch}
                  projectData={projectDetailList}
                  projectEditInfo={projectEditInfo}
                />
                <TaskList
                  name="보류"
                  taskInfo={allTasks.HOLD}
                  refetch={getProjectDetailRefetch}
                  projectData={projectDetailList}
                  projectEditInfo={projectEditInfo}
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
                        refetch={getProjectDetailRefetch}
                        projectEditInfo={projectEditInfo}
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
                  refetch={getProjectDetailRefetch}
                  setIsModal={setIsEditTaskModal}
                  memberData={member}
                  projectData={projectEditInfo}
                />
              </div>
            )}
          </div>
        </DndContext>
      )}
    </>
  );
};

export default ProjectRoomDetail;
