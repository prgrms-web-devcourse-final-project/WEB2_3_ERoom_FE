import EditButton from "../../../assets/icons/edit.svg";
import DeleteButton from "../../../assets/icons/delete.svg";

interface AdminTagListProps {
  index: number;
  name: string | null;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AdminTagAdd = ({ index, name, handleChange }: AdminTagListProps) => {
  return (
    <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green ">
      <div className="flex justify-center">
        <span>{index + 1}</span>
      </div>
      <div className="flex w-full justify-center ">
        <textarea
          value={name || ""}
          onChange={(e) => handleChange(e)}
          placeholder="분야를 작성해주세요"
          className="border-b border-b-header-green resize-none text-[14px] h-[25px] w-full text-center"
        />
      </div>
      <div className="flex justify-center">
        <img src={EditButton} alt="수정 버튼" className="w-[25px] h-[25px]" />
      </div>
      <div className="flex justify-center">
        <img src={DeleteButton} alt="삭제 버튼" className="w-[25px] h-[25px]" />
      </div>
    </div>
  );
};

export default AdminTagAdd;
