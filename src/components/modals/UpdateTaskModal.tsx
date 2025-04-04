import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectMember from "../EditProjectModal/SelectMember";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import ConfirmModal from "./ConfirmModal";
import { getTaskById } from "../../api/task";
import { useQuery } from "@tanstack/react-query";
import defaultImg from "../../assets/defaultImg.svg";
import { useAuthStore } from "../../store/authStore";
import AlertModal from "../common/AlertModal";
import dayjs from "dayjs";
import { showToast } from "../../utils/toastConfig";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import loadingLottie from "../../assets/animations/loadingLottie.json";

const UpdateTaskModal = ({
  task,
  onClose,
  value,
  onDelete,
  onUpdate,
  refetch,
  updateTaskPending,
  projectData,
  projectEditInfo,
}: UpdateTaskModalProps) => {
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const loginUser = useAuthStore((state) => state.member);

  //selectedStartDate, selectedEndDate에 데이터 들어갈 수 있게 분리하는 함수

  const parseDateTime = (dateTimeString: string) => {
    const date = dayjs(dateTimeString);

    return {
      year: date.format("YYYY"),
      month: date.format("MM"),
      day: date.format("DD"),
      hour: date.format("HH"),
      minute: date.format("mm"),
    };
  };

  const parsedStartDate = parseDateTime(task.startDate);
  const parsedEndDate = parseDateTime(task.endDate);

  const [selectedStartDate, setSelectedStartDate] = useState<selectedDateType>({
    year: parsedStartDate.year,
    month: parsedStartDate.month,
    day: parsedStartDate.day,
    hour: parsedStartDate.hour,
    minute: parsedStartDate.minute,
  });

  const [selectedEndDate, setSelectedEndDate] = useState<selectedDateType>({
    year: parsedEndDate.year,
    month: parsedEndDate.month,
    day: parsedEndDate.day,
    hour: parsedEndDate.hour,
    minute: parsedEndDate.minute,
  });

  // 비교가능한 날짜 형식 변경 함수
  const convertToDate = (dateObj: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
  }) => {
    return dayjs(
      `${dateObj.year}-${dateObj.month}-${dateObj.day} ${dateObj.hour}:${dateObj.minute}`,
      "YYYY-MM-DD HH:mm"
    );
  };

  // 비교가 가능하게 변환된 날짜들
  const startDate = convertToDate(selectedStartDate); // 선택된 시작날짜
  const endDate = convertToDate(selectedEndDate); // 선택된 종료날짜
  // const nowDate = dayjs(); // 현재 시작날짜
  // const nowEndDate = nowDate.add(1, "hour"); // 현재 종료날짜 (1시간 뒤)
  const projectStartDate = projectEditInfo?.startDate
    ? dayjs(projectEditInfo.startDate)
    : dayjs();
  const projectEndDate = projectEditInfo?.endDate
    ? dayjs(projectEditInfo.endDate)
    : dayjs();

  // set함수에 넣을 수 있는 프로젝트 날짜 형식 변환 함수
  const formatDateToObject = (dateString: string | undefined) => {
    if (!dateString) return null; // undefined일 경우 null 반환

    const date = dayjs(dateString);

    return {
      year: date.format("YYYY"),
      month: date.format("MM"),
      day: date.format("DD"),
      hour: date.format("HH"), // 24시간제
      minute: date.format("mm"),
    };
  };

  // set함수에 넣을 수 있는 형식 변환된 시작/종료 날짜
  const formattedProjectStartDate = formatDateToObject(
    projectEditInfo?.startDate
  );
  const formattedProjectEndDate = formatDateToObject(projectEditInfo?.endDate);
  // const formattedTaskStartDate = formatDateToObject(task?.startDate);
  // const formattedTaskEndDate = formatDateToObject(task?.endDate);

  // 모달 적용
  const [modalText, setModalText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = (text: string) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalText("");
    setIsModalOpen(false);
  };

  // 시작과 종료 설정 시 종료가 시작과 같거나 이전이면 초기화
  useEffect(() => {
    // if (!formattedProjectStartDate || !formattedProjectEndDate) {
    //   return;
    // }

    // if (startDate === nowDate && endDate === nowEndDate) {
    //   return;
    // }

    // // 프로젝트 종료일이 현재보다 이전일 경우 업무생성 불가 모달 오픈
    // // 마감일은 프로젝트 마감일로 초기화
    // if (projectEndDate < nowDate) {
    //   openModal("프로젝트 마감 기한이 지났습니다.");
    //   setSelectedEndDate(formattedProjectEndDate);
    // }

    // // 시작일이 프로젝트 시작 이전일 경우 모달 오픈, 프로젝트 기간으로 설정
    // if (startDate < projectStartDate) {
    //   openModal("업무 시작은 프로젝트 시작 이전으로 설정할 수 없습니다.");
    //   setSelectedStartDate(formattedTaskStartDate || formattedProjectStartDate);
    //   setSelectedEndDate(formattedTaskEndDate || formattedProjectEndDate);
    // }

    // // 종료일이 프로젝트 종료 이후일 경우 모달 오픈, 프로젝트 기간으로 설정
    // if (endDate > projectEndDate) {
    //   openModal("업무 종료는 프로젝트 종료 이후로 설정할 수 없습니다.");
    //   setSelectedStartDate(formattedTaskStartDate || formattedProjectStartDate);
    //   setSelectedEndDate(formattedTaskEndDate || formattedProjectEndDate);
    // }

    // // 시작이 종료 이전으로 설정되게 제한
    // if (startDate >= endDate) {
    //   openModal("업무 시작은 종료 이전으로 설정해야 합니다.");
    //   // 시작과 종료 초기화
    //   setSelectedStartDate(formattedTaskStartDate || formattedProjectStartDate);
    //   setSelectedEndDate(formattedTaskEndDate || formattedProjectEndDate);
    // }

    if (startDate < projectStartDate) {
      showToast(
        "error",
        "업무 시작은 프로젝트 시작 이전으로 설정할 수 없습니다."
      );
      setSelectedStartDate(formattedProjectStartDate!);
    }

    if (endDate > projectEndDate) {
      showToast(
        "error",
        "업무 종료는 프로젝트 종료 이후로 설정할 수 없습니다."
      );
      setSelectedEndDate(formattedProjectEndDate!);
    }

    if (startDate >= endDate) {
      showToast("error", "종료 날짜는 시작 날짜보다 뒤로 설정해야합니다.");
    }
  }, [startDate, endDate]);

  const statusOptions = {
    COMPLETED: "진행완료",
    IN_PROGRESS: "진행 중",
    BEFORE_START: "진행예정",
    HOLD: "보류",
  };

  /* 업무 정보 불러오기 */
  const { data: updatedData } = useQuery<GetUpdateTask>({
    queryKey: ["UpdatedData", task.taskId],
    queryFn: async () => {
      return await getTaskById(task.taskId);
    },
  });

  // 진행상태
  const [selectedStatus, setSelectedStatus] = useState(
    statusOptions[task.status.toUpperCase() as keyof typeof statusOptions]
  );

  // 진행상태 데이터 형식에 맞게 변환
  const reversedStatusOptions = Object.fromEntries(
    Object.entries(statusOptions).map(([key, value]) => [value, key])
  ) as Record<string, "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD">;

  // 선택된 담당자 상태
  const [memberData, setMemberData] = useState<MemberType[]>([
    {
      username: task.assignedMemberName,
      profile: updatedData?.assignedMemberProfile ?? defaultImg,
      email: "",
      memberId: updatedData?.participantIds?.[0] ?? 0,
    },
  ]);

  const [taskName, setTaskName] = useState<string>(task.title);

  // 데이터 형식에 맞게 일정 변경 함수
  const formatDateTime = (dateObj: selectedDateType) => {
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T${dateObj.hour}:${dateObj.minute}:00`;
  };

  // 작성된 업무 정보
  const taskInfo = {
    title: taskName,
    startDate: formatDateTime(selectedStartDate),
    endDate: formatDateTime(selectedEndDate),
    status: reversedStatusOptions[selectedStatus],
    assignedMemberId:
      memberData && memberData[0]?.memberId
        ? memberData[0]?.memberId
        : updatedData?.assignedMemberId || loginUser?.id || 0,
    participantIds:
      memberData && memberData[0]?.memberId
        ? [memberData[0]?.memberId]
        : updatedData?.assignedMemberId
        ? [updatedData?.assignedMemberId]
        : [loginUser?.id || 0], // 참여자 배열이 비어있으면 빈 배열을 할당
  };

  // console.log(task);
  // console.log(updatedData);
  // console.log(taskInfo);

  // 로티 ref
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.7);
    }
  }, []);

  if (updateTaskPending) {
    return (
      <div>
        <Lottie
          lottieRef={lottieRef}
          animationData={loadingLottie}
          loop={true}
          className="w-80 h-80"
        />
      </div>
    );
  }

  return (
    <div
      className="bg-white w-[350px] max-h-full
    flex flex-col gap-[20px] px-[40px] py-[30px] overflow-y-scroll scrollbar"
    >
      <div className="flex justify-center items-center">
        <span className="text-[18px] font-bold">업무 {value}</span>
      </div>
      {/* 업무, 프로젝트 생성에서 공동으로 쓰려면 제목 props로 내리도록 수정 필요 */}
      {/* 기본값 props로 내릴 수 있도록 수정 필요 */}
      <WriteProjectName
        value="업무"
        newProjectNameValue={taskName}
        setNewProjectNameValue={setTaskName}
        name={taskName}
      />
      <SelectMember
        selectedData={updatedData}
        selectedMembers={memberData}
        setSelectedMembers={setMemberData}
        memberData={projectData?.members}
        value="업무"
      />
      <div>
        <span className="text-[16px] font-bold">일정</span>
        <div className="flex flex-col gap-[10px]">
          {/* 일정 선택 컴포넌트  */}
          <div className="z-40">
            <DateTimeSelect
              title="시작"
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
            />
          </div>
          <div className="z-10">
            <DateTimeSelect
              title="종료"
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[5px]">
        {/* 진행 상태 */}
        <span className="font-bold text-[16px] text-main-green">진행상태</span>
        <div className="flex flex-col gap-[5px]">
          {/* 진행완료, 진행중 */}
          <div className="flex gap-[5px]">
            {Object.values(statusOptions)
              .slice(0, 2)
              .map((status) => (
                <button
                  key={status}
                  className={`w-full h-[27px] font-medium text-[14px] 
                    flex justify-center items-center cursor-pointer
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

          {/* 진행예정 보류 */}
          <div className="flex gap-[5px]">
            {Object.values(statusOptions)
              .slice(2)
              .map((status) => (
                <button
                  key={status}
                  className={`w-full h-[27px] font-medium text-[14px] 
                    flex justify-center items-center cursor-pointer
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
      <div className="flex gap-[20px] justify-center items-center">
        <Button
          text="저장하기"
          size="md"
          onClick={() => {
            if (onUpdate) {
              if (startDate < projectStartDate) {
                showToast(
                  "error",
                  "업무 시작은 프로젝트 시작 이전으로 설정할 수 없습니다."
                );
                return;
              }

              if (endDate > projectEndDate) {
                showToast(
                  "error",
                  "업무 종료는 프로젝트 종료 이후로 설정할 수 없습니다."
                );
                return;
              }

              if (startDate >= endDate) {
                showToast(
                  "error",
                  "종료 날짜는 시작 날짜보다 뒤로 설정해야합니다."
                );
                return;
              }

              if (!memberData.length || !taskName.trim().length) {
                openModal("업무명과 담당자를 입력해주세요");
                return;
              }

              onUpdate(task.taskId, taskInfo);
            }
            refetch();
          }}
          css="border border-main-green01 text-main-green01 font-bold text-[14px]  w-[89px] h-[27px]"
        />
        <Button
          text="삭제"
          size="md"
          onClick={() => setIsConfirmModal(true)}
          css="text-white bg-header-red font-bold text-[14px] w-[89px] h-[27px]"
        />
        <Button
          text="취소"
          size="md"
          onClick={onClose}
          css="bg-logo-green text-main-beige01 font-bold text-[14px] w-[65px] h-[27px]"
        />
      </div>

      {/* 삭제 확인 모달 */}
      {isConfirmModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
            flex justify-center items-center bg-black/70 z-50"
          onClick={() => setIsConfirmModal(false)}
        >
          <ConfirmModal
            processId={task.taskId}
            processType="업무"
            value="삭제"
            setIsModal={setIsConfirmModal}
            onClick={onDelete}
          />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <AlertModal text={modalText} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default UpdateTaskModal;
