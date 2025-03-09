import { twMerge } from "tailwind-merge";
import Button from "../common/Button";

const SimpleAlertModal = ({
  text,
  setIsModal,
  css,
}: {
  text: string;
  css?: string;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div
      className={twMerge(
        `bg-white text-main-green px-[100px] py-[50px] gap-[30px]
  flex flex-col justify-center items-center z-10 rounded-[5px]`,
        css
      )}
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

export default SimpleAlertModal;
