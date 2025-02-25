import { Link, useNavigate } from "react-router";
import ProjectProgressBar from "./ProjectProgressBar";
import ParticipantIcon from "../common/ParticipantIcon";
import Button from "../common/Button";
import { useState } from "react";
import EditProjectModal from "../modals/EditProjectModal";
import { deleteProject, leaveProject } from "../../api/project";
import { useMutation, useQuery } from "@tanstack/react-query";
import ConfirmModal from "../modals/ConfirmModal";

const ProjectListBox = ({
  projectId,
  filterProject,
  idx,
  projectInfo,
}: ProjectListBoxProps) => {
  const navigate = useNavigate();
  // 프로젝트 생성 모달
  const [isEditProjectModal, setIsEditProjectModal] = useState<boolean>(false);
  // 프로젝트 나가기 모달
  const [isLeaveModal, setIsLeaveModal] = useState<boolean>(false);

  const subcate1 = projectInfo.subCategories1;
  const subcate2 = projectInfo.subCategories2;

  // 프로젝트 나가기
  const { mutate: deleteProjectMutation } = useMutation({
    mutationFn: async () => await deleteProject(String(projectId!)),
    onSuccess: () => {
      console.log("프로젝트 삭제 완료");
    },
    onError: (error) => {
      console.error("프로젝트 삭제 실패:", error);
    },
  });

  // 프로젝트 나가기
  const { mutate: leaveProjectMutation } = useMutation({
    mutationFn: async () => await leaveProject(String(projectId!)),
    onSuccess: () => {
      console.log("프로젝트 나가기 완료");
    },
    onError: (error) => {
      console.error("프로젝트 나가기 실패:", error);
    },
  });

  return (
    <div
      className="w-full flex gap-[10px] bg-white 
      border border-[#CAD2CB] cursor-pointer"
      onClick={() => navigate(`/project-room/${projectId}`)}
    >
      {/* 프로젝트 넘버 */}
      <p
        className="w-[80px] h-[75px] text-[50px] text-center leading-none font-medium 
      text-main-green02 font-notoTC"
      >
        {idx + 1}
      </p>

      {/* 프로젝트 정보 */}
      <div className="w-full px-[20px] py-[10px] flex flex-col gap-[20px]">
        {/* 상단 info */}
        <div className="w-full flex justify-between items-center">
          {/* 프로젝트 명, 기간 */}
          <div className="w-fit font-bold">
            <p className="w-fit">{projectInfo.name}</p>
            <p className="w-fit">
              {projectInfo.startDate.split("T")[0]} ~{" "}
              {projectInfo.endDate.split("T")[0]}
            </p>
          </div>

          {/* 진행률 */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[200px] flex justify-center gap-[10px] font-bold">
              <p>진행률</p>
              <p>{projectInfo.progressRate.toFixed(1)}%</p>
            </div>
            <ProjectProgressBar progress={projectInfo.progressRate} />
          </div>

          {/* 참여인원 */}
          <div className="w-[200px] flex items-center gap-[10px] font-bold">
            <p className="w-[56px] text-center">참여인원</p>

            {/* 프로필이미지 모음 */}
            {/* <div className="w-[130px] flex">
              {projectInfo.members.length > 5
                ? projectInfo.members
                    .slice(0, 6)
                    .map((member, idx) => (
                      <ParticipantIcon
                        key={idx}
                        css={idx > 0 ? "ml-[-5px]" : ""}
                        imgSrc={member.profile}
                      />
                    ))
                : projectInfo.members.map((member, idx) => (
                    <ParticipantIcon
                      key={idx}
                      css={idx > 0 ? "ml-[-7px]" : ""}
                      imgSrc={member.profile}
                    />
                  ))}
            </div> */}
          </div>

          {/* 버튼 모음 */}
          <div className="w-[130px] flex gap-[10px] items-center">
            {/* 수정 */}
            <Button
              text="수정"
              size="md"
              css="w-full h-[40px] border-main-green02 text-main-green01"
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 전파 방지
                setIsEditProjectModal(true); // 모달 열기
              }}
            />

            {/* 나가기 */}
            <Button
              text="나가기"
              size="md"
              css="w-full h-[40px] border-[#ff6854]/70 bg-white text-[#ff6854]"
              onClick={(e) => {
                e.stopPropagation();
                setIsLeaveModal(true);
              }}
            />
          </div>
        </div>

        {/* 태그 및 미팅룸 버튼 */}
        <div className="flex justify-between items-center">
          {/* 태그 */}
          <ul className="flex gap-2 text-main-beige text-[14px]">
            <li
              className="h-fit bg-logo-green rounded-[30px] 
            text-main-beige01 leading-none px-[10px] py-[5px] font-bold"
            >
              # {projectInfo.category}
            </li>
            {subcate1.map((cate, idx) => {
              return (
                <li
                  key={idx}
                  className="h-fit bg-main-beige01 rounded-[30px]
            text-main-green leading-none px-[10px] py-[5px] border border-logo-green"
                >
                  # {cate}
                </li>
              );
            })}
            {subcate2.map((cate, idx) => {
              return (
                <li
                  key={idx}
                  className="h-fit bg-main-green03 rounded-[30px] 
            text-main-green leading-none px-[10px] py-[5px] border border-logo-green "
                >
                  # {cate}
                </li>
              );
            })}
          </ul>

          {/* 미팅룸 버튼 */}
          {filterProject === "진행 중인 프로젝트" && (
            <Link
              to={`/meeting-room/${projectInfo.chatRoomId}`}
              className="w-[130px] h-[40px] bg-[#FFFCE2] 
                text-main-green01 flex items-center justify-center
                border border-main-green01 font-bold rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              미팅룸 입장
            </Link>
          )}
        </div>
      </div>

      {/* 프로젝트 편집 모달 */}
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
            selectedData={projectInfo}
            setIsEditProjectModal={setIsEditProjectModal}
            title="프로젝트 편집"
          />
        </div>
      )}

      {/* 프로젝트 나가기 모달 */}
      {isLeaveModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
          flex justify-center items-center bg-black/70"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 방지
            setIsLeaveModal(false); // 모달 닫기
          }}
        >
          <ConfirmModal value="나가기" setIsModal={setIsLeaveModal} />
        </div>
      )}
    </div>
  );
};

export default ProjectListBox;
