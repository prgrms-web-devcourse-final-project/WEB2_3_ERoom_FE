import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectCategory from "../EditProjectModal/SelectCategory";
import SelectMember from "../EditProjectModal/SelectMember";
import WordCloud from "../EditProjectModal/WordCloud";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import { useEffect, useState } from "react";

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
          { text: "C", value: 10 },
          { text: "C++", value: 20 },
          { text: "C#", value: 30 },
          { text: "Java", value: 40 },
          { text: "JavaScript", value: 50 },
          { text: "TypeScript", value: 60 },
          { text: "Python", value: 70 },
          { text: "Go", value: 80 },
          { text: "PHP", value: 90 },
          { text: "Swift", value: 100 },
          { text: "Kotlin", value: 110 },
          { text: "기타", value: 120 },
        ],
      },
      {
        subname: "프레임워크/라이브러리",
        data: [
          { text: "Spring", value: 10 },
          { text: "React", value: 20 },
          { text: "Vue.js", value: 30 },
          { text: "Svelte", value: 40 },
          { text: "Angular", value: 50 },
          { text: "Flutter", value: 60 },
          { text: "Next.js", value: 70 },
          { text: "Nuxt.js", value: 80 },
          { text: "Unity", value: 90 },
          { text: "Unreal", value: 100 },
          { text: "Django", value: 110 },
          { text: "Flask", value: 120 },
          { text: "Bootstrap", value: 130 },
          { text: "Tailwind CSS", value: 140 },
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
// 여기까지 임시 데이터

interface EditProjectModalProps {
  selectedProjectData?: selectedProjectData;
  setSelectedProjectData?: React.Dispatch<
    React.SetStateAction<selectedProjectData>
  >;
  setIsEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectMember?: MembersType[];
  title: string;
}

interface selectedProjectData {
  projectName: string;
  projectStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  cate: string;
  subcate1: string[];
  subcate2: string[];
}

interface MembersType {
  id: number;
  userName: string;
  email: string;
  password: string;
  grade: string;
  organization: string;
  profileImage: string;
  delete: string;
}

const EditProjectModal = ({
  selectedProjectData,
  setIsEditProjectModal,
  projectMember,
  title,
}: EditProjectModalProps) => {
  // 프로젝트 시작 정보 초기화 상태
  const [startDateInfo, setStartDateInfo] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    ampm: "",
  });

  // 프로젝트 종료 정보 초기화 상태
  const [endDateInfo, setEndDateInfo] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
    ampm: "",
  });

  useEffect(() => {
    if (selectedProjectData) {
      const startDate = new Date(selectedProjectData.startDate);

      const year = String(startDate.getFullYear());
      const month = String(startDate.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
      const day = String(startDate.getDate()).padStart(2, "0"); // 일
      const hour = String(startDate.getHours() % 12 || 12).padStart(2, "0"); // 12시간 형식
      const minute = String(startDate.getMinutes()).padStart(2, "0"); // 분
      const ampm = startDate.getHours() >= 12 ? "PM" : "AM"; // AM/PM 구분

      setStartDateInfo({ year, month, day, hour, minute, ampm });
    }
  }, [selectedProjectData]);

  useEffect(() => {
    if (selectedProjectData) {
      const endDate = new Date(selectedProjectData.endDate);

      const year = String(endDate.getFullYear());
      const month = String(endDate.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 +1 필요)
      const day = String(endDate.getDate()).padStart(2, "0"); // 일
      const hour = String(endDate.getHours() % 12 || 12).padStart(2, "0"); // 12시간 형식
      const minute = String(endDate.getMinutes()).padStart(2, "0"); // 분
      const ampm = endDate.getHours() >= 12 ? "PM" : "AM"; // AM/PM 구분

      setEndDateInfo({ year, month, day, hour, minute, ampm });
    }
  }, [selectedProjectData]);

  // 선택된 분야, 세부항목 상태
  const [selectedData, setSelectedData] = useState({
    cate: selectedProjectData?.cate || "",
    subcate1: selectedProjectData?.subcate1 || [],
    subcate2: selectedProjectData?.subcate2 || [],
  });

  // 프로젝트 생성 페이지 상태
  const [pages, setPages] = useState<number>(0);

  // 선택된 분야의 세부항목 이름
  const selectedSubCate =
    selectedData?.cate &&
    categoryData
      .filter((data) => data.name === selectedData?.cate)[0]
      .subcategories?.map((cate) => cate.subname);

  // 선택된 분야의 데이터
  const selectedCateData = selectedData?.cate
    ? categoryData.filter((data) => data.name === selectedData?.cate)[0]
        .subcategories
    : null;

  console.log(selectedProjectData?.startDate);

  return (
    <div
      className="w-[700px] min-h-[600px] max-h-full bg-white text-main-green
      flex justify-center items-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 프로젝트 생성/편집 */}
      <div
        className="
        w-[350px] h-[600px] flex flex-col justify-between items-center
        gap-[20px] px-[50px] py-[30px]"
      >
        {/* 제목 */}
        <p className="w-full text-center text-[18px] font-bold">
          {pages === 0 ? `${title} (1/2)` : `${title} (2/2)`}
        </p>

        {/* 첫 번째 페이지 */}
        {pages === 0 && (
          <div className="w-full flex flex-col gap-[20px]">
            {/* 프로젝트명 작성 */}
            <WriteProjectName name={selectedProjectData?.projectName} />

            {/* 분야 검색 */}
            <SelectCategory
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              categoryData={categoryData}
            />
          </div>
        )}

        {/* 두 번째 페이지 */}
        {pages === 1 && (
          <div className="w-full flex flex-col gap-[20px]">
            {/* 팀원 검색 */}
            <SelectMember data={membersData} selectedData={projectMember} />

            {/* 기간 설정 */}
            <div className="flex flex-col gap-[5px]">
              <p className="w-full font-bold">일정</p>

              {/* 기간 */}
              <div className="flex flex-col gap-[10px]">
                <div className="z-10">
                  {/* 시작일 */}
                  <DateTimeSelect
                    title="시작"
                    selectedDate={startDateInfo}
                    setSelectedDate={setStartDateInfo}
                  />
                </div>
                <div>
                  {/* 종료일 */}
                  <DateTimeSelect
                    title="종료"
                    selectedDate={endDateInfo}
                    setSelectedDate={setEndDateInfo}
                  />
                </div>
              </div>
            </div>
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
            onClick={() => setIsEditProjectModal(false)}
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
                words={selectedCateData[0].data.map((contents) => ({
                  text: contents.text,
                  value: contents.value,
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
                words={selectedCateData[1].data.map((contents) => ({
                  text: contents.text,
                  value: contents.value,
                }))}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProjectModal;
