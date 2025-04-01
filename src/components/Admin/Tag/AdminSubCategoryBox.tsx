import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../../main";
import {
  adminAddNewSubCategory,
  adminGetSubCategory,
} from "../../../api/adminSubCategory";
import AdminTagBox from "./AdminTagBox";
import { showToast } from "../../../utils/toastConfig";
import AdminTagAdd from "./AdminTagAdd";
import AddButton from "../../../assets/button/add_tag.svg";
import AdminTagList from "./AdminTagList";

interface AdminSubCategoryBoxProps {
  categoryId: number | null;
  selectedSubCategoryId: number | null;
  setSelectedSubCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const AdminSubCategoryBox = ({
  categoryId,
  setSelectedSubCategoryId,
}: AdminSubCategoryBoxProps) => {
  // 서브카테고리 데이터
  const { data: subCategories } = useQuery<SubCategoryType[]>({
    queryKey: ["subCategory", categoryId],
    queryFn: () => adminGetSubCategory(categoryId),
  });

  useEffect(() => {
    console.log("reSub", subCategories);
  }, [subCategories]);

  // 서브카테고리 추가
  const [isAddSubCategory, setIsAddSubCategory] = useState(false);

  const handleAddSubcategory = () => {
    if (subCategories && subCategories.length === 2) {
      showToast("error", "세부항목은 최대 2개까지 생성이 가능합니다");
      return;
    }
    setIsAddSubCategory(true);
  };

  const { mutateAsync: addNewSubCategory } = useMutation({
    mutationFn: async ({
      categoryId,
      newSubCategoryName,
    }: {
      categoryId: number;
      newSubCategoryName: string;
    }) => await adminAddNewSubCategory(categoryId, newSubCategoryName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] });
      setIsAddSubCategory(false);
    },
  });

  const [isSubCateClicked, setIsSubCateClicked] = useState<number | null>(null);

  const subCategoryClick = (subCategoryId: number) => {
    console.log("subCateClick", subCategoryId);
    setSelectedSubCategoryId(subCategoryId);
  };

  return (
    <div className="flex flex-col w-full gap-[10px]">
      <span className="font-bold text-[16px] text-main-green">re세부항목</span>

      <div className="h-[27px] flex w-full justify-end">
        {categoryId && (
          <button onClick={handleAddSubcategory} className="cursor-pointer">
            <img src={AddButton} alt="세부항목 생성 버튼" />
          </button>
        )}
      </div>

      <AdminTagBox name="세부항목" />
      <div className="h-[400px] overflow-y-scroll scrollbar-none">
        {/* 서브카테고리 */}
        {subCategories?.map((subcategory, index) => (
          <AdminTagList
            key={subcategory.id}
            index={index}
            id={subcategory.id}
            name={subcategory.name}
            onClick={() => subCategoryClick(subcategory.id)}
            type="subCategory"
            isClicked={isSubCateClicked}
            setIsClicked={setIsSubCateClicked}
            // setDetails2={setDetails2}
          />
        ))}
        {isAddSubCategory && subCategories && (
          <AdminTagAdd
            index={subCategories.length}
            categoryId={categoryId}
            addSubCategory={(categoryId: number, newSubCategoryName: string) =>
              addNewSubCategory({ categoryId, newSubCategoryName })
            }
            setIsAdd={setIsAddSubCategory}
            addType="subCategory"
          />
        )}
      </div>
    </div>
  );
};

export default AdminSubCategoryBox;
