import Button from "./Button";

const AlertModal = ({
  text,
  onClose,
  onConfirm,
}: {
  text: string;
  onClose: () => void;
  onConfirm?: (() => void) | null;
}) => {
  return (
    <div
      className="w-[423px]] h-[174px] bg-white px-[100px] py-[50px]
  flex flex-col justify-center items-center gap-[30px]"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-header-red font-bold">{text}</p>
      <div className="flex gap-2 w-[112px]">
        {onConfirm ? (
          <>
            <Button
              text="확인"
              size="md"
              css="text-white w-full text-[14px] bg-[#2B3E34] border-none"
              onClick={onConfirm}
            />
            <Button
              text="취소"
              size="md"
              css="text-main-beige01 w-full text-[14px] bg-[#ff6854]  border-none"
              onClick={onClose}
            />
          </>
        ) : (
          <Button
            text="확인"
            size="md"
            css="text-main-beige01 w-full text-[14px] bg-[#2B3E34] border-none"
            onClick={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default AlertModal;
