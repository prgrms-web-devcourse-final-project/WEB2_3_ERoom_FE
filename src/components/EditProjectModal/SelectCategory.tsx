import { useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";
import triangleUp from "../../assets/button/triangle/triangleUp.svg";
import triangleDown from "../../assets/button/triangle/triangleDown.svg";
import { dummy } from "../../dummyData/dummy";

const SelectCategory = ({
  selectedData,
  setSelectedData,
}: SelectCategoryProps) => {
  // 각 항목 클릭 상태
  const [isClicked, setIsClicked] = useState({
    category: false,
    subCategories1: false,
    subCategories2: false,
  });

  console.log(selectedData);

  // 토글 클릭 상태 함수
  const toggleSubcategory = (index: number) => {
    setIsClicked((prev) => {
      // 토글할 키값 결정
      const key =
        index === 1 ? "subCategories1" : index === 2 ? "subCategories2" : null;

      // key가 존재하면 해당 값만 변경
      if (key) {
        return { ...prev, [key]: !prev[key] };
      }

      return prev;
    });
  };

  // 분야 변경 함수
  const handleCategoryChange = (category: string) => {
    setSelectedData(() => ({
      category: category,
      subCategories1: [],
      subCategories2: [],
    }));
  };

  // 선택된 항목 상태 함수
  const handleSubcategories = (item: string, index: number) => {
    setSelectedData((prev: CategoryType) => {
      if (index === 1) {
        const currentSubcategories = prev.subCategories1?.data || [];

        // 선택된 항목 삭제
        if (currentSubcategories.some((data) => data === item)) {
          return {
            ...prev,
            subCategories1: {
              ...prev.subCategories1,
              data: currentSubcategories.filter((sub) => sub !== item),
            },
          };
        }

        // 선택되지 않은 항목 추가
        return {
          ...prev,
          subCategories1: {
            ...prev.subCategories1,
            data: [...currentSubcategories, item],
          },
        };
      }

      if (index === 2) {
        const currentSubcategories = prev.subCategories2?.data || [];

        if (currentSubcategories.includes(item)) {
          return {
            ...prev,
            subCategories2: {
              ...prev.subCategories2,
              data: currentSubcategories.filter((sub) => sub !== item),
            },
          };
        }

        return {
          ...prev,
          subCategories2: {
            ...prev.subCategories2,
            data: [...currentSubcategories, item],
          },
        };
      }

      return prev;
    });
  };

  // console.log(selectedData);

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
            selectedData.category ? "text-logo-green" : "text-gray01"
          } text-[14px] font-bold cursor-pointer`}
          onClick={() =>
            setIsClicked((prev) => ({ ...prev, category: !prev.category }))
          }
        >
          <div className="flex justify-between">
            <p>
              {selectedData.category
                ? selectedData.category
                : "분야를 선택해주세요."}
            </p>
            <img src={isClicked.category ? triangleUp : triangleDown} />
          </div>

          {/* 클릭 시 드롭다운 항목 */}
          {isClicked.category && (
            <div className="flex flex-col w-full gap-[10px]">
              {/* 구분선 */}
              <hr className="border-gray01" />

              {/* 분야 항목 */}
              {dummy.categoryData.map((data) => (
                <div
                  key={data.category}
                  className="hover:text-logo-green hover:bg-main-green02"
                  onClick={() => {
                    handleCategoryChange(data.category);
                    console.log(data.category);
                  }}
                >
                  {data.category}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 세부항목 */}
      <div className="flex flex-col gap-[5px]">
        {selectedData.category && <p className="w-full font-bold">세부항목</p>}
        {selectedData.category &&
          Object.values(
            dummy.categoryData.filter(
              (data) => data.category === selectedData.category
            )[0]
          )
            .slice(1, 3)
            .map((subcate, index) => {
              const subcategoryKey = subcate.name;
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
                    <div
                      className="flex justify-between"
                      onClick={() => toggleSubcategory(index + 1)}
                    >
                      {/* 세부항목명 */}
                      <div>{subcategoryKey}</div>

                      {/* 토글 버튼 */}
                      <img
                        src={
                          Object.values(isClicked)[index + 1]
                            ? triangleUp
                            : triangleDown
                        }
                        className="cursor-pointer"
                      />
                    </div>
                    {/* 클릭 시 드롭다운 목록 */}
                    {Object.values(isClicked)[index + 1] && (
                      <div className="flex flex-col overflow-y-auto h-[150px] scrollbar">
                        <div className="flex flex-col gap-[10px]">
                          {/* 구분선 */}
                          <hr />

                          {/* 상세항목 목록 */}
                          {items.map(
                            (
                              item: { name: string; value: number },
                              idx: number
                            ) => (
                              <div
                                key={idx}
                                className="hover:text-logo-green hover:bg-main-green02"
                                onClick={() =>
                                  handleSubcategories(item.name, index + 1)
                                }
                              >
                                {item.name}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 첫 번째 선택항목 표시 */}
                  {index === 0 &&
                    (selectedData.subCategories1?.data || []).map((item) => (
                      <div
                        key={item}
                        className="flex justify-between text-logo-green text-[14px]
                                py-[5px] px-[10px] font-bold"
                      >
                        {/* 선택항목명 */}
                        <div key={item}>{item}</div>

                        {/* 취소버튼 */}
                        <img
                          src={cancelButton}
                          onClick={() => handleSubcategories(item, index + 1)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}

                  {/* 두 번째 선택항목 표시 */}
                  {index === 1 &&
                    (selectedData.subCategories2?.data || []).map((item) => (
                      <div
                        className="flex justify-between text-logo-green text-[14px]
                                py-[5px] px-[10px] font-bold"
                      >
                        {/* 선택항목명 */}
                        <div key={item}>{item}</div>

                        {/* 취소버튼 */}
                        <img
                          src={cancelButton}
                          onClick={() => handleSubcategories(item, index + 1)}
                          className="cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default SelectCategory;
