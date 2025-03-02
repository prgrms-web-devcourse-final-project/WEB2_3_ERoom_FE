interface AdminEditCancelBtnProps {
  onClick: () => void;
}

const AdminEditCancelBtn = ({ onClick }: AdminEditCancelBtnProps) => {
  return (
    <button
      className="w-[37px] h-[24px] border rounded-[5px] outline-none
  text-header-green border-header-green cursor-pointer"
      onClick={onClick}
    >
      취소
    </button>
  );
};

export default AdminEditCancelBtn;
