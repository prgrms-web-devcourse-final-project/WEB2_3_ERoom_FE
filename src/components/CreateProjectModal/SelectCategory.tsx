import { useState } from "react";
import cancelButton from "../../assets/button/cancelButton.svg";
import triangleUp from "../../assets/button/triangle/triangleUp.svg";
import triangleDown from "../../assets/button/triangle/triangleDown.svg";

// (임시) 카테고리 데이터
const categoryData = [
  {
    name: "개발",
    subcategories: [
      {
        사용언어: [
          "C",
          "C++",
          "C#",
          "Java",
          "JavaScript",
          "TypeScript",
          "Python",
          "Go",
          "PHP",
          "Swift",
          "Kotlin",
          "기타",
        ],
      },
      {
        "프레임워크/라이브러리": [
          "Spring",
          "React",
          "Vue.js",
          "Svelte",
          "Angular",
          "Flutter",
          "Next.js",
          "Nuxt.js",
          "Unity",
          "Unreal",
          "Django",
          "Flask",
          "Bootstrap",
          "Tailwind CSS",
        ],
      },
    ],
  },
  { name: "교육" },
  { name: "금융" },
  { name: "디자인" },
  { name: "제조" },
  { name: "기타" },
];
// 여기까지 임시 데이터

const SelectCategory = () => {
  const [isClicked, setIsClicked] = useState({
    cate: false,
    subcategories: [false, false],
  });
  const [selectedData, setSelectedData] = useState({
    cate: "",
    subcate1: [] as string[],
    subcate2: [] as string[],
  });

  // 분야 변경 시 선택 초기화
  const handleCategoryChange = (category: string) => {
    setSelectedData({
      cate: category,
      subcate1: [],
      subcate2: [],
    });
  };

  // 토글 클릭 상태 함수
  const toggleSubcategory = (index: number) => {
    setIsClicked((prev) => {
      const updatedSubcategories = [...prev.subcategories];
      updatedSubcategories[index] = !updatedSubcategories[index];
      return { ...prev, subcategories: updatedSubcategories };
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

  console.log(selectedData);

  return (
    <div className="w-full flex flex-col gap-[5px]">
      {/* 분야 */}
      <p className="w-full font-bold">분야</p>

      {/* 분야 선택창 */}
      <div
        className={`flex flex-col gap-[10px]
        w-full border-[1px] border-gray01 rounded-[2px] px-[10px] py-[5px]
        text-center ${
          selectedData.cate ? "text-logo-green" : "text-gray01"
        } text-[14px] font-bold cursor-pointer`}
        onClick={() => setIsClicked((prev) => ({ ...prev, cate: !prev.cate }))}
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

      {selectedData.cate && <p className="w-full font-bold">세부항목</p>}
      {/* 세부항목 */}

      {categoryData
        .filter((data) => data.name === selectedData.cate)
        .map((data) =>
          data.subcategories?.map((subcate, index) => {
            const subcategoryKey = Object.keys(
              subcate
            )[0] as keyof typeof subcate;
            const items = subcate[subcategoryKey];
            if (!items) return null;
            return (
              <div>
                {/* 세부항목 선택창 */}
                <div
                  key={index}
                  className="flex flex-col gap-[10px] w-full border-[1px] border-gray01 rounded-[2px] px-[10px] py-[5px] text-center 
                  text-gray01 text-[14px] font-bold cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div>{subcategoryKey}</div>
                    <img
                      src={
                        isClicked.subcategories[index]
                          ? triangleUp
                          : triangleDown
                      }
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
  );
};

export default SelectCategory;
