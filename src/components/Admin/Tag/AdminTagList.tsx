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
import {
  adminDeleteDetailTag,
  adminEditDetailTag,
} from "../../../api/adminDetailTag";
import { twMerge } from "tailwind-merge";

interface AdminTagListProps {
  index: number;
  name: string;
  id: number;
  subcategoryId?: number;
  // onChange: (id: number, newName: string) => void;
  onClick: (categoryIndex: number, categoryId: number) => void;
  type: "category" | "subCategory" | "detailTags";
  isClicked?: number | null;
  setIsClicked?: React.Dispatch<
    React.SetStateAction<number | null | undefined>
  >;
}

const AdminTagList = ({
  index,
  name,
  id,
  subcategoryId,
  // onChange,
  onClick,
  type,
  isClicked,
  setIsClicked,
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

  // 서브카테고리 삭제함수
  const { mutate: deleteSubCategoryFn } = useMutation({
    mutationFn: (subcategoryId: number) =>
      adminDeleteSubCategory(subcategoryId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] }),
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] }),
    onSettled: () => setIsEditable(false),
  });

  // 상세항목 태그 삭제함수
  const { mutate: deleteDetailTagFn } = useMutation({
    mutationFn: ({
      subcategoryId,
      tagId,
    }: {
      subcategoryId: number;
      tagId: number;
    }) => adminDeleteDetailTag(subcategoryId, tagId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] }),
  });

  // 상세항목 태그 수정함수
  const { mutate: editDetailTagFn } = useMutation({
    mutationFn: ({
      subcategoryId,
      tagId,
      editDetailTagName,
    }: {
      subcategoryId: number;
      tagId: number;
      editDetailTagName: string;
    }) => adminEditDetailTag(subcategoryId, tagId, editDetailTagName),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] }),
  });

  return (
    <div
      onClick={() => {
        onClick(index, id);
        if (setIsClicked) {
          setIsClicked(index);
        }
      }}
      className={twMerge(
        `grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green cursor-pointer ${
          isClicked === index ? "bg-main-green03" : ""
        }`
      )}
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
        <>
          <button
            className="flex justify-center cursor-pointer"
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
                } else if (type === "detailTags" && subcategoryId) {
                  deleteDetailTagFn({ subcategoryId, tagId: id });
                }
              }}
            />
          </button>
        </>
      ) : (
        <>
          <button
            className="flex justify-center cursor-pointer"
            onClick={() => {
              if (type === "category") {
                if (!value.trim().length) {
                  return alert("최소 한글자 이상 입력해주세요");
                }
                editCategoryFn({ categoryId: id, editedName: value });
              } else if (type === "subCategory") {
                if (!value.trim().length) {
                  return alert("최소 한글자 이상 입력해주세요");
                }
                editSubCategoryFn({
                  subcategoryId: id,
                  editSubCateName: value,
                });
              } else if (type === "detailTags" && subcategoryId) {
                if (!value.trim().length) {
                  return alert("최소 한글자 이상 입력해주세요");
                }
                editDetailTagFn({
                  subcategoryId,
                  tagId: id,
                  editDetailTagName: value,
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

          <div className="flex justify-center items-center">
            <AdminEditCancelBtn
              onClick={() => setIsEditable(false)}
              css={"w-[35px] text-[14px]"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminTagList;
