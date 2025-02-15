import Button from "../common/Button";

interface AllProjectOutModalProps {
  setIsAllProjectOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const AllProjectOutModal = ({
  setIsAllProjectOutModal,
}: AllProjectOutModalProps) => {
  return (
    <div
      className="w-[450px] h-[155px] bg-white
      flex flex-col justify-center items-center gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <p>정말로 모든 프로젝트를 나가시겠습니까?</p>
      <div className="flex gap-2">
        <Button
          text="나가기"
          size="md"
          css="text-white w-[60px] bg-[#ff6854] border-none"
        />
        <Button
          text="취소"
          size="md"
          css="text-main-beige01 bg-[#2B3E34] w-[45px] border-none"
          onClick={() => setIsAllProjectOutModal(false)}
        />
      </div>
    </div>
  );
};

export default AllProjectOutModal;
