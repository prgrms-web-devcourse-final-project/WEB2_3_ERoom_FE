import SaveButton from "../../../assets/icons/save.svg";
import { useState } from "react";
import AdminEditCancelBtn from "../Button/AdminEditCancelBtn";

interface AdminTagAddProps {
  index: number;
  onClick?: (newCategoryName: string) => void;
  categoryId?: number;
  subcategoryId?: number;
  addSubCategory?: (categoryId: number, newSubCategoryName: string) => void;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  addType: string;
  addDetailTag?: (subcategoryId: number, newDetailTagName: string) => void;
}

const AdminTagAdd = ({
  index,
  setIsAdd,
  categoryId,
  subcategoryId,
  onClick,
  addSubCategory,
  addDetailTag,
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
            if (!newValue.trim().length) {
              alert("최소 한글자 이상 입력해주세요");
              return;
            }
            onClick(newValue);
          } else if (
            addType === "subCategory" &&
            addSubCategory &&
            categoryId
          ) {
            if (!newValue.trim().length) {
              alert("최소 한글자 이상 입력해주세요");
              return;
            }
            addSubCategory(categoryId, newValue);
          } else if (addType === "detailTag" && addDetailTag && subcategoryId) {
            if (!newValue.trim().length) {
              alert("최소 한글자 이상 입력해주세요");
              return;
            }
            addDetailTag(subcategoryId, newValue);
          }
        }}
      >
        <img src={SaveButton} alt="저장 버튼" className="w-[35px] h-[35px]" />
      </button>
      <div className="flex justify-center items-center">
        <AdminEditCancelBtn onClick={() => setIsAdd(false)} />
      </div>
    </div>
  );
};

export default AdminTagAdd;
