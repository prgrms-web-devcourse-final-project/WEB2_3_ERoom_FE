import { useAuthStore } from "../../store/authStore";
import Button from "../common/Button";

const ConfirmModal = ({
  value,
  setIsModal,
}: {
  value: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout } = useAuthStore();

  return (
    <div
      className="bg-white text-main-green px-[100px] py-[50px] gap-[30px]
      flex flex-col justify-center items-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <p className="text-[14px] font-bold text-header-red">
          정말로 {value}하시겠습니까?
        </p>
      </div>

      {/* 버튼 모음 */}
      <div className="flex gap-[10px] justify-between">
        {/* 탈퇴 버튼 */}
        <Button
          text="탈퇴"
          size="md"
          to="/"
          css="w-fit h-fit px-[10px] py-[5px] text-white bg-header-red"
          onClick={(e) => {
            e.stopPropagation();
            setIsModal(false);
            logout();
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
