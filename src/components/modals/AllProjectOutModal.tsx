import Button from "../common/Button";

interface AllProjectOutModalProps {
  setIsAllProjectOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const AllProjectOutModal = ({
  setIsAllProjectOutModal,
}: AllProjectOutModalProps) => {
  return (
    <div
      className="w-[423px]] h-[174px] bg-white px-[100px] py-[50px]
      flex flex-col justify-center items-center gap-[30px]"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-header-red font-bold">
        정말로 모든 프로젝트를 나가시겠습니까?
      </p>
      <div className="flex gap-2 w-[112px]">
        <Button
          text="나가기"
          size="md"
          css="text-white w-full text-[14px] bg-[#ff6854] border-none"
        />
        <Button
          text="취소"
          size="md"
          css="text-main-beige01 w-full text-[14px] bg-[#2B3E34] border-none"
          onClick={() => setIsAllProjectOutModal(false)}
        />
      </div>
    </div>
  );
};

export default AllProjectOutModal;
