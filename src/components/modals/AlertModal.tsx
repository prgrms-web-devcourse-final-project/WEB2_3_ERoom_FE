import Button from "../common/Button";

const AlertModal = ({
  text,
  setIsModal,
}: {
  text: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className="bg-white text-main-green px-[100px] py-[50px] gap-[30px]
  flex flex-col justify-center items-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <p>{text}</p>
      <Button
        text="확인"
        size="md"
        css="w-fit h-fit px-[10px] py-[5px] text-main-beige01 bg-logo-green"
        onClick={(e) => {
          e.stopPropagation();
          setIsModal(false);
        }}
      />
    </div>
  );
};

export default AlertModal;
