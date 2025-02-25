import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";
import { deleteProject, leaveProject } from "../../api/project";

const ConfirmModal = ({
  projectId,
  value,
  setIsModal,
}: {
  projectId: number;
  value: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useAuthStore();

  // 프로젝트 나가기
  const { mutate: leaveProjectMutation } = useMutation({
    mutationFn: async () => await leaveProject(projectId!),
    onSuccess: () => {
      console.log("프로젝트 나가기 완료");
    },
    onError: (error) => {
      console.error("프로젝트 나가기 실패:", error);
    },
  });

  // 프로젝트 삭제
  const { mutate: deleteProjectMutation } = useMutation({
    mutationFn: async () => await deleteProject(projectId!),
    onSuccess: () => {
      console.log("프로젝트 삭제 완료");
    },
    onError: (error) => {
      console.error("프로젝트 삭제 실패:", error);
    },
  });

  return (
    <div
      className="bg-white text-main-green px-[100px] py-[50px] gap-[30px]
      flex flex-col justify-center items-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <p className="text-[14px] font-bold text-header-red">
          {value === "나가기"
            ? "정말로 나가시겠습니까?"
            : `정말로 ${value}하시겠습니까?`}
        </p>
      </div>

      {/* 버튼 모음 */}
      <div className="flex gap-[10px] justify-between">
        {/* 확인 버튼 */}
        <Button
          text={value}
          size="md"
          css="w-fit h-fit px-[10px] py-[5px] text-white bg-header-red"
          onClick={(e) => {
            e.stopPropagation();
            setIsModal(false);
            if (value === "탈퇴") {
              logout();
            } else if (value === "나가기") {
              console.log("나가기 버튼 클릭됨"); // 디버깅용 로그
              leaveProjectMutation();
            }
          }}
        />

        {/* 취소 버튼 */}
        <Button
          text="취소"
          size="md"
          css="w-fit h-fit px-[10px] py-[5px] text-main-beige01 bg-logo-green"
          onClick={(e) => {
            e.stopPropagation();
            setIsModal(false);
          }}
        />
      </div>
    </div>
  );
};

export default ConfirmModal;
