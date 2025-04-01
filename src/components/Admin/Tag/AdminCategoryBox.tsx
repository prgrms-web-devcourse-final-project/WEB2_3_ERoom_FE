import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient } from "../../../main";
import AdminTagBox from "./AdminTagBox";
import { showToast } from "../../../utils/toastConfig";
import { adminNewCategory, getAllCategory } from "../../../api/adminCategory";
import AdminTagAdd from "./AdminTagAdd";
import AddButton from "../../../assets/button/add_tag.svg";
import AdminTagList from "./AdminTagList";

interface AdminCategoryBoxProps {
  setSelectedCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  selectedCategoryId: number | null;
}

const AdminCategoryBox = ({ setSelectedCategoryId }: AdminCategoryBoxProps) => {
  const { data: allCategories } = useQuery<AllCategoryType[]>({
    queryKey: ["AllCategory"],
    queryFn: getAllCategory,
    retry: false,
  });

  useEffect(() => {
    console.log("re", allCategories);
  }, [allCategories]);

  // 분야 추가
  const [isAddCategory, setIsAddCategory] = useState(false);

  const { mutate: addNewCategoryFn } = useMutation({
    mutationFn: (newCategoryName: string) => adminNewCategory(newCategoryName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] });
      showToast("success", "분야가 추가되었습니다");
      setIsAddCategory(false);
    },
  });

  const handleAddCategory = () => {
    setIsAddCategory(true);
  };

  const [isCategoryClicked, setIsCategoryClicked] = useState<number | null>(
    null
  );

  const categoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="flex flex-col w-full gap-[10px]">
      <span className="font-bold text-[16px] text-main-green">re분야</span>
      <div className="flex w-full justify-end">
        <button onClick={handleAddCategory} className="cursor-pointer">
          <img src={AddButton} alt="분야 생성 버튼" />
        </button>
      </div>
      <AdminTagBox name="분야" />
      <div className="h-[400px] overflow-y-scroll scrollbar-none">
        {/* 카테고리 */}
        {allCategories?.map((category, index) => (
          <AdminTagList
            key={category.id}
            index={index}
            id={category.id}
            name={category.name}
            isClicked={isCategoryClicked}
            setIsClicked={setIsCategoryClicked}
            onClick={() => categoryClick(category.id)}
            type="category"
          />
        ))}
        {isAddCategory && allCategories && (
          <AdminTagAdd
            index={allCategories.length}
            onClick={(newCategoryName: string) =>
              addNewCategoryFn(newCategoryName)
            }
            setIsAdd={setIsAddCategory}
            addType="category"
          />
        )}
      </div>
    </div>
  );
};

export default AdminCategoryBox;
