import EditButton from "../../../assets/icons/edit.svg";
import DeleteButton from "../../../assets/icons/delete.svg";
import SaveButton from "../../../assets/icons/save.svg";
import { useState } from "react";

interface AdminTagListProps {
  index: number;
  name: string;
  id: string;
  onChange: (id: string, newName: string) => void;
}

const AdminTagList = ({ index, name, id, onChange }: AdminTagListProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(name);

  const handleSave = () => {
    onChange(id, value);
    setIsEditable(false);
  };

  return (
    <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green ">
      <div className="flex justify-center">
        <span>{index + 1}</span>
      </div>
      <div className="flex w-full justify-center ">
        {isEditable ? (
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={20}
            className="resize-none text-[14px] h-[25px] w-full text-center focus:outline-none spellcheck-false overflow-hidden whitespace-nowrap text-ellipsis border-b border-b-header-green"
          />
        ) : (
          <span className="text-[14px] text-center">{name}</span>
        )}
      </div>
      {!isEditable ? (
        <button
          className="flex justify-center cursor-pointer"
          onClick={() => setIsEditable(true)}
        >
          <img src={EditButton} alt="수정 버튼" className="w-[25px] h-[25px]" />
        </button>
      ) : (
        <button
          className="flex justify-center cursor-pointer"
          onClick={handleSave}
        >
          <img src={SaveButton} alt="저장 버튼" className="w-[25px] h-[25px]" />
        </button>
      )}

      <button className="flex justify-center cursor-pointer">
        <img src={DeleteButton} alt="삭제 버튼" className="w-[25px] h-[25px]" />
      </button>
    </div>
  );
};

export default AdminTagList;
