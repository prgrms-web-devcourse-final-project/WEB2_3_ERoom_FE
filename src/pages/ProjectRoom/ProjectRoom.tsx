import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import ProjectListBox from "../../components/ProjectRoom/ProjectListBox";
import Button from "../../components/common/Button";
import AllProjectOutModal from "../../components/modals/AllProjectOutModal";
import EditProjectModal from "../../components/modals/EditProjectModal";
import { useQuery } from "@tanstack/react-query";
import { getProjectList } from "../../utils/api/getProjectList";
import {
  createProject,
  fetchProjectDetail,
  fetchProjectList,
} from "../../api/project";
import { fetchMemberList } from "../../api/admin";

interface ProjectRoomData {
  completed: ProjectListType[];
  inProgress: ProjectListType[];
  beforeStart: ProjectListType[];
}

const FILTER_PROJECT: (
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

  useEffect(() => {
    console.log(projectRoomList, isLoading);
    if (projectRoomList) {
      console.log(projectRoomList.completed);
    }
  }, [projectRoomList]);

  // 전체 프로젝트 나가기 모달
  const [isAllProjectOutModal, setIsAllProjectOutModal] =
    useState<boolean>(false);

  // 프로젝트 생성 모달
  const [isEditProjectModal, setIsEditProjectModal] = useState<boolean>(false);

  useEffect(() => {
    fetchProjectList();
    fetchMemberList();
    createProject(
      "프로젝트 이름",
      "프로젝트 설명",
      "개발",
      ["백엔드", "프론트엔드"],
      ["Spring", "React"],
      "2025-02-19T09:00:00",
      "2025-06-30T18:00:00",
      [2, 3, 4]
    )
      .then((data) => {
        console.log("프로젝트 생성 완료:", data);
      })
      .catch((error) => {
        console.error("프로젝트 생성 중 오류 발생:", error);
      });
  }, []);

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
            {FILTER_PROJECT.map((project, idx) => {
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
          {filterProject === "진행 예정 프로젝트" &&
            projectRoomList?.beforeStart.map((project, idx) => (
              <ProjectListBox
                key={project.id}
                idx={idx}
                projectId={+project.id}
                filterProject={filterProject}
                projectInfo={project}
              />
            ))}
          {filterProject === "진행 중인 프로젝트" &&
            projectRoomList?.inProgress.map((project, idx) => (
              <ProjectListBox
                key={project.id}
                idx={idx}
                projectId={+project.id}
                filterProject={filterProject}
                projectInfo={project}
              />
            ))}
          {filterProject === "진행 완료 프로젝트" &&
            projectRoomList?.completed.map((project, idx) => (
              <ProjectListBox
                key={project.id}
                idx={idx}
                projectId={+project.id}
                filterProject={filterProject}
                projectInfo={project}
              />
            ))}
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
