import { Link, useNavigate } from "react-router";
import ProjectProgressBar from "./ProjectProgressBar";
import ParticipantIcon from "../common/ParticipantIcon";
import Button from "../common/Button";
import { useState } from "react";
import EditProjectModal from "../modals/EditProjectModal";

interface ProjectListBoxProps {
  projectId: number;
  filterProject: string;
  projectInfo: ProjectListType;
  idx: number;
}

interface selectedProjectData {
  projectName: string;
  projectStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  cate: string;
  subcate1: string[];
  subcate2: string[];
}

// (임시) 프로젝트 박스 프로젝트정보
const selectedProjectData = {
  projectName: "최종프로젝트",
  projectStatus: "COMPLETED",
  createdAt: "2025-02-01T14:30:00",
  startDate: "2025-02-05T05:17:17.374",
  endDate: "2025-03-11T05:17:17.374",
  cate: "개발",
  subcate1: ["JavaScript"],
  subcate2: ["React"],
};

// (임시) 프로젝트 박스 선택된 멤버
const selectedProjectMember = [
  {
    id: 2,
    userName: "홍서범",
    email: "b@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스2",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 3,
    userName: "홍홍홍",
    email: "c@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스3",
    profileImage:
      "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    delete: "ACTIVE",
  },
];

const ProjectListBox = ({
  projectId,
  filterProject,
  idx,
  projectInfo,
}: ProjectListBoxProps) => {
  const navigate = useNavigate();
  // 프로젝트 생성 모달
  const [isEditProjectModal, setIsEditProjectModal] = useState<boolean>(false);
  // 프로젝트 박스 정보
  const [projectDataInfo, setProjectDataInfo] =
    useState<selectedProjectData>(selectedProjectData);

  const members = projectInfo.memberNames;

  return (
    <div
      className="bg-white border border-[#CAD2CB] w-full pb-3 cursor-pointer"
      onClick={() => navigate(`/project-room/${projectId}`)}
    >
      <div className="flex gap-5 items-center px-5 font-bold ">
        <p className="text-[50px] font-medium text-main-green02 font-notoTC">
          {idx + 1}
        </p>
        {/* 프로젝트 넘버 */}

        <div className="flex justify-between items-center w-full px-5">
          {/* 프로젝트 명, 기간 */}
          <div className="w-[210px]">
            <p>{projectInfo.name}</p>
            <p>
              {projectInfo.startDate.split("T")[0]} ~{" "}
              {projectInfo.endDate.split("T")[0]}
            </p>
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
          <div className=" flex items-center gap-4 w-[202px]">
            <p>참여인원</p>
            <div className="flex">
              {members.length > 5
                ? members
                    .slice(0, 6)
                    .map((member, idx) => (
                      <ParticipantIcon
                        key={idx}
                        css={idx > 0 ? "ml-[-5px]" : ""}
                      />
                    ))
                : members.map((menber, idx) => (
                    <ParticipantIcon
                      key={idx}
                      css={idx > 0 ? "ml-[-5px]" : ""}
                    />
                  ))}
              {/* <ParticipantIcon css="" />
              <ParticipantIcon css="ml-[-5px] bg-red-100" />
              <ParticipantIcon css="ml-[-5px] bg-blue-100" />
              <ParticipantIcon css="ml-[-5px] bg-green-100" />
              <ParticipantIcon css="ml-[-5px] bg-pink-100" /> */}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Button
              text="수정"
              size="md"
              css="h-[40px] w-[48px] border-main-green02 text-main-green01"
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 전파 방지
                setIsEditProjectModal(true); // 모달 열기
              }}
            />
            {filterProject === "진행 중인 프로젝트" && (
              <Link
                to={`/meeting-room/${projectInfo.chatRoomId}`}
                className="h-[40px] bg-[#FFFCE2] text-main-green01 flex items-center justify-center
          border border-main-green01 px-[10px] font-bold rounded-sm"
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            )}
          </div>
        </div>
      </div>
      <ul className="flex gap-2 ml-[90px] text-main-beige text-[14px]">
        <li className="bg-main-green02 px-2 py-1 rounded-[25px] text-main-green01">
          #개발
        </li>
        <li className="bg-main-green01 px-2 py-1 rounded-[25px]">#JAVA</li>
        <li className="bg-white px-2 py-1 rounded-[25px] border border-main-green01 text-main-green01">
          #HTML
        </li>
        {/* <li className="bg-main-green01 px-2 py-1 rounded-[25px]">#REACT</li> */}
      </ul>

      {/* 프로젝트 생성 모달 */}
      {isEditProjectModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
          flex justify-center items-center bg-black/70"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 방지
            setIsEditProjectModal(false); // 모달 닫기
          }}
        >
          <EditProjectModal
            selectedProjectData={projectDataInfo}
            setSelectedProjectData={setProjectDataInfo}
            setIsEditProjectModal={setIsEditProjectModal}
            projectMember={selectedProjectMember}
            title="프로젝트 편집"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectListBox;
