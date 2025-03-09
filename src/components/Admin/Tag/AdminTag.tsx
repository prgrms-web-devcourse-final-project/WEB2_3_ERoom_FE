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
import { showToast } from "../../../utils/toastConfig";
import AdminTagChart from "./AdminTagChart";
import TagCountBox from "./TagCountBox";

const AdminTag = () => {
  const { data: allCategories } = useQuery<AllCategoryType[]>({
    queryKey: ["AllCategory"],
    queryFn: getAllCategory,
  });

  const [subCategories2, setSubCategories2] = useState<SubCategoryType[]>([]);

  const [details2, setDetails2] = useState<{ id: number; name: string }[]>([]);

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if (allCategories && isCategoryClicked !== null) {
      setSubCategories2(allCategories[isCategoryClicked].subcategories);
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

  const [isTagList, setIsTagList] = useState("tagList");

  const handleButtonClick = (type: "tagList" | "tagData") => {
    setIsTagList(type);
  };

  //  분야 추가
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

  // 세부항목 추가
  const [isAddSubCategory, setIsAddSubCategory] = useState(false);

  const handleAddSubcategory = () => {
    if (subCategories2.length === 2) {
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

  const [isCategoryClicked, setIsCategoryClicked] = useState<number | null>(
    null
  );
  const [isSubCateClicked, setIsSubCateClicked] = useState<number | null>(null);

  useEffect(() => {
    setSubCategoryId(null);
    console.log("as");
    if (isCategoryClicked === null) {
      setIsSubCateClicked(null);
      setSubCategories2([]);
      setDetails2([]);
    }
  }, [isCategoryClicked]);

  useEffect(() => {
    console.log(subCategoryId);
  }, [subCategoryId]);

  // 태그 목록
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
        {isTagList === "tagList" ? (
          <div className="flex w-full gap-[30px]">
            <div className="flex flex-col w-full gap-[10px]">
              <span className="font-bold text-[16px] text-main-green">
                분야
              </span>
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
                    onClick={subCategoryClick}
                    type="subCategory"
                    isClicked={isSubCateClicked}
                    setIsClicked={setIsSubCateClicked}
                    setDetails2={setDetails2}
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
                {subCategoryId !== null && (
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
                    onClick={() => {}}
                    type="detailTags"
                    setDetails2={setDetails2}
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
        ) : (
          <div className="w-full">
            <div className="flex gap-5 mb-[80px]">
              <TagCountBox title="총 분야 수" count={allCategories?.length} />
              <TagCountBox
                title="총 세부항목 수"
                count={allCategories?.reduce(
                  (acc, category) => acc + category.subcategories.length,
                  0
                )}
              />
              <TagCountBox
                title="총 상세항목 수"
                count={allCategories?.reduce((acc, category) => {
                  return (
                    acc +
                    category.subcategories.reduce((subAcc, subcategory) => {
                      return subAcc + subcategory.tags.length;
                    }, 0)
                  );
                }, 0)}
              />
            </div>
            <AdminTagChart />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTag;
