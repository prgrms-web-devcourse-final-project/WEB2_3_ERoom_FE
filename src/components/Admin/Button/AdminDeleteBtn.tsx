import DeleteIcon from "../../../assets/icons/delete.svg";
interface AdminDeleteBtnProps {
  onClick: () => void;
}
const AdminDeleteBtn = ({ onClick }: AdminDeleteBtnProps) => {
  return (
    <button onClick={onClick}>
      <img src={DeleteIcon} alt="계정 삭제 버튼" />
    </button>
  );
};

export default AdminDeleteBtn;
