import { twMerge } from "tailwind-merge";

interface AdminEditCancelBtnProps {
  onClick: (e?: any) => void;
  css?: string;
}

const AdminEditCancelBtn = ({ onClick, css }: AdminEditCancelBtnProps) => {
  return (
    <button
      className={twMerge(
        `w-[37px] h-[24px] border rounded-[5px] outline-none
  text-header-green border-header-green cursor-pointer`,
        css
      )}
      onClick={onClick}
    >
      취소
    </button>
  );
};

export default AdminEditCancelBtn;
