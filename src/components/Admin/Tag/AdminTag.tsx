import { useEffect, useState } from "react";
import AdminButton from "../../common/AdminButton";
import AddButton from "../../../assets/button/add_tag.svg";
import AdminTagList from "./AdminTagList";
import AdminTagAdd from "./AdminTagAdd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { adminNewCategory, getAllCategory } from "../../../api/adminCategory";
import AdminTagBox from "./AdminTagBox";
import { adminAddNewSubCategory } from "../../../api/adminSubCategory";
import { adminAddnewDetailTag } from "../../../api/adminDetailTag";
import { queryClient } from "../../../main";

const AdminTag = () => {
  const { data: allCategories, refetch } = useQuery<AllCategoryType[]>({
    queryKey: ["AllCategory"],
    queryFn: getAllCategory,
  });

  const [subCategories2, setSubCategories2] = useState<SubCategoryType[]>([]);

  const [details2, setDetails2] = useState<any[]>([]);

  const [categoryId, setCategoryId] = useState<number>();
  const [subCategoryId, setSubCategoryId] = useState<number>();

  useEffect(() => {
    if (allCategories) {
      // setSubCategories2(allCategories[0].subcategories);
    }
  }, [allCategories]);

  const categoryClick = (categoryIndex: number, categoryId: number) => {
    if (allCategories) {
      setSubCategories2(allCategories[categoryIndex].subcategories);
      setDetails2([]);
      setCategoryId(categoryId);
    }
    setIsAddCategory(false);
    setIsAddSubCategory(false);
    setIsAddDetailTag(false);

    setIsSubCateClicked(null);
  };

  const subCategoryClick = (subCateIndex: number, subcategoryId: number) => {
    if (allCategories) {
      setSubCategoryId(subcategoryId);
      setDetails2(
        allCategories[isCategoryClicked!].subcategories[subCateIndex].tags
      );
    }

    setIsAddDetailTag(false);
  };

  // ---------------------------------------------------------------------------------

  const [isTagList, setIsTagList] = useState("tagList");

  const handleButtonClick = (type: "tagList" | "tagData") => {
    setIsTagList(type);
  };

  //  분야 추가
  const [isAddCategory, setIsAddCategory] = useState(false);

  const { mutate: addNewCategoryFn } = useMutation({
    mutationFn: (newCategoryName: string) => adminNewCategory(newCategoryName),
    onSuccess: () => {
      setIsAddCategory(false);
      refetch();
    },
  });

  const handleAddCategory = () => {
    setIsAddCategory(true);
  };

  // 세부항목 추가
  const [isAddSubCategory, setIsAddSubCategory] = useState(false);

  const handleAddSubcategory = () => {
    if (subCategories2.length === 2) {
      return alert("세부항목은 최대 2개까지 생성이 가능합니다");
    }
    setIsAddSubCategory(true);
  };

  const { mutate: addNewSubCategory } = useMutation({
    mutationFn: ({
      categoryId,
      newSubCategoryName,
    }: {
      categoryId: number;
      newSubCategoryName: string;
    }) => adminAddNewSubCategory(categoryId, newSubCategoryName),
    onSuccess: () => {
      setIsAddSubCategory(false);
      refetch();
    },
  });

  // 상세항목 추가

  const [isAddDetailTag, setIsAddDetailTag] = useState(false);

  const handleAddDetail = () => {
    setIsAddDetailTag(true);
  };

  const { mutateAsync: addNewDetailTag } = useMutation({
    mutationFn: async ({
      subcategoryId,
      newDetailTagName,
    }: {
      subcategoryId: number;
      newDetailTagName: string;
    }) => {
      const response = await adminAddnewDetailTag(
        subcategoryId,
        newDetailTagName
      );
      setDetails2((prev) => [...prev, response?.data]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["AllCategory"] });
      setIsAddDetailTag(false);
    },
  });

  const [isCategoryClicked, setIsCategoryClicked] = useState<number | null>();
  const [isSubCateClicked, setIsSubCateClicked] = useState<number | null>();

  return (
    <div className="h-[calc(100vh-50px)] bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0">
      <div className="min-h-[calc(100vh-80px)] mx-[30px] mb-[30px] px-[30px] pt-[30px] flex flex-col  bg-white/60">
        <div className="pl-[20px] mb-[30px]">
          <span className="text-[22px] font-bold text-main-green">
            태그 정보
          </span>
        </div>
        <div className="flex mb-[30px]">
          <div className="flex gap-[10px]">
            <AdminButton
              text="태그 목록"
              type={isTagList === "tagList" ? "green" : "white"}
              onClick={() => handleButtonClick("tagList")}
            />
            <AdminButton
              text="태그 데이터"
              type={isTagList === "tagData" ? "green" : "white"}
              onClick={() => handleButtonClick("tagData")}
            />
          </div>
        </div>
        <div className="flex w-full gap-[30px]">
          <div className="flex flex-col w-full gap-[10px]">
            <span className="font-bold text-[16px] text-main-green">분야</span>
            <div className="flex w-full justify-end">
              <button onClick={handleAddCategory} className="cursor-pointer">
                <img src={AddButton} alt="분야 생성 버튼" />
              </button>
            </div>
            <AdminTagBox name="분야" />
            <div className="h-[400px] overflow-y-scroll scrollbar-none">
              {allCategories?.map((category, index) => (
                <AdminTagList
                  key={category.id}
                  index={index}
                  id={category.id}
                  name={category.name}
                  isClicked={isCategoryClicked}
                  setIsClicked={setIsCategoryClicked}
                  onClick={categoryClick}
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
          <div className="flex flex-col w-full gap-[10px]">
            <span className="font-bold text-[16px] text-main-green">
              세부항목
            </span>

            <div className="h-[27px] flex w-full justify-end">
              {categoryId && (
                <button
                  onClick={handleAddSubcategory}
                  className="cursor-pointer"
                >
                  <img src={AddButton} alt="세부항목 생성 버튼" />
                </button>
              )}
            </div>

            <AdminTagBox name="세부항목" />
            <div className="h-[400px] overflow-y-scroll scrollbar-none">
              {subCategories2.map((subcategory, index) => (
                <AdminTagList
                  key={subcategory.id}
                  index={index}
                  id={subcategory.id}
                  name={subcategory.name}
                  // onChange={handleSubcategoryChange}
                  onClick={subCategoryClick}
                  type="subCategory"
                  isClicked={isSubCateClicked}
                  setIsClicked={setIsSubCateClicked}
                />
              ))}
              {isAddSubCategory && subCategories2 && (
                <AdminTagAdd
                  index={subCategories2.length}
                  categoryId={categoryId}
                  addSubCategory={(
                    categoryId: number,
                    newSubCategoryName: string
                  ) => addNewSubCategory({ categoryId, newSubCategoryName })}
                  setIsAdd={setIsAddSubCategory}
                  addType="subCategory"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col w-full gap-[10px]">
            <span className="font-bold text-[16px] text-main-green">
              상세항목
            </span>

            <div className="flex w-full justify-end h-[27px]">
              {subCategoryId && (
                <button onClick={handleAddDetail} className="cursor-pointer">
                  <img src={AddButton} alt="상세항목 생성 버튼" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green border-b border-b-main-green">
              <div className="flex justify-center">
                <span>No.</span>
              </div>
              <div className="flex justify-center">
                <span>상세항목</span>
              </div>
              <div className="flex justify-center">
                <span>수정</span>
              </div>
              <div className="flex justify-center">
                <span>삭제</span>
              </div>
            </div>
            <div className="h-[400px] overflow-y-scroll scrollbar-none">
              {details2.map((detail, index) => (
                <AdminTagList
                  key={detail.id}
                  index={index}
                  id={detail.id}
                  name={detail.name}
                  subcategoryId={subCategoryId}
                  // onChange={handleDetailChange}
                  onClick={() => {}}
                  type="detailTags"
                  // isClicked={isDetailTagClicked}
                  // setIsClicked={setIsDetailTagClicked}
                />
              ))}
              {isAddDetailTag && subCategoryId && (
                <AdminTagAdd
                  index={details2.length}
                  subcategoryId={subCategoryId}
                  setIsAdd={setIsAddDetailTag}
                  addType="detailTag"
                  addDetailTag={(
                    subcategoryId: number,
                    newDetailTagName: string
                  ) => addNewDetailTag({ subcategoryId, newDetailTagName })}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTag;
