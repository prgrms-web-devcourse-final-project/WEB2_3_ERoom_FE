import Button from "../common/Button";
import SelectCategory from "../EditProjectModal/SelectCategory";
import SelectMember from "../EditProjectModal/SelectMember";
import WordCloud from "../EditProjectModal/WordCloud";
import WriteProjectName from "../EditProjectModal/WriteProjectName";

import { useState } from "react";

interface CreateProjectModalProps {
  setIsCreateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// (임시) 프로젝트 배열
const projectData = [
  {
    name: "최종프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
  {
    name: "토이프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
  {
    name: "사이드프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
  { name: "1차프로젝트", startDate: "2025-02-03", endDate: "2025-03-12" },
  { name: "2차프로젝트", startDate: "2025-02-03", endDate: "2025-03-12" },
  { name: "3차프로젝트", startDate: "2025-02-03", endDate: "2025-03-12" },
  {
    name: "파이널프로젝트",
    startDate: "2025-02-03",
    endDate: "2025-03-12",
  },
];

// (임시) 카테고리 데이터
const categoryData = [
  {
    name: "개발",
    subcategories: [
      {
        subname: "사용언어",
        data: [
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
        subname: "프레임워크/라이브러리",
        data: [
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

// (임시) 팀원 배열
const membersData = [
  {
    id: 1,
    userName: "홍길동",
    email: "a@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스1",
    profileImage:
      "https://cdn.pixabay.com/photo/2018/01/15/09/17/woman-3083516_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 2,
    userName: "홍서범",
    email: "b@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스2",
    profileImage:
      "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
    delete: "ACTIVE",
  },
  {
    id: 3,
    userName: "홍홍홍",
    email: "c@gmail.com",
    password: "1234",
    grade: "DISABLE",
    organization: "데브코스3",
    profileImage:
      "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
    delete: "ACTIVE",
  },
];

// (임시) 워드클라우드 데이터
const words = [
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
];
// 여기까지 임시 데이터

interface SelectedDataType {
  cate: string;
  subcate1: string[];
  subcate2: string[];
}

interface SelectedSubCateDataType {
  subname: string;
  data: string[];
}

const CreateProjectModal = ({
  setIsCreateProjectModal,
}: CreateProjectModalProps) => {
  // 선택된 분야, 세부항목 상태
  const [selectedData, setSelectedData] = useState({
    cate: "",
    subcate1: [] as string[],
    subcate2: [] as string[],
  });

  // 선택된 세부항목 데이터 상태
  const [selectedSubCateData, setSelectedSubCateData] = useState<
    SelectedSubCateDataType[]
  >([]);

  // 프로젝트 생성 페이지 상태
  const [pages, setPages] = useState<number>(0);

  // 선택된 분야의 세부항목 이름
  const selectedSubCate =
    selectedData.cate &&
    categoryData
      .filter((data) => data.name === selectedData.cate)[0]
      .subcategories?.map((cate) => cate.subname);

  // 선택된 분야의 데이터
  const selectedCateData = selectedData.cate
    ? categoryData.filter((data) => data.name === selectedData.cate)[0]
        .subcategories
    : null;

  console.log(selectedCateData);

  return (
    <div
      className="w-[700px] h-[600px] max-h-full bg-white text-main-green
      flex justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 프로젝트 생성 */}
      <div
        className="
        w-[350px] h-full flex flex-col justify-between items-center
        gap-[20px] px-[50px] py-[30px]"
      >
        {/* 제목 */}
        <p className="w-full text-center text-[18px] font-bold">
          {pages === 0 ? "프로젝트 생성 (1/2)" : "프로젝트 생성 (2/2)"}
        </p>

        {pages === 0 && (
          <div className="w-full flex flex-col gap-[20px]">
            {/* 프로젝트명 작성 */}
            <WriteProjectName />

            {/* 분야 검색 */}
            <SelectCategory
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              categoryData={categoryData}
            />
          </div>
        )}
        {pages === 1 && (
          <div className="w-full flex flex-col gap-[20px]">
            {/* 팀원 검색 */}
            <SelectMember data={membersData} />
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-[10px] w-full">
          <Button
            text={pages === 0 ? "다음" : "이전"}
            size="md"
            css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
            onClick={() => setPages(pages === 0 ? 1 : 0)}
          />
          {pages === 1 && (
            <Button
              text="생성하기"
              size="md"
              css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
              onClick={() => setPages(1)}
            />
          )}
          <Button
            text="취소"
            size="md"
            css="text-main-beige01 w-full text-[14px] bg-[#2B3E34] border-none"
            onClick={() => setIsCreateProjectModal(false)}
          />
        </div>
      </div>

      {/* 워드 클라우드 */}
      {pages === 0 && selectedSubCate && (
        <div
          className="w-[350px] h-[600px] py-[20px]
          flex flex-col justify-between items-center"
        >
          {/* 세부항목1 워드클라우드 */}
          <div className="flex flex-col items-center">
            {selectedSubCate && (
              <div className="text-main-green font-bold">
                {selectedSubCate[0]}
              </div>
            )}
            {selectedCateData && (
              <WordCloud
                words={[...selectedCateData[0].data].map((text) => ({
                  text,
                  value: Math.random() * 100,
                }))}
              />
            )}
          </div>

          {/* 세부항목2 워드클라우드 */}
          <div className="flex flex-col items-center">
            {selectedSubCate && (
              <div className="text-main-green font-bold">
                {selectedSubCate[1]}
              </div>
            )}
            {selectedCateData && (
              <WordCloud
                words={[...selectedCateData[1].data].map((text) => ({
                  text,
                  value: Math.random() * 100,
                }))}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProjectModal;
