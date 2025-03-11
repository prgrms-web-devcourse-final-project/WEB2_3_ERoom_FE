import dayjs from "dayjs";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectCategory from "../EditProjectModal/SelectCategory";
import SelectMember from "../EditProjectModal/SelectMember";
// import WordCloud from "../EditProjectModal/WordCloud";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import "dayjs/locale/en";
import { randomColor } from "../../utils/randomColor";
import { patchProjectById, postProject } from "../../api/project";
import { useNavigate } from "react-router";
import { progressType } from "../../utils/progressType";
import { PROGRESS_STATUS } from "../../constants/status";
import SimpleAlertModal from "./SimpleAlertModal";
import { queryClient } from "../../main";
import { searchTagCount } from "../../api/search";
import WordCloud from "../EditProjectModal/WordCloud";
import { getCategory } from "../../api/category";

const EDIT_MODAL_STATUS = ["진행 완료", "진행 중", "진행 예정"];

const EditProjectModal = ({
  selectedProject,
  setIsEditProjectModal,
  title,
}: EditProjectModalProps) => {
  const navigate = useNavigate();
  const [startDateAlertMadalOpen, setStartDateAlertMadalOpen] = useState(false);
  const [endDateAlertModalOpen, setEndDateAlertModalOpen] = useState(false);

  // 프로젝트 생성 페이지 상태
  const [pages, setPages] = useState<number>(0);

  useEffect(() => {
    // 임시 삭제예정
    console.log("selectedProject", selectedProject);
  }, []);

  // 프로젝트 시작 정보 초기화 상태
  const [startDateInfo, setStartDateInfo] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
  });
  // 프로젝트 종료 정보 초기화 상태
  const [endDateInfo, setEndDateInfo] = useState({
    year: "",
    month: "",
    day: "",
    hour: "",
    minute: "",
  });
  // 프로젝트 네임
  const [newProjectNameValue, setNewProjectNameValue] = useState<string>("");

  // 진행 상태 저장
  const [editStatus, setEditStatus] = useState<string>("");

  // 2번페이지로 가기 전 프로젝트명 빈칸 오류
  const [pageError, setPageError] = useState(false);
  // 카테고리오류
  const [cateError, setCateError] = useState(false);
  const [subCateError, setSubCateError] = useState(false);

  // 선택한 팀원 상태 api수정되면 추가 수정필요
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);

  useEffect(() => {
    if (selectedProject) {
      setNewProjectNameValue(selectedProject.name);

      setEditStatus(selectedProject.status);
      setSelectedMember(
        selectedProject.members.filter(
          (member) => member.memberId !== selectedProject.creatorId
        )
      );
    }

    const startDate = selectedProject
      ? dayjs(selectedProject.startDate).locale("en")
      : dayjs().locale("en");

    const startYear = startDate.format("YYYY");
    const startMonth = startDate.format("MM");
    const startDay = startDate.format("DD");
    const startHour = startDate.format("HH"); // 12시간 형식
    const startMinute = startDate.format("mm");

    setStartDateInfo({
      year: startYear,
      month: startMonth,
      day: startDay,
      hour: startHour,
      minute: startMinute,
    });

    const endDate = selectedProject
      ? dayjs(selectedProject.endDate).locale("en")
      : dayjs().locale("en").add(1, "hour");
    const endYear = endDate.format("YYYY");
    const endMonth = endDate.format("MM");
    const endDay = endDate.format("DD");
    const endHour = endDate.format("HH"); // 12시간 형식
    const endMinute = endDate.format("mm");

    setEndDateInfo({
      year: endYear,
      month: endMonth,
      day: endDay,
      hour: endHour,
      minute: endMinute,
    });
  }, [selectedProject]);

  const subCate = selectedProject?.subCategories.map((data) => ({
    subCategoryId: data.id,
    tagIds: data.tags.map((tag) => tag.id),
  }));

  // 선택된 분야, 세부항목 상태
  const [selectedCategory, setSelectedCategory] = useState<any>({
    categoryId: null,
    categoryName: selectedProject?.categoryName,
    subCategories: subCate,
  });

  // 프로젝트명, 분야 validate
  const validateFn = () => {
    console.log(newProjectInfo);
    if (!newProjectNameValue.trim().length) {
      setPageError(true);
      return;
    }

    if (!newProjectInfo.categoryId) {
      setCateError(true);
      return;
    }

    const noTags = newProjectInfo.subCategories
      ? newProjectInfo.subCategories.some(
          (subCate) => subCate.tagIds.length > 0
        )
      : false;

    if (
      !newProjectInfo.subCategories ||
      !newProjectInfo.subCategories.length ||
      !noTags
    ) {
      setSubCateError(true);
      return;
    }

    setPages(pages === 0 ? 1 : 0);
  };

  // 시작날짜 포맷
  const startFormattedDate = dayjs(
    `${startDateInfo.year}-${startDateInfo.month}-${startDateInfo.day} ${startDateInfo.hour}:${startDateInfo.minute}`,
    "YYYY-MM-DD HH:mm"
  ).format("YYYY-MM-DDTHH:mm:ss");

  // 종료날짜 포맷
  const endFormatDate = dayjs(
    `${endDateInfo.year}-${endDateInfo.month}-${endDateInfo.day} ${endDateInfo.hour}:${endDateInfo.minute}`,
    "YYYY-MM-DD HH:mm"
  ).format("YYYY-MM-DDTHH:mm:ss");

  // 새 프로젝트 생성 정보
  const newProjectInfo: postProjectType = {
    name: newProjectNameValue,
    description: "",
    categoryId: selectedCategory.categoryId,
    subCategories: selectedCategory.subCategories,
    startDate: startFormattedDate,
    endDate: endFormatDate,
    invitedMemberIds: selectedMember.map((memberInfo) => memberInfo.memberId),
    colors: randomColor("calendar")!,
  };

  const { mutateAsync } = useMutation({
    mutationFn: (newProjectInfo: postProjectType) =>
      postProject(newProjectInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ProjectRoomList"] });
    },
  });

  /* 프로젝트 생성 */
  const newProjectPost = async (newProjectInfo: postProjectType) => {
    try {
      const response = await mutateAsync(newProjectInfo);
      console.log(response);
      navigate(`/project-room/${response.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  // 수정데이터
  const editProjectInfo: patchProjectRequestType = {
    name: newProjectNameValue,
    categoryId: selectedCategory.categoryId || 0,
    subCategories: selectedCategory.subCategories,
    startDate: startFormattedDate,
    endDate: endFormatDate,
    memberIds: selectedMember.map((memberInfo) => memberInfo.memberId),
    status: editStatus,
  };

  // 수정 요청 함수
  const { mutateAsync: editProjectFn } = useMutation({
    mutationFn: ({
      selectedProject,
      editProjectInfo,
    }: {
      selectedProject: ProjectListType;
      editProjectInfo: patchProjectRequestType;
    }) => patchProjectById(selectedProject.id, editProjectInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ProjectRoomList"] });
      setIsEditProjectModal(false);
    },
  });

  const editProject = async (
    selectedProject: ProjectListType,
    editProjectInfo: patchProjectRequestType
  ) => {
    const response = await editProjectFn({
      selectedProject,
      editProjectInfo,
    });
    console.log(response);
  };

  // API에서 카테고리 정보 가져오기
  const { data: allCategoryData } = useQuery<AllCategoryType[]>({
    queryKey: ["AllCategoryData"],
    queryFn: getCategory,
  });

  // 태그 카운트 정보 가져오기
  const { data: tagCountInfo } = useQuery({
    queryKey: ["TagCountInfo"],
    queryFn: async () => {
      const response = await searchTagCount();
      return response;
    },
  });

  // 세부항목 태그카운트 정보
  const subCategory1 = allCategoryData
    ?.filter((data) => data.id === selectedCategory?.categoryId)?.[0]
    ?.subcategories[0].tags.map((data) => data.name);
  const subCategory2 = allCategoryData
    ?.filter((data) => data.id === selectedCategory?.categoryId)?.[0]
    ?.subcategories[1].tags.map((data) => data.name);

  const [categoryData1, setCategoryData1] = useState<{ [key: string]: number }>(
    {}
  );
  const [categoryData2, setCategoryData2] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    const subCategoryObject1 = subCategory1?.reduce<Record<string, number>>(
      (acc, data) => {
        acc[data] = tagCountInfo[data] ?? 0;
        return acc;
      },
      {} as Record<string, number>
    );
    const subCategoryObject2 = subCategory2?.reduce<Record<string, number>>(
      (acc, data) => {
        acc[data] = tagCountInfo[data] ?? 0;
        return acc;
      },
      {} as Record<string, number>
    );

    if (subCategoryObject1 && subCategoryObject2) {
      setCategoryData1(subCategoryObject1);
      setCategoryData2(subCategoryObject2);
    }
  }, [selectedCategory]);

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
              pageError={pageError}
              setPageError={setPageError}
            />
            {/* 분야 검색 */}

            <SelectCategory
              selectedData={selectedCategory}
              setSelectedData={setSelectedCategory}
              cateError={cateError}
              setCateError={setCateError}
              subCateError={subCateError}
              setSubCateError={setSubCateError}
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
              type="project"
              selectedData={selectedProject}
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
            {selectedProject && (
              <div className="flex flex-col gap-[5px]">
                <p className="font-bold text-[16px] text-main-green">
                  진행상태
                </p>
                <div className="flex gap-[5px]">
                  {EDIT_MODAL_STATUS.map((status, idx) => (
                    <button
                      key={idx}
                      className={`w-full h-[27px] font-medium text-[14px] flex justify-center items-center cursor-pointer
              ${
                PROGRESS_STATUS[editStatus] === status
                  ? "bg-main-green01 text-main-beige01"
                  : "bg-gray02 text-gray01"
              }`}
                      onClick={() => setEditStatus(progressType(status))}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 버튼 */}
        <div className="flex gap-[10px] w-full">
          <Button
            text={pages === 0 ? "다음" : "이전"}
            size="md"
            css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
            onClick={validateFn}
          />
          {selectedProject
            ? pages === 1 && (
                <Button
                  text="수정하기"
                  size="md"
                  css="text-main-green01 w-full text-[14px] bg-white border-[1px] border-main-green01"
                  onClick={() => {
                    setPages(1);
                    console.log(editProjectInfo, selectedProject);
                    editProject(selectedProject, editProjectInfo);
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
                    if (
                      newProjectInfo.startDate <
                      dayjs().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ss")
                    ) {
                      return setStartDateAlertMadalOpen(true);
                    }
                    if (newProjectInfo.startDate > newProjectInfo.endDate) {
                      return setEndDateAlertModalOpen(true);
                    }
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
      {pages === 0 && selectedCategory.categoryId && (
        <div
          className="w-[350px] h-[600px] py-[20px]
          flex flex-col justify-between items-center"
        >
          {/* 세부항목1 워드클라우드 */}
          <div className="flex flex-col items-center">
            {allCategoryData && (
              <div className="text-main-green font-bold">
                {
                  allCategoryData?.filter(
                    (data) => data.id === selectedCategory?.categoryId
                  )?.[0].subcategories[0].name
                }
              </div>
            )}
            {categoryData1 && (
              <div className="border-gray01 border-[1px]">
                {/* {Object.values(categoryData1).filter((data)=>data !== 0)} */}
                <WordCloud
                  words={Object.keys(categoryData1).map((key) => ({
                    text: key,
                    value: categoryData1[key],
                  }))}
                />
              </div>
            )}
          </div>
          {/* 세부항목2 워드클라우드 */}
          <div className="flex flex-col items-center">
            {allCategoryData && (
              <div className="text-main-green font-bold">
                {
                  allCategoryData?.filter(
                    (data) => data.id === selectedCategory?.categoryId
                  )?.[0].subcategories[1].name
                }
              </div>
            )}
            {categoryData2 && (
              <div className="border-gray01 border-[1px]">
                <WordCloud
                  words={Object.keys(categoryData2).map((key) => ({
                    text: key,
                    value: categoryData2[key],
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {endDateAlertModalOpen && (
        <div className="absolute top-[50px] z-20 bg-black/50 h-[calc(100vh-50px)] w-full flex items-center justify-center">
          <SimpleAlertModal
            text="종료 날짜는 시작 날짜보다 뒤로 설정해야합니다"
            setIsModal={setEndDateAlertModalOpen}
          />
        </div>
      )}
      {startDateAlertMadalOpen && (
        <div className="absolute top-[50px] z-20 bg-black/50 h-[calc(100vh-50px)] w-full flex items-center justify-center">
          <SimpleAlertModal
            text="시작 날짜는 1일 전부터 설정이 가능합니다."
            setIsModal={setStartDateAlertMadalOpen}
          />
        </div>
      )}
    </div>
  );
};
export default EditProjectModal;
