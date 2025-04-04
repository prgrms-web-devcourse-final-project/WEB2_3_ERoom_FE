import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";
import AlertModal from "../common/AlertModal";

const ConfirmModal = ({
  processId,
  processType,
  value,
  setIsModal,
  deleteOrLeave,
  onClick,
  onDeleteTask,
}: {
  processId?: number;
  processType?: string;
  value: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: (processId: number) => void;
  onDeleteTask?: () => void;
  deleteOrLeave?: () => void;
}) => {
  const logout = useAuthStore((state) => state.logout);

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
            if (value === "탈퇴") {
              logout();
              openModal("탈퇴 완료");
              // setIsModal(false);
            }

            if (processType === "프로젝트" && deleteOrLeave) {
              deleteOrLeave(); // 프로젝트 삭제 / 나가기 함수
              // openModal(`${value}성공!`);
              // setIsModal(false);
            } else if (
              processId &&
              onClick &&
              value === "삭제" &&
              processType === "업무"
            ) {
              onClick(processId);
            }

            if (processType === "업무" && value === "삭제" && onDeleteTask) {
              onDeleteTask();
              setIsModal(false);
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
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <AlertModal text={modalText} onClose={closeModal} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmModal;
