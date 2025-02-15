import { Link } from "react-router";
import ProjectProgressBar from "./ProjectProgressBar";
import ParticipantIcon from "../common/ParticipantIcon";

interface ProjectListBoxProps {
  projectId: number;
}

const ProjectListBox = ({ projectId }: ProjectListBoxProps) => {
  return (
    <div
      className="bg-white border border-[#CAD2CB] w-full h-[70px] flex 
        justify-between items-center px-10 font-bold flex-shrink-0"
    >
      {/* 프로젝트 넘버 */}

      {/* 프로젝트 명, 기간 */}
      <div>
        <p>프로젝트 명</p>
        <p>2025.02.03 ~ 2025.03.12</p>
      </div>

      {/* 진행률 */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex justify-center gap-2">
          <p>진행률</p>
          <p>50.0%</p>
        </div>
        <ProjectProgressBar />
      </div>

      {/* 참여인원 */}
      <div className=" flex items-center gap-4">
        <p>참여인원</p>
        <div className="flex">
          <ParticipantIcon css="" />
          <ParticipantIcon css="ml-[-5px] bg-red-100" />
          <ParticipantIcon css="ml-[-5px] bg-blue-100" />
          <ParticipantIcon css="ml-[-5px] bg-green-100" />
          <ParticipantIcon css="ml-[-5px] bg-pink-100" />
        </div>
      </div>

      {/* 프로젝트 입장 임시 url설정 */}
      <Link
        to={`/projectRoom/${projectId}`}
        className="bg-[#cad2cb70] text-[#6E8370] border border-[#CAD2CB] p-[10px] font-bold rounded-sm"
      >
        프로젝트 입장
      </Link>
    </div>
  );
};

export default ProjectListBox;
