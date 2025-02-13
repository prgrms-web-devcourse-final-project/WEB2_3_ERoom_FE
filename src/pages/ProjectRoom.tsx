import { useState } from "react";
import ProjectListBox from "../components/ProjectRoom/ProjectListBox";
import { twMerge } from "tailwind-merge";

const ProjectRoom = () => {
  const FILTER_PROJECT: (
    | "진행 완료 프로젝트"
    | "진행 중인 프로젝트"
    | "진행 예정 프로젝트"
  )[] = ["진행 완료 프로젝트", "진행 중인 프로젝트", "진행 예정 프로젝트"];

  const [filterProject, setFilterProject] = useState<
    "진행 완료 프로젝트" | "진행 중인 프로젝트" | "진행 예정 프로젝트"
  >("진행 중인 프로젝트");

  return (
    <div
      className="w-full bg-white p-[50px]"
      style={{ maxHeight: "calc(100vh - 50px)" }}
    >
      <div className="bg-white w-full h-full flex flex-col items-center gap-4 px-10">
        {/* 프로젝트 필터링 */}
        <ul
          className="flex justify-center items-center gap-5 h-[70px] text-[18px]
        font-bold text-black w-full "
        >
          {FILTER_PROJECT.map((project, idx) => {
            return (
              <li
                key={idx}
                onClick={() => setFilterProject(project)}
                className={twMerge(
                  `cursor-pointer border border-[#CAD2CB] text-[#CAD2CB] w-[200px] h-[30px] flex justify-center items-center rounded-[5px] ${
                    filterProject === project && "text-black border-black"
                  }`
                )}
              >
                {project}
              </li>
            );
          })}
        </ul>

        {/* 프로젝트 목록 섹션 */}
        <div
          className="w-full flex flex-col gap-4 overflow-y-scroll flex-grow"
          style={{ maxHeight: "calc(100vh - 270px)" }}
        >
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
          <ProjectListBox />
        </div>

        {/* 새 프로젝트 생성 */}
        <div className="w-full h-[50px] bg-[#6E8370] rounded-[5px] cursor-pointer"></div>
      </div>
    </div>
  );
};

export default ProjectRoom;
