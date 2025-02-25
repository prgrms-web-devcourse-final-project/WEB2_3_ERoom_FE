import dayjs from "dayjs";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectCategory from "../EditProjectModal/SelectCategory";
import SelectMember from "../EditProjectModal/SelectMember";
// import WordCloud from "../EditProjectModal/WordCloud";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProject } from "../../utils/api/createProject";
import "dayjs/locale/en";
import { randomColor } from "../../utils/randomColor";
import { getProjectDetail } from "../../api/project";

const EditProjectModal = ({
  projectId,
  selectedData,
  setIsEditProjectModal,
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

  // 프로젝트 네임
  const [newProjectNameValue, setNewProjectNameValue] = useState<string>("");

  // 프로젝트 상세 정보 불러오기
  const { data: projectDetailList, isLoading } = useQuery<ProjectDetailType>({
    queryKey: ["ProjectDetail", projectId],
    queryFn: async () => {
      const projectData = await getProjectDetail(Number(projectId!));
      return projectData;
    },
  });

  console.log(projectDetailList, isLoading);

  // 일정시작
  useEffect(() => {
    const startDate = selectedData
      ? dayjs(projectDetailList?.startDate).locale("en")
      : dayjs().locale("en");

    const year = startDate.format("YYYY");
    const month = startDate.format("MM");
    const day = startDate.format("DD");
    const hour = startDate.format("hh"); // 12시간 형식
    const minute = startDate.format("mm");
    const ampm = startDate.format("A"); // AM/PM

    setStartDateInfo({ year, month, day, hour, minute, ampm });
  }, [projectDetailList]);

  // 일정종료
  useEffect(() => {
    const endDate = projectDetailList
      ? dayjs(projectDetailList.endDate).locale("en")
      : dayjs().locale("en");
    console.log(endDate);
    const year = endDate.format("YYYY");
    const month = endDate.format("MM");
    const day = endDate.format("DD");
    const hour = projectDetailList
      ? endDate.format("hh")
      : String(+endDate.format("hh") + 1); // 12시간 형식
    const minute = endDate.format("mm");
    const ampm = endDate.format("A"); // AM/PM
    setEndDateInfo({ year, month, day, hour, minute, ampm });
  }, [projectDetailList]);

  // 선택된 분야, 세부항목 상태
  const [selectedCategory, setSelectedCategory] = useState<temporaryCategory>({
    category: projectDetailList?.category,
    subCategories1: projectDetailList?.subCategories1,
    subCategories2: projectDetailList?.subCategories2,
  });

  // 선택한 팀원 상태
  const [selectedMember, setSelectedMember] = useState(
    projectDetailList?.members
  );

  // 분야 및 팀원 상태 업데이트
  useEffect(() => {
    // 분야
    const categoryData = projectDetailList?.category;
    const subCategories1 = projectDetailList?.subCategories1;
    const subCategories2 = projectDetailList?.subCategories2;
    // 팀원
    const members = projectDetailList?.members;

    setSelectedCategory({
      category: categoryData,
      subCategories1: subCategories1,
      subCategories2: subCategories2,
    });
    setSelectedMember(members);
  }, [projectDetailList]);

  // console.log(selectedCategory);

  // 프로젝트 생성 페이지 상태
  const [pages, setPages] = useState<number>(0);

  // 최종 새프로젝트 정보
  // 시작날짜 포맷
  const startFormattedDate = dayjs(
    `${startDateInfo.year}-${startDateInfo.month}-${startDateInfo.day} ${startDateInfo.hour}:${startDateInfo.minute} ${startDateInfo.ampm}`,
    "YYYY-MM-DD hh:mm A"
  ).format("YYYY-MM-DDTHH:mm:ss");

  // 종료날짜 포맷
  const endFormatDate = dayjs(
    `${endDateInfo.year}-${endDateInfo.month}-${endDateInfo.day} ${endDateInfo.hour}:${endDateInfo.minute} ${endDateInfo.ampm}`,
    "YYYY-MM-DD hh:mm A"
  ).format("YYYY-MM-DDTHH:mm:ss");

  // 새 프로젝트 생성 정보
  const newProjectInfo = {
    name: newProjectNameValue,
    category: selectedCategory.category,
    subCategories1: selectedCategory.subCategories1,
    subCategories2: selectedCategory.subCategories2,
    startDate: startFormattedDate,
    endDate: endFormatDate,
    invitedMembers: selectedMember,
    status: "BEFORE_START",
    colors: randomColor("calendar"),
  };

  const { mutate } = useMutation({
    mutationFn: (newProjectInfo: any) => createProject(newProjectInfo),
  });

  const statusOptions = {
    COMPLETE: "진행완료",
    IN_PROGRESS: "진행 중",
    BEFORE_START: "진행예정",
    HOLD: "보류",
  };

  // 진행상태
  const [selectedStatus, setSelectedStatus] = useState(
    statusOptions[
      selectedData?.status.toUpperCase() as keyof typeof statusOptions
    ]
  );

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
            <WriteProjectName
              value="프로젝트"
              name={selectedData?.name}
              newProjectNameValue={newProjectNameValue}
              setNewProjectNameValue={setNewProjectNameValue}
            />

            {/* 분야 검색 */}
            <SelectCategory
              selectedData={selectedCategory}
              setSelectedData={setSelectedCategory}
            />
          </div>
        )}

        {/* 두 번째 페이지 */}
        {pages === 1 && (
          <div className="w-full flex flex-col gap-[20px]">
            {/* 팀원 검색 */}
            <SelectMember
              value="프로젝트"
              selectedMembers={selectedMember}
              setSelectedMembers={setSelectedMember}
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

            {/* 진행 상태 */}
            <div className="flex flex-col gap-[5px]">
              <p className="font-bold text-[16px] text-main-green">진행상태</p>
              <div className="flex gap-[5px]">
                {Object.values(statusOptions)
                  .slice(0, 3)
                  .map((status) => (
                    <button
                      key={status}
                      className={`w-full h-[27px] font-medium text-[14px] flex justify-center items-center cursor-pointer
              ${
                selectedStatus === status
                  ? "bg-main-green01 text-main-beige01"
                  : "bg-gray02 text-gray01"
              }`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
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
              onClick={() => {
                setPages(1);
                console.log(newProjectInfo);
                mutate(newProjectInfo);
              }}
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
      {/* {pages === 0 && selectedCategory.subCategories1 && (
        <div
          className="w-[350px] h-[600px] py-[20px]
          flex flex-col justify-between items-center"
        > */}
      {/* 세부항목1 워드클라우드 */}
      {/* <div className="flex flex-col items-center">
            {selectedCategory.subCategories1 && (
              <div className="text-main-green font-bold">
                {selectedCategory.subCategories1.data}
              </div>
            )}
            {selectedCategory.subCategories1 && (
              <WordCloud
                words={selectedCategory.subCategories1.data.map((contents) => ({
                  text: contents.text,
                  value: contents.value,
                }))}
              />
            )}
          </div> */}

      {/* 세부항목2 워드클라우드 */}
      {/* <div className="flex flex-col items-center">
            {selectedCategory.subCategories2 && (
              <div className="text-main-green font-bold">
                {selectedCategory.subCategories2.data}
              </div>
            )}
            {selectedCategory.subCategories2 && (
              <WordCloud
                words={selectedCategory.subCategories2.data.map((contents) => ({
                  text: contents.text,
                  value: contents.value,
                }))}
              />
            )}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default EditProjectModal;
