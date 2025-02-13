import ProjectListBox from "../components/ProjectRoom/ProjectListBox";

const ProjectRoom = () => {
  return (
    <div
      className="w-full bg-[#fffce2] p-[50px]"
      style={{ height: "calc(100vh - 50px)" }}
    >
      <div className="bg-[#a1a1a1] w-full h-full flex flex-col items-center gap-4 px-10">
        {/* 프로젝트 필터링 */}
        <ul
          className="flex justify-around items-center h-[70px] text-[18px]
        font-bold text-black w-full bg-pink-100"
        >
          <li className="cursor-pointer border w-full h-full flex-1 flex justify-center items-center">
            진행 완료 프로젝트
          </li>
          <li className="cursor-pointer border w-full h-full flex-1 flex justify-center items-center">
            진행 중인 프로젝트
          </li>
          <li className="cursor-pointer border w-full h-full flex-1 flex justify-center items-center">
            진행 예정 프로젝트
          </li>
        </ul>

        {/* 프로젝트 목록 섹션 */}
        <div className="w-full">
          <ProjectListBox />
        </div>
      </div>
    </div>
  );
};

export default ProjectRoom;
