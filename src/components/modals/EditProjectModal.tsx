import { dummy } from "../../dummyData/dummy";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectCategory from "../EditProjectModal/SelectCategory";
import SelectMember from "../EditProjectModal/SelectMember";
import WordCloud from "../EditProjectModal/WordCloud";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import { useEffect, useState } from "react";

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
    dummy.categoryData
      .filter((data) => data.name === selectedData?.cate)[0]
      .subcategories?.map((cate) => cate.subname);

  // 선택된 분야의 데이터
  const selectedCateData = selectedData?.cate
    ? dummy.categoryData.filter((data) => data.name === selectedData?.cate)[0]
        .subcategories
    : null;

  console.log(selectedProjectData?.startDate);

  return (
    <div
      className="w-[700px] min-h-[600px] h-fit bg-white text-main-green
      flex justify-center items-center z-10"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 프로젝트 생성/편집 */}
      <div
        className="
        w-[350px] mix-h-[600PX] h-fit flex flex-col justify-between items-center
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
              categoryData={dummy.categoryData}
            />
          </div>
        )}

        {/* 두 번째 페이지 */}
        {pages === 1 && (
          <div className="w-full flex flex-col gap-[20px]">
            {/* 팀원 검색 */}
            <SelectMember
              data={dummy.membersData}
              selectedData={projectMember}
            />

            {/* 기간 설정 */}
            <div className="flex flex-col gap-[5px]">
              <p className="w-full font-bold">일정</p>

              {/* 기간 시작 및 종료 */}
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
