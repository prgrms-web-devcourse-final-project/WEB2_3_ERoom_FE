import { useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";
import triangleUp from "../../assets/button/triangle/triangleUp.svg";
import triangleDown from "../../assets/button/triangle/triangleDown.svg";

interface CategoryType {
  name: string;
  subcategories?: { subname: string; data: string[] }[];
}

interface SelectCategoryProps {
  selectedData: {
    cate: string;
    subcate1: string[];
    subcate2: string[];
  };
  setSelectedData: React.Dispatch<
    React.SetStateAction<{
      cate: string;
      subcate1: string[];
      subcate2: string[];
    }>
  >;
  categoryData: CategoryType[];
}

const SelectCategory = ({
  selectedData,
  setSelectedData,
  categoryData,
}: SelectCategoryProps) => {
  const [isClicked, setIsClicked] = useState({
    cate: false,
    subcategories: [false, false],
  });

  // 토글 클릭 상태 함수
  const toggleSubcategory = (index: number) => {
    setIsClicked((prev) => {
      const updatedSubcategories = [...prev.subcategories];
      updatedSubcategories[index] = !updatedSubcategories[index];
      return { ...prev, subcategories: updatedSubcategories };
    });
  };

  // 분야 변경 시 선택 초기화
  const handleCategoryChange = (category: string) => {
    setSelectedData({
      cate: category,
      subcate1: [],
      subcate2: [],
    });
  };

  // 선택된 항목 상태 함수
  const handleSelectedCategories = (item: string, index: number) => {
    setSelectedData((prev) => {
      const key = index === 0 ? "subcate1" : "subcate2";
      const currentSubcategories = prev[key];

      // 선택된 항목 삭제
      if (currentSubcategories.includes(item)) {
        return {
          ...prev,
          [key]: currentSubcategories.filter((sub) => sub !== item),
        };
      }
      // 선택되지 않은 항목 추가
      return {
        ...prev,
        [key]: [...currentSubcategories, item],
      };
    });
  };

  // console.log(categoryData);

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* 분야 */}
      <div>
        <p className="w-full font-bold">분야</p>

        {/* 분야 선택창 */}
        <div
          className={`flex flex-col gap-[10px]
          w-full border-[1px] border-gray01 rounded-[2px] px-[10px] py-[5px]
          text-center ${
            selectedData.cate ? "text-logo-green" : "text-gray01"
          } text-[14px] font-bold cursor-pointer`}
          onClick={() =>
            setIsClicked((prev) => ({ ...prev, cate: !prev.cate }))
          }
        >
          <div className="flex justify-between">
            <p>
              {selectedData.cate ? selectedData.cate : "분야를 선택해주세요."}
            </p>
            <img src={isClicked.cate ? triangleUp : triangleDown} />
          </div>

          {/* 클릭 시 드롭다운 항목 */}
          {isClicked.cate && (
            <div className="flex flex-col w-full gap-[10px]">
              {/* 구분선 */}
              <hr className="border-gray01" />

              {/* 분야 항목 */}
              {categoryData.map((data) => (
                <div
                  key={data.name}
                  className="hover:text-logo-green hover:bg-main-green02"
                  onClick={() => handleCategoryChange(data.name)}
                >
                  {data.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 세부항목 */}
      <div className="flex flex-col gap-[5px]">
        {selectedData.cate && <p className="w-full font-bold">세부항목</p>}

        {categoryData
          .filter((data) => data.name === selectedData.cate)
          .map((data) =>
            data.subcategories?.map((subcate, index) => {
              const subcategoryKey = subcate.subname;
              const items = subcate.data;

              if (!items) return null;

              return (
                <div key={index}>
                  {/* 세부항목 선택창 */}
                  <div
                    key={index}
                    className="flex flex-col gap-[10px] w-full border-[1px] border-gray01 rounded-[2px] px-[10px] py-[5px] text-center 
            text-gray01 text-[14px] font-bold"
                  >
                    <div className="flex justify-between">
                      <div>{subcategoryKey}</div>
                      <img
                        src={
                          isClicked.subcategories[index]
                            ? triangleUp
                            : triangleDown
                        }
                        className="cursor-pointer"
                        onClick={() => toggleSubcategory(index)}
                      />
                    </div>

                    {/* 클릭 시 드롭다운 목록 */}
                    {isClicked.subcategories[index] && (
                      <div className="flex flex-col overflow-y-auto h-[150px] scrollbar">
                        <div className="flex flex-col gap-[10px]">
                          <hr />
                          {items.map((item, idx) => (
                            <div
                              key={idx}
                              className="hover:text-logo-green hover:bg-main-green02"
                              onClick={() =>
                                handleSelectedCategories(item, index)
                              }
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 선택항목 표시 */}
                  {index === 0 &&
                    selectedData.subcate1.map((item) => (
                      <div
                        className="flex justify-between text-logo-green text-[14px]
                py-[5px] px-[10px] font-bold"
                      >
                        <div key={item}>{item}</div>
                        <img
                          src={cancelButton}
                          onClick={() => handleSelectedCategories(item, index)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                  {index === 1 &&
                    selectedData.subcate2.map((item) => (
                      <div
                        className="flex justify-between text-logo-green text-[14px]
                py-[5px] px-[10px] font-bold"
                      >
                        <div key={item}>{item}</div>
                        <img
                          src={cancelButton}
                          onClick={() => handleSelectedCategories(item, index)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              );
            })
          )}
      </div>
    </div>
  );
};

export default SelectCategory;
