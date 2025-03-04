import { useState } from "react";
import { twMerge } from "tailwind-merge";
import ProjectListBox from "../../components/ProjectRoom/ProjectListBox";
import Button from "../../components/common/Button";
import AllProjectOutModal from "../../components/modals/AllProjectOutModal";
import EditProjectModal from "../../components/modals/EditProjectModal";
import { useQuery } from "@tanstack/react-query";
import { getProjectList } from "../../api/project";

interface ProjectRoomData {
  completed: ProjectListType[];
  inProgress: ProjectListType[];
  beforeStart: ProjectListType[];
}

const PROJECT_TAB: (
  | "진행 완료 프로젝트"
  | "진행 중인 프로젝트"
  | "진행 예정 프로젝트"
)[] = ["진행 완료 프로젝트", "진행 중인 프로젝트", "진행 예정 프로젝트"];

const ProjectRoom = () => {
  const [filterProject, setFilterProject] = useState<
    "진행 완료 프로젝트" | "진행 중인 프로젝트" | "진행 예정 프로젝트"
  >("진행 중인 프로젝트");

  // 프로젝트리스트 데이터
  const { data: projectRoomList, isLoading } = useQuery<ProjectRoomData>({
    queryKey: ["ProjectRoomList"],
    queryFn: async () => {
      const dataList: ProjectListType[] = await getProjectList();

      const inProgressData = dataList.filter(
        (list) => list.status === "IN_PROGRESS"
      );
      const completedData = dataList.filter(
        (list) => list.status === "COMPLETED"
      );
      const beforeStartData = dataList.filter(
        (list) => list.status === "BEFORE_START"
      );
      return {
        completed: completedData,
        inProgress: inProgressData,
        beforeStart: beforeStartData,
      };
    },
  });

  const FILTER_PROJECT_VALUE = {
    "진행 예정 프로젝트": projectRoomList?.beforeStart,
    "진행 중인 프로젝트": projectRoomList?.inProgress,
    "진행 완료 프로젝트": projectRoomList?.completed,
  };

  const filterProjects = FILTER_PROJECT_VALUE[filterProject];

  // 전체 프로젝트 나가기 모달
  const [isAllProjectOutModal, setIsAllProjectOutModal] =
    useState<boolean>(false);

  // 프로젝트 생성 모달
  const [isEditProjectModal, setIsEditProjectModal] = useState<boolean>(false);

  return (
    <div
      className="w-full bg-white p-[50px] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
      style={{ maxHeight: "calc(100vh - 50px)" }}
    >
      <div className="bg-white/80 w-full h-full flex flex-col items-center gap-4 px-10">
        <div className="flex items-center gap-2 justify-between w-full">
          {/* 프로젝트 필터링 */}
          <ul
            className="flex justify-start items-center gap-5 h-[70px] text-[18px]
          font-bold text-black w-full max-w-[660px]"
          >
            {PROJECT_TAB.map((project, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => setFilterProject(project)}
                  className={twMerge(
                    `cursor-pointer border border-[#CAD2CB] text-[#CAD2CB] w-full h-[30px] flex justify-center items-center rounded-[5px] ${
                      filterProject === project && "text-black border-black"
                    }`
                  )}
                >
                  {project}
                </li>
              );
            })}
          </ul>
          {(filterProject === "진행 중인 프로젝트" ||
            filterProject === "진행 예정 프로젝트") && (
            <div className="flex w-fit gap-[10px]">
              <Button
                text="+ 프로젝트 생성"
                size="md"
                css="border-none text-main-beige01 bg-main-green01 w-[130px] text-[14px] px-2"
                onClick={() => setIsEditProjectModal(true)}
              />
            </div>
          )}
        </div>

        {/* 프로젝트 목록 섹션 */}
        <div
          className="w-full max-h-[calc(100vh-220px)] min-h-[500px] flex flex-col gap-4 overflow-y-scroll scrollbar-none
          flex-grow  py-10 rounded-[10px]"
        >
          {filterProjects?.length ? (
            filterProjects.map((project, idx) => (
              <ProjectListBox
                key={project.id}
                idx={idx}
                projectId={+project.id}
                filterProject={filterProject}
                projectInfo={project}
              />
            ))
          ) : (
            <p className="text-[30px] font-semibold flex items-center justify-center h-screen pb-[80px] text-main-green01">
              {filterProject}가 없습니다!
            </p>
          )}
        </div>
      </div>

      {/* 전체 프로젝트 나가기 모달 */}
      {isAllProjectOutModal && (
        <div
          className="absolute inset-0 w-screen h-screen flex justify-center items-center bg-black/70"
          onClick={() => setIsAllProjectOutModal(false)}
        >
          <AllProjectOutModal
            setIsAllProjectOutModal={setIsAllProjectOutModal}
          />
        </div>
      )}

      {/* 프로젝트 생성 모달 */}
      {isEditProjectModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
          flex justify-center items-center bg-black/70"
          onClick={() => setIsEditProjectModal(false)}
        >
          <EditProjectModal
            setIsEditProjectModal={setIsEditProjectModal}
            title="프로젝트 생성"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectRoom;
