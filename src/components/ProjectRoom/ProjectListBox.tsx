import { Link } from "react-router";
import ProjectProgressBar from "./ProjectProgressBar";
import ParticipantIcon from "../common/ParticipantIcon";
import Button from "../common/Button";

interface ProjectListBoxProps {
  projectId: number;
  filterProject: string;
}

const ProjectListBox = ({ projectId, filterProject }: ProjectListBoxProps) => {
  return (
    <div
      className="bg-white border border-[#CAD2CB] w-full h-[70px] flex 
        gap-5 items-center px-5 font-bold "
    >
      {/* 프로젝트 넘버 */}
      <p className="text-[50px] font-medium text-main-green02">10</p>

      <div className="flex justify-between items-center w-full px-5">
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

        <div className="flex gap-3 items-center">
          <Button
            text="수정"
            size="md"
            css="h-[40px] w-[48px] border-main-green02 text-main-green01"
          />
          {filterProject === "진행 중인 프로젝트" && (
            <Link
              to={`/meetingRoom/${projectId}`}
              className="h-[40px] bg-[#FFFCE2] text-main-green01 flex items-center justify-center
          border border-main-green01 px-[10px] font-bold rounded-sm"
            >
              미팅룸 입장
            </Link>
          )}

          {(filterProject === "진행 완료 프로젝트" ||
            filterProject === "진행 예정 프로젝트") && (
            <Button
              text="나가기"
              size="md"
              css="h-[40px] w-[65px] border-[#ff6854]/70 bg-white text-[#ff6854]"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectListBox;
