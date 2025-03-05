import EditButton from "../../../assets/icons/edit.svg";
import DeleteButton from "../../../assets/icons/delete.svg";
import SaveButton from "../../../assets/icons/save.svg";
import { useState } from "react";
import AdminEditCancelBtn from "../Button/AdminEditCancelBtn";
import { useMutation } from "@tanstack/react-query";
import {
  adminDeleteCategory,
  adminEditCategory,
} from "../../../api/adminCategory";
import { queryClient } from "../../../main";
import {
  adminDeleteSubCategory,
  adminEditSubCategory,
} from "../../../api/adminSubCategory";

interface AdminTagListProps {
  index: number;
  name: string;
  id: number;
  // onChange: (id: number, newName: string) => void;
  onClick: (categoryIndex: number, categoryId: number) => void;
  type: "category" | "subCategory" | "detailTags";
}

const AdminTagList = ({
  index,
  name,
  id,
  // onChange,
  onClick,
  type,
}: AdminTagListProps) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState(name);

  // 카테고리 삭제함수
  const { mutate: deleteCategoryFn } = useMutation({
    mutationFn: (categoryId: number) => adminDeleteCategory(categoryId),
    // onSuccess:
  });

  // 카테고리 수정함수
  const { mutate: editCategoryFn } = useMutation({
    mutationFn: ({
      categoryId,
      editedName,
    }: {
      categoryId: number;
      editedName: string;
    }) => adminEditCategory(categoryId, editedName),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] }),
    onSettled: () => setIsEditable(false),
  });

  const handleSave = () => {
    editCategoryFn({ categoryId: id, editedName: value });
  };

  // 서브카테고리 삭제함수
  const { mutate: deleteSubCategoryFn } = useMutation({
    mutationFn: (subcategoryId: number) =>
      adminDeleteSubCategory(subcategoryId),
  });

  // 서브카테고리 수정함수
  const { mutate: editSubCategoryFn } = useMutation({
    mutationFn: ({
      subcategoryId,
      editSubCateName,
    }: {
      subcategoryId: number;
      editSubCateName: string;
    }) => adminEditSubCategory(subcategoryId, editSubCateName),
  });

  return (
    <div
      onClick={() => onClick(index, id)}
      className="grid grid-cols-[9.4%_1fr_25%] w-full h-[33px] text-main-green cursor-pointer"
    >
      <div className="flex justify-center items-center">
        <span>{index + 1}</span>
      </div>
      <div className="flex w-full justify-center  items-center">
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
        <div className="flex justify-center gap-5">
          <button
            className="flex  justify-center cursor-pointer"
            onClick={() => {
              setIsEditable(true);
            }}
          >
            <img
              src={EditButton}
              alt="수정 버튼"
              className="w-[35px] h-[35px]"
            />
          </button>
          <button className="flex justify-center cursor-pointer">
            <img
              src={DeleteButton}
              alt="삭제 버튼"
              className="w-[35px] h-[35px]"
              onClick={(e) => {
                e.stopPropagation();
                if (type === "category") {
                  deleteCategoryFn(id);
                } else if (type === "subCategory") {
                  deleteSubCategoryFn(id);
                }
              }}
            />
          </button>
        </div>
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className=" flex justify-center items-center gap-5"
        >
          <button
            className="w-[35px] h-[35px] flex justify-center cursor-pointer"
            onClick={() => {
              if (type === "category") {
                editCategoryFn({ categoryId: id, editedName: value });
              } else if (type === "subCategory") {
                editSubCategoryFn({
                  subcategoryId: id,
                  editSubCateName: value,
                });
              }
            }}
          >
            <img
              src={SaveButton}
              alt="저장 버튼"
              className="w-[35px] h-[35px]"
            />
          </button>

          <AdminEditCancelBtn
            onClick={() => setIsEditable(false)}
            css={"w-[35px] text-[14px]"}
          />
        </div>
      )}
    </div>
  );
};

export default AdminTagList;
