import { Link, useNavigate } from "react-router";
import ProjectProgressBar from "./ProjectProgressBar";
import ParticipantIcon from "../common/ParticipantIcon";
import Button from "../common/Button";
import { useState } from "react";
import EditProjectModal from "../modals/EditProjectModal";
import ConfirmModal from "../modals/ConfirmModal";
import { twMerge } from "tailwind-merge";
import { useAuthStore } from "../../store/authStore";
import { useMutation } from "@tanstack/react-query";
import { deleteProject, leaveProject } from "../../api/project";
import { queryClient } from "../../main";
import AlertModal from "../common/AlertModal";

const ProjectListBox = ({
  projectId,
  idx,
  projectInfo,
}: ProjectListBoxProps) => {
  const navigate = useNavigate();
  // 프로젝트 생성 모달
  const [isEditProjectModal, setIsEditProjectModal] = useState<boolean>(false);
  // 프로젝트 나가기 모달
  const [isLeaveModal, setIsLeaveModal] = useState<boolean>(false);

  const loginUser = useAuthStore((state) => state.member);

  const ISCREATED_BY_LOGINUSER = loginUser?.id === projectInfo.creatorId;

  const { mutateAsync: deleteProjectFn } = useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ProjectRoomList"] }),
  });

  const { mutateAsync: leaveProjectFn } = useMutation({
    mutationFn: (projectId: number) => leaveProject(projectId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["ProjectRoomList"] }),
  });

  // 모달 적용
  const [modalText, setModalText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (text: string) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalText("");
    setIsModalOpen(false);
  };

  const deleteOrLeave = async (type: "DELETE" | "LEAVE", projectId: number) => {
    if (type === "DELETE") {
      if (projectInfo.members.length > 1) {
        return openModal("프로젝트에 다른 멤버가 없어야 삭제할 수 있습니다");
      }

      if (!ISCREATED_BY_LOGINUSER) {
        return openModal("프로젝트에 생성자만 삭제할 수 있습니다");
      }

      try {
        return await deleteProjectFn(projectId);
      } catch (error) {
        console.error(error);
      }
    } else {
      if (ISCREATED_BY_LOGINUSER) {
        return alert("프로젝트에 생성자는 나갈 수 없습니다.");
      }
      try {
        return await leaveProjectFn(projectId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //참여인원 호버
  const [hoverStates, setHoverStates] = useState<{ [key: number]: boolean }>(
    {}
  );

  // 호버 상태 업데이트 함수
  const handleMouseEnter = (idx: number) => {
    setHoverStates((prev) => ({ ...prev, [idx]: true }));
  };

  const handleMouseLeave = (idx: number) => {
    setHoverStates((prev) => ({ ...prev, [idx]: false }));
  };

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
            <div className="w-[130px] flex">
              {projectInfo.members.length > 5
                ? projectInfo.members.slice(0, 6).map((member, idx) => (
                    <div
                      key={idx}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(idx)}
                      onMouseLeave={() => handleMouseLeave(idx)}
                    >
                      <ParticipantIcon
                        key={idx}
                        css={idx > 0 ? "ml-[-5px]" : ""}
                        imgSrc={member.profile || ""}
                      />
                      {hoverStates[idx] && (
                        <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 bg-white text-black px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                          {member.username}
                        </div>
                      )}
                    </div>
                  ))
                : projectInfo.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="relative"
                      onMouseEnter={() => handleMouseEnter(idx)}
                      onMouseLeave={() => handleMouseLeave(idx)}
                    >
                      <ParticipantIcon
                        key={idx}
                        css={idx > 0 ? "ml-[-7px]" : ""}
                        imgSrc={member.profile || ""}
                      />
                      {hoverStates[idx] && (
                        <div className="absolute w-auto top-[40px] left-1/2 transform -translate-x-1/2 bg-white text-black px-2 py-1 rounded-md shadow-md whitespace-nowrap">
                          {member.username}
                        </div>
                      )}
                    </div>
                  ))}
            </div>
          </div>

          {/* 버튼 모음 */}
          <div className="w-[130px] flex gap-[10px] items-center">
            {/* 수정 */}
            {ISCREATED_BY_LOGINUSER && (
              <Button
                text="수정"
                size="md"
                css="w-full h-[40px] border-main-green02 text-main-green01"
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  setIsEditProjectModal(true); // 모달 열기
                }}
              />
            )}

            {/* 나가기 / 삭제 */}
            <Button
              text={ISCREATED_BY_LOGINUSER ? "삭제" : "나가기"}
              size="md"
              css={`w-full h-[40px] border-[#ff6854]/70 bg-white text-[#ff6854] ${
                ISCREATED_BY_LOGINUSER ? "bg-header-red text-white" : ""
              }`}
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
              # {projectInfo.categoryName}
            </li>

            {projectInfo.subCategories.map((subCate, subCateIdx) => {
              return subCate.tags.map((tag) => {
                return (
                  <li
                    key={tag.id}
                    className={twMerge(`h-fit bg-main-beige01 rounded-[30px]
                  text-main-green leading-none px-[10px] py-[5px] 
                      border border-logo-green ${
                        subCateIdx === 1 ? "bg-main-green03" : ""
                      }`)}
                  >
                    # {tag.name}
                  </li>
                );
              });
            })}
          </ul>

          {/* 미팅룸 버튼 */}

          <Link
            to={`/meeting-room/${projectInfo.chatRoomId}`}
            className="w-[130px] h-[40px] bg-[#FFFCE2] 
                text-main-green01 flex items-center justify-center
                border border-main-green01 font-bold rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            미팅룸 입장
          </Link>
        </div>
      </div>

      {/* 프로젝트 편집 모달 */}
      {isEditProjectModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
          flex justify-center items-center bg-black/70 z-50"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 방지
            setIsEditProjectModal(false); // 모달 닫기
          }}
        >
          <EditProjectModal
            projectId={projectId}
            selectedProject={projectInfo}
            setIsEditProjectModal={setIsEditProjectModal}
            title="프로젝트 편집"
          />
        </div>
      )}

      {/* 프로젝트 나가기 모달 */}
      {isLeaveModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
          flex justify-center items-center bg-black/70 z-50"
          onClick={(e) => {
            e.stopPropagation(); // 이벤트 전파 방지
            setIsLeaveModal(false); // 모달 닫기
          }}
        >
          <ConfirmModal
            processId={projectId}
            processType="프로젝트"
            value={ISCREATED_BY_LOGINUSER ? "삭제" : "나가기"}
            deleteOrLeave={() =>
              ISCREATED_BY_LOGINUSER
                ? deleteOrLeave("DELETE", projectId)
                : deleteOrLeave("LEAVE", projectId)
            }
            setIsModal={setIsLeaveModal}
          />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <AlertModal text={modalText} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default ProjectListBox;
