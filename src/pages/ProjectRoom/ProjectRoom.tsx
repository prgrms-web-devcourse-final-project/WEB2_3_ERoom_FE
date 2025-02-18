import { useState } from "react";

import { twMerge } from "tailwind-merge";
import ProjectListBox from "../../components/ProjectRoom/ProjectListBox";
import Button from "../../components/common/Button";
import AllProjectOutModal from "../../components/modals/AllProjectOutModal";
import CreateProjectModal from "../../components/modals/CreateProjectModal";

const FILTER_PROJECT: (
  | "진행 완료 프로젝트"
  | "진행 중인 프로젝트"
  | "진행 예정 프로젝트"
)[] = ["진행 완료 프로젝트", "진행 중인 프로젝트", "진행 예정 프로젝트"];

const ProjectRoom = () => {
  const [filterProject, setFilterProject] = useState<
    "진행 완료 프로젝트" | "진행 중인 프로젝트" | "진행 예정 프로젝트"
  >("진행 중인 프로젝트");

  // 임시 배열
  const [arr, setArr] = useState(Array.from({ length: 20 }, (_, idx) => idx));

  // 전체 프로젝트 나가기 모달
  const [isAllProjectOutModal, setIsAllProjectOutModal] =
    useState<boolean>(false);

  // 프로젝트 생성 모달
  const [isCreateProjectModal, setIsCreateProjectModal] =
    useState<boolean>(false);

  return (
    <div
      className="w-full bg-white p-[50px] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
      style={{ maxHeight: "calc(100vh - 50px)" }}
    >
      <div className="bg-white w-full h-full flex flex-col items-center gap-4 px-10">
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
            <div className="flex w-[230px] gap-[10px]">
              <Button
                text="프로젝트 선택"
                size="md"
                css="border-main-green01 text-main-green01 w-[120px] text-[14px] px-2"
              />
              <Button
                text="+ 프로젝트 생성"
                size="md"
                css="border-none text-main-beige01 bg-main-green01 w-[130px] text-[14px] px-2"
                onClick={() => setIsCreateProjectModal(true)}
              />
            </div>
          )}
          {filterProject === "진행 완료 프로젝트" && (
            <div className="flex w-[230px] gap-[10px]">
              <Button
                text="프로젝트 선택"
                size="md"
                css="border-main-green01 text-main-green01 w-[120px] text-[14px] px-2"
              />
              <Button
                text="전체 나가기"
                size="md"
                css="border-[#FF6854] text-white bg-[#FF6854]/70 w-[130px] text-[14px] px-2"
                onClick={() => setIsAllProjectOutModal(true)}
              />
            </div>
          )}
        </div>

        {/* 프로젝트 목록 섹션 */}
        <div
          className="w-full max-h-[calc(100vh-220px)] flex flex-col gap-4 overflow-y-scroll scrollbar-none
          flex-grow border border-main-green01 px-5 py-10 rounded-[10px]
          bg-gradient-to-t from-[#BFCDB7]/10 via-[#BFCDB7]/0 to-[#BFCDB7]/10"
        >
          {arr.map((_, idx) => (
            <ProjectListBox
              key={idx}
              projectId={idx + 1}
              filterProject={filterProject}
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
      {isCreateProjectModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
          flex justify-center items-center bg-black/70"
          onClick={() => setIsCreateProjectModal(false)}
        >
          <CreateProjectModal
            setIsCreateProjectModal={setIsCreateProjectModal}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectRoom;
