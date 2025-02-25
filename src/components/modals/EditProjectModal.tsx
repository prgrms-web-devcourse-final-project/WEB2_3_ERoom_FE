import dayjs from "dayjs";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectCategory from "../EditProjectModal/SelectCategory";
import SelectMember from "../EditProjectModal/SelectMember";
import WordCloud from "../EditProjectModal/WordCloud";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import "dayjs/locale/en";
import { randomColor } from "../../utils/randomColor";
import { patchProjectById, postProject } from "../../api/project";
import { useNavigate } from "react-router";

const EditProjectModal = ({
  selectedProject,
  setIsEditProjectModal,
  title,
}: EditProjectModalProps) => {
  // 프로젝트 생성 페이지 상태
  const [pages, setPages] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("selectedProject", selectedProject);
  }, []);

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

  useEffect(() => {
    if (selectedProject) {
      setNewProjectNameValue(selectedProject.name);
    }

    const startDate = selectedProject
      ? dayjs(selectedProject.startDate).locale("en")
      : dayjs().locale("en");

    const startYear = startDate.format("YYYY");
    const startMonth = startDate.format("MM");
    const startDay = startDate.format("DD");
    const startHour = startDate.format("hh"); // 12시간 형식
    const startMinute = startDate.format("mm");
    const startAmpm = startDate.format("A"); // AM/PM

    setStartDateInfo({
      year: startYear,
      month: startMonth,
      day: startDay,
      hour: startHour,
      minute: startMinute,
      ampm: startAmpm,
    });

    const endDate = selectedProject
      ? dayjs(selectedProject.endDate).locale("en")
      : dayjs().locale("en");
    const endYear = endDate.format("YYYY");
    const endMonth = endDate.format("MM");
    const endDay = endDate.format("DD");
    const endHour = selectedProject
      ? endDate.format("hh")
      : endDate.add(1, "hour").format("hh"); // 12시간 형식
    const endMinute = endDate.format("mm");
    const endAmpm = endDate.format("A"); // AM/PM

    setEndDateInfo({
      year: endYear,
      month: endMonth,
      day: endDay,
      hour: endHour,
      minute: endMinute,
      ampm: endAmpm,
    });
  }, [selectedProject]);

  // 선택된 분야, 세부항목 상태
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>({
    category: selectedProject?.category,
    subCategories1: selectedProject?.subCategories1,
    subCategories2: selectedProject?.subCategories2,
  });

  // 최종 새프로젝트 정보
  // 선택한 팀원 상태 api수정되면 추가 수정필요
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);

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
  const newProjectInfo: postProjectType = {
    name: newProjectNameValue,
    description: "",
    category: selectedCategory.category || "",
    subCategories1: ["C", "C++"],
    subCategories2: ["React", "Vue.js"],
    startDate: startFormattedDate,
    endDate: endFormatDate,
    invitedMemberIds: selectedMember.map((memberInfo) => memberInfo.id),
  };

  const { mutateAsync } = useMutation({
    mutationFn: (newProjectInfo: postProjectType) =>
      postProject(newProjectInfo),
  });

  // selectedProject?.members || []

  const newProjectPost = async (newProjectInfo: postProjectType) => {
    try {
      const response = await mutateAsync(newProjectInfo);
      console.log(response);
      navigate(`/project-room/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 수정데이터 //이슈 invitedMemberIds -> memberIds로 변경 시 오류
  const editProjectInfo: patchProjectRequestType = {
    name: newProjectNameValue,
    category: selectedCategory.category || "",
    subCategories1: selectedCategory.subCategories1 || [],
    subCategories2: selectedCategory.subCategories2 || [],
    startDate: startFormattedDate,
    endDate: endFormatDate,
    memberIds: selectedMember.map((memberInfo) => memberInfo.id),
    status: "IN_PROGRESS",
  };

  // 수정 요청 함수
  const { mutate: editProjectFn } = useMutation({
    mutationFn: ({
      selectedProject,
      editProjectInfo,
    }: {
      selectedProject: ProjectListType;
      editProjectInfo: patchProjectRequestType;
    }) => patchProjectById(selectedProject.id, editProjectInfo),
  });

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
              name={selectedProject?.name}
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
          {selectedProject
            ? pages === 1 && (
                <Button
                  text="수정하기"
                  size="md"
                  css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
                  onClick={() => {
                    setPages(1);
                    console.log(editProjectInfo);
                    editProjectFn({ selectedProject, editProjectInfo });
                  }}
                />
              )
            : pages === 1 && (
                <Button
                  text="생성하기"
                  size="md"
                  css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
                  onClick={() => {
                    setPages(1);
                    console.log(newProjectInfo);
                    newProjectPost(newProjectInfo);
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
