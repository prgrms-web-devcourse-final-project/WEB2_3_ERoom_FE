import SaveButton from "../../../assets/icons/save.svg";
import { useState } from "react";
import AdminEditCancelBtn from "../Button/AdminEditCancelBtn";

interface AdminTagAddProps {
  index: number;
  onClick?: (newCategoryName: string) => void;
  categoryId?: number;
  addSubCategory?: (categoryId: number, newSubCategoryName: string) => void;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  addType: string;
}

const AdminTagAdd = ({
  index,
  setIsAdd,
  categoryId,
  onClick,
  addSubCategory,
  addType,
}: AdminTagAddProps) => {
  const [newValue, setNewValue] = useState("");

  return (
    <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green ">
      <div className="flex justify-center items-center">
        <span>{index + 1}</span>
      </div>
      <div className="flex w-full justify-center items-center">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          maxLength={20}
          className="resize-none text-[14px] h-[25px] w-full text-center focus:outline-none spellcheck-false overflow-hidden whitespace-nowrap text-ellipsis border-b border-b-header-green"
        />
      </div>

      <button
        className="flex justify-center items-center cursor-pointer"
        onClick={() => {
          if (addType === "category" && onClick) {
            onClick(newValue);
          } else if (
            addType === "subCategory" &&
            addSubCategory &&
            categoryId
          ) {
            addSubCategory(categoryId, newValue);
          }
        }}
      >
        <img src={SaveButton} alt="저장 버튼" className="w-[35px] h-[35px]" />
      </button>
      <AdminEditCancelBtn onClick={() => setIsAdd(false)} />
    </div>
  );
};

export default AdminTagAdd;
