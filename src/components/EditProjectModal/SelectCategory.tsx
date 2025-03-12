import { useEffect, useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";
import triangleUp from "../../assets/button/triangle/triangleUp.svg";
import triangleDown from "../../assets/button/triangle/triangleDown.svg";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../api/category";

// 선택된 데이터 타입
interface SelectedDataType {
  categoryId: number | null;
  categoryName: string;
  subCategories: {
    subCategoryId: number;
    tagIds: number[];
  }[];
}

interface SelectCategoryProps {
  selectedData: SelectedDataType;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedDataType>>;
  cateError: boolean;
  setCateError: React.Dispatch<React.SetStateAction<boolean>>;
  subCateError: boolean;
  setSubCateError: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectCategory = ({
  selectedData,
  setSelectedData,
  cateError,
  setCateError,
  subCateError,
  setSubCateError,
}: SelectCategoryProps) => {
  // API에서 카테고리 정보 가져오기
  const { data: allCategoryData, isLoading: categoryDataLoading } = useQuery<
    AllCategoryType[]
  >({
    queryKey: ["AllCategoryData"],
    queryFn: getCategory,
  });

  // 드롭다운 상태
  const [isClicked, setIsClicked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!selectedData.categoryId && selectedData.categoryName) {
      const categoryId = allCategoryData?.find(
        (data) => data.name === selectedData.categoryName
      );
      setSelectedData((prev: any) => ({ ...prev, categoryId: categoryId?.id }));
    }
  }, [selectedData]);

  // 분야 변경 함수
  const handleCategoryChange = (categoryId: number, categoryName: string) => {
    setSelectedData({
      categoryId,
      categoryName,
      subCategories: [],
    });
    setCateError(false);
  };

  // 세부항목 선택 함수
  const handleSubcategories = (subCategoryId: number, tagId: number) => {
    setSelectedData((prev) => {
      // 현재 subCategoryId가 기존 데이터에 있는지 확인
      const existingSubCategory = prev.subCategories.find(
        (sub) => sub.subCategoryId === subCategoryId
      );

      if (existingSubCategory) {
        // tagIds 배열을 복사하여 새로운 값 추가/제거 (불변성 유지)
        const updatedTagIds = existingSubCategory.tagIds.includes(tagId)
          ? existingSubCategory.tagIds.filter((id) => id !== tagId) // 이미 있으면 제거
          : [...existingSubCategory.tagIds, tagId]; // 없으면 추가

        // 기존 subCategories 배열에서 해당 subCategory만 업데이트
        const updatedSubCategories = prev.subCategories.map((sub) =>
          sub.subCategoryId === subCategoryId
            ? { ...sub, tagIds: updatedTagIds }
            : sub
        );

        return { ...prev, subCategories: updatedSubCategories };
      } else {
        // subCategoryId가 없으면 새롭게 추가
        return {
          ...prev,
          subCategories: [
            ...prev.subCategories,
            { subCategoryId, tagIds: [tagId] },
          ],
        };
      }
    });
    setSubCateError(false);
  };

  if (categoryDataLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="w-[40px] h-[40px] border-[4px] border-t-transparent border-main-green01 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* 분야 */}
      <div>
        <p className="w-full font-bold">분야</p>
        {cateError && (
          <p className="text-[13px] text-header-red-hover">
            분야를 필수로 선택해주세요
          </p>
        )}

        {/* 분야 선택창 */}
        <div
          className={`flex flex-col gap-[10px]
          w-full border-[1px] ${
            cateError ? "border-header-red-hover" : "border-gray01"
          } rounded-[2px] px-[10px] py-[5px]
          text-center ${
            selectedData.categoryName ? "text-logo-green" : "text-gray01"
          }
          text-[14px] font-bold cursor-pointer`}
          onClick={() =>
            setIsClicked((prev) => ({ ...prev, category: !prev.category }))
          }
        >
          <div className="flex justify-between">
            <p>{selectedData.categoryName || "분야를 선택해주세요."}</p>
            <img src={isClicked.category ? triangleUp : triangleDown} />
          </div>

          {/* 클릭 시 드롭다운 항목 */}
          {isClicked.category && (
            <div className="flex flex-col w-full gap-[10px]">
              <hr className="border-gray01" />

              {allCategoryData?.map((data) => (
                <div
                  key={data.id}
                  className="hover:text-logo-green hover:bg-main-green02"
                  onClick={() => handleCategoryChange(data.id, data.name)}
                >
                  {data.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 세부항목 */}
      {selectedData.categoryId && (
        <div className="flex flex-col gap-[5px]">
          <p className="w-full font-bold">세부항목</p>
          {subCateError && (
            <p className="text-header-red-hover text-[13px]">
              세부항목을 1개 이상 선택해주세요
            </p>
          )}

          {allCategoryData
            ?.find((category) => category.id === selectedData.categoryId)
            ?.subcategories.map((subcate) => (
              <div key={subcate.id}>
                {/* 세부항목 선택창 */}
                <div
                  className={`flex flex-col gap-[10px] w-full border-[1px] ${
                    subCateError ? "border-header-red" : "border-gray01"
                  } rounded-[2px] px-[10px] py-[5px] text-center text-gray01 text-[14px] font-bold`}
                >
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() =>
                      setIsClicked((prev) => ({
                        ...prev,
                        [subcate.id]: !prev[subcate.id],
                      }))
                    }
                  >
                    <div>{subcate.name}</div>
                    <img
                      src={isClicked[subcate.id] ? triangleUp : triangleDown}
                    />
                  </div>

                  {isClicked[subcate.id] && (
                    <div className="flex flex-col overflow-y-auto h-[150px] scrollbar">
                      <div className="flex flex-col gap-[10px]">
                        <hr />
                        {subcate.tags.map((tag) => (
                          <div
                            key={tag.id}
                            className={`hover:text-logo-green hover:bg-main-green02 cursor-pointer ${
                              selectedData.subCategories.some(
                                (sub) =>
                                  sub.subCategoryId === subcate.id &&
                                  sub.tagIds.includes(tag.id)
                              )
                                ? "text-logo-green"
                                : ""
                            }`}
                            onClick={() =>
                              handleSubcategories(subcate.id, tag.id)
                            }
                          >
                            {tag.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 선택된 세부항목 표시 */}
                {selectedData.subCategories
                  .find((sub) => sub.subCategoryId === subcate.id)
                  ?.tagIds.map((tagId) => {
                    const tagName = subcate.tags.find(
                      (tag) => tag.id === tagId
                    )?.name;
                    return tagName ? (
                      <div
                        key={tagId}
                        className="flex justify-between text-logo-green text-[14px] py-[5px] px-[10px] font-bold"
                      >
                        <div>{tagName}</div>
                        <img
                          src={cancelButton}
                          onClick={() => handleSubcategories(subcate.id, tagId)}
                          className="cursor-pointer"
                        />
                      </div>
                    ) : null;
                  })}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
