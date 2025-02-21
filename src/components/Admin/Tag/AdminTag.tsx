import { useState } from "react";
import AdminButton from "../../common/AdminButton";
import AddButton from "../../../assets/button/add_tag.svg";
import AdminTagList from "./AdminTagList";
import AdminTagAdd from "./AdminTagAdd";

//랜덤id 생성함수
const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// (임시) 카테고리 데이터
const initialCategories = [
  {
    id: generateId(),
    name: "개발",
    value: 10,
    subcategories: [
      {
        id: generateId(),
        subname: "사용언어",
        isEditable: false,
        value: 10,
        data: [
          { id: generateId(), text: "C", value: 10 },
          { id: generateId(), text: "C++", value: 20 },
          { id: generateId(), text: "C#", value: 30 },
          { id: generateId(), text: "Java", value: 40 },
          {
            id: generateId(),
            text: "JavaScript",
            value: 50,
          },
          {
            id: generateId(),
            text: "TypeScript",
            value: 60,
            isEditable: false,
          },
          { id: generateId(), text: "Python", value: 70, isEditable: false },
          { id: generateId(), text: "Go", value: 80, isEditable: false },
          { id: generateId(), text: "PHP", value: 90, isEditable: false },
          { id: generateId(), text: "Swift", value: 100, isEditable: false },
          { id: generateId(), text: "Kotlin", value: 110, isEditable: false },
          { id: generateId(), text: "기타", value: 120, isEditable: false },
        ],
      },
      {
        id: generateId(),
        subname: "프레임워크/라이브러리",
        isEditable: false,
        value: 10,
        data: [
          { id: generateId(), text: "Spring", value: 10, isEditable: false },
          { id: generateId(), text: "React", value: 20, isEditable: false },
          { id: generateId(), text: "Vue.js", value: 30, isEditable: false },
          { id: generateId(), text: "Svelte", value: 40, isEditable: false },
          { id: generateId(), text: "Angular", value: 50, isEditable: false },
          { id: generateId(), text: "Flutter", value: 60, isEditable: false },
          { id: generateId(), text: "Next.js", value: 70, isEditable: false },
          { id: generateId(), text: "Nuxt.js", value: 80, isEditable: false },
          { id: generateId(), text: "Unity", value: 90, isEditable: false },
          { id: generateId(), text: "Unreal", value: 100, isEditable: false },
          { id: generateId(), text: "Django", value: 110, isEditable: false },
          { id: generateId(), text: "Flask", value: 120, isEditable: false },
          {
            id: generateId(),
            text: "Bootstrap",
            value: 130,
            isEditable: false,
          },
          {
            id: generateId(),
            text: "Tailwind CSS",
            value: 140,
            isEditable: false,
          },
        ],
      },
    ],
  },
  {
    id: generateId(),
    name: "교육",
    isEditable: false,
    value: 10,
    subcategories: [
      {
        id: generateId(),
        subname: "사용언어",
        isEditable: false,
        value: 10,
        data: [
          { id: generateId(), text: "C", value: 10, isEditable: false },
          { id: generateId(), text: "C++", value: 20, isEditable: false },
          { id: generateId(), text: "C#", value: 30, isEditable: false },
          { id: generateId(), text: "Java", value: 40, isEditable: false },
          {
            id: generateId(),
            text: "JavaScript",
            value: 50,
            isEditable: false,
          },
          {
            id: generateId(),
            text: "TypeScript",
            value: 60,
            isEditable: false,
          },
          { id: generateId(), text: "Python", value: 70, isEditable: false },
          { id: generateId(), text: "Go", value: 80, isEditable: false },
          { id: generateId(), text: "PHP", value: 90, isEditable: false },
          { id: generateId(), text: "Swift", value: 100, isEditable: false },
          { id: generateId(), text: "Kotlin", value: 110, isEditable: false },
          { id: generateId(), text: "기타", value: 120, isEditable: false },
        ],
      },
      {
        id: generateId(),
        subname: "프레임워크/라이브러리",
        isEditable: false,
        value: 10,
        data: [
          { id: generateId(), text: "Spring", value: 10, isEditable: false },
          { id: generateId(), text: "React", value: 20, isEditable: false },
          { id: generateId(), text: "Vue.js", value: 30, isEditable: false },
          { id: generateId(), text: "Svelte", value: 40, isEditable: false },
          { id: generateId(), text: "Angular", value: 50, isEditable: false },
          { id: generateId(), text: "Flutter", value: 60, isEditable: false },
          { id: generateId(), text: "Next.js", value: 70, isEditable: false },
          { id: generateId(), text: "Nuxt.js", value: 80, isEditable: false },
          { id: generateId(), text: "Unity", value: 90, isEditable: false },
          { id: generateId(), text: "Unreal", value: 100, isEditable: false },
          { id: generateId(), text: "Django", value: 110, isEditable: false },
          { id: generateId(), text: "Flask", value: 120, isEditable: false },
          {
            id: generateId(),
            text: "Bootstrap",
            value: 130,
            isEditable: false,
          },
          {
            id: generateId(),
            text: "Tailwind CSS",
            value: 140,
            isEditable: false,
          },
        ],
      },
    ],
  },
];

const AdminTag = () => {
  const [isTagList, setIsTagList] = useState("tagList");

  const handleButtonClick = (type: "tagList" | "tagData") => {
    setIsTagList(type);
  };

  const [categories, setCategories] = useState(initialCategories);
  const [subcategories, setSubcategories] = useState(
    initialCategories[0].subcategories
  );
  const [details, setDetails] = useState(
    initialCategories[0].subcategories[0].data
  );

  const [addCategories, setAddCategories] = useState<
    | {
        id: string;
        name: string;
        value: number;
        subcategories: never[];
        isEditable: boolean;
      }[]
    | null
  >(null);

  //  분야 추가
  const handleAddCategory = () => {
    setAddCategories([
      {
        id: generateId(),
        name: "",
        value: 10,
        subcategories: [],
        isEditable: true,
      },
    ]);
  };

  //  분야 수정
  const handleCategoryChange = (id: string, newName: string) => {
    setCategories(
      categories.map((category) =>
        category.id === id ? { ...category, name: newName } : category
      )
    );
  };

  // 세부항목 추가
  const handleAddSubcategory = () => {
    setSubcategories([
      ...subcategories,
      { id: generateId(), subname: "", value: 10, data: [], isEditable: true },
    ]);
  };

  // 세부항목 수정
  const handleSubcategoryChange = (id: string, newName: string) => {
    setSubcategories(
      subcategories.map((sub) =>
        sub.id === id ? { ...sub, subname: newName } : sub
      )
    );
  };

  // 상세항목 추가
  const handleAddDetail = () => {
    setDetails([
      ...details,
      { id: generateId(), text: "", value: 10, isEditable: true },
    ]);
  };

  // 상세항목 수정
  const handleDetailChange = (id: string, newText: string) => {
    setDetails(
      details.map((detail) =>
        detail.id === id ? { ...detail, text: newText } : detail
      )
    );
  };

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
              <button onClick={handleAddCategory}>
                <img src={AddButton} alt="분야 생성 버튼" />
              </button>
            </div>
            <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green border-b border-b-main-green">
              <div className="flex justify-center">
                <span>No.</span>
              </div>
              <div className="flex justify-center">
                <span>분야</span>
              </div>
              <div className="flex justify-center">
                <span>수정</span>
              </div>
              <div className="flex justify-center">
                <span>삭제</span>
              </div>
            </div>
            <div className="h-[400px] overflow-y-scroll scrollbar-none">
              {categories.map((category, index) => (
                <AdminTagList
                  key={category.id}
                  index={index}
                  id={category.id}
                  name={category.name}
                  onChange={handleCategoryChange}
                />
              ))}
              {addCategories?.map((category, index) => (
                <AdminTagAdd
                  key={category.id}
                  index={index + categories.length}
                  id={category.id}
                  name={category.name}
                  onChange={handleCategoryChange}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-[10px]">
            <span className="font-bold text-[16px] text-main-green">
              세부항목
            </span>
            <div className="flex w-full justify-end">
              <button onClick={handleAddSubcategory}>
                <img src={AddButton} alt="세부항목 생성 버튼" />
              </button>
            </div>
            <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green border-b border-b-main-green">
              <div className="flex justify-center">
                <span>No.</span>
              </div>
              <div className="flex justify-center">
                <span>세부항목</span>
              </div>
              <div className="flex justify-center">
                <span>수정</span>
              </div>
              <div className="flex justify-center">
                <span>삭제</span>
              </div>
            </div>
            <div className="h-[400px] overflow-y-scroll scrollbar-none">
              {subcategories.map((subcategory, index) => (
                <AdminTagList
                  key={subcategory.id}
                  index={index}
                  id={subcategory.id}
                  name={subcategory.subname}
                  onChange={handleSubcategoryChange}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full gap-[10px]">
            <span className="font-bold text-[16px] text-main-green">
              상세항목
            </span>
            <div className="flex w-full justify-end">
              <button onClick={handleAddDetail}>
                <img src={AddButton} alt="상세항목 생성 버튼" />
              </button>
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
              {details.map((detail, index) => (
                <AdminTagList
                  key={detail.id}
                  index={index}
                  id={detail.id}
                  name={detail.text}
                  onChange={handleDetailChange}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTag;
