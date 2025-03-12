import { useEffect, useRef, useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import SelectMember from "../EditProjectModal/SelectMember";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../api/task";
import AlertModal from "../common/AlertModal";
import dayjs from "dayjs";
import { showToast } from "../../utils/toastConfig";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import loadingLottie from "../../assets/animations/loadingLottie.json";

interface CreateTaskProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: number;
  onClick?: (task: CreateTask) => void;
  refetch: () => void;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  memberData: members[];
  projectData?: GetProjectById;
}

const CreateTaskModal = ({
  onClose,
  projectId,
  refetch,
  setIsModal,
  memberData,
  projectData,
}: CreateTaskProps) => {
  /* 업무 생성 */
  const { mutateAsync, isPending: createTaskPending } = useMutation({
    mutationFn: (newTaskInfo: CreateTask) => createTask(newTaskInfo),
    onSuccess: () => showToast("success", "업무가 생성되었습니다."),
  });

  const handleCreateTask = async (taskData: CreateTask) => {
    try {
      console.log("업무 생성 요청:", taskData); // 디버깅용 로그
      await mutateAsync(taskData);
      console.log("업무 생성 완료");

      // 프로젝트 상세 정보를 다시 불러옴
      refetch();

      // 모달을 닫기 전에 데이터가 반영되었는지 확인
      setTimeout(() => {
        setIsModal(false);
      }, 50); // 비동기 처리 후 UI 반영을 위해 약간의 딜레이 추가
    } catch (error) {
      console.error("업무 생성 실패 :", error);
    }
  };

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

  // set 함수에 넣을 수 있는 형식 변환된 시작/종료 날짜
  const formattedProjectStartDate = formatDateToObject(projectData?.startDate);
  const formattedProjectEndDate = formatDateToObject(projectData?.endDate);

  // 현재 시간 설정
  const now = dayjs();
  const nowStart = {
    year: now.format("YYYY"),
    month: now.format("MM"),
    day: now.format("DD"),
    hour: now.format("HH"), // 24시간제
    minute: now.format("mm"),
  };
  const nowEnd = {
    year: now.add(1, "hour").format("YYYY"), // 시작보다 1시간 뒤
    month: now.add(1, "hour").format("MM"),
    day: now.add(1, "hour").format("DD"),
    hour: now.add(1, "hour").format("HH"), // 24시간제
    minute: now.format("mm"),
  };

  // 선택한 일정 시작 상태 (현재 시간으로 기본 설정)
  const [selectedStartDate, setSelectedStartDate] =
    useState<selectedDateType>(nowStart);

  // 선택한 일정 종료 상태 (현재 시간 + 1시간으로 기본 설정)
  const [selectedEndDate, setSelectedEndDate] =
    useState<selectedDateType>(nowEnd);

  // 데이터 형식에 맞게 일정 변경 함수
  const formatDateTime = (dateObj: selectedDateType) => {
    return dayjs(
      `${dateObj.year}-${dateObj.month}-${dateObj.day} ${dateObj.hour}:${dateObj.minute}`,
      "YYYY-MM-DD HH:mm"
    ).format("YYYY-MM-DDTHH:mm:ss");
  };

  // 작성한 업무명 상태
  const [newTaskName, setNewTaskName] = useState<string>("");
  // 선택한 담당자 상태
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);
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

  // 업무 생성 함수
  const handleSubmit = () => {
    if (!newTaskName || !selectedMember.length) {
      openModal("업무명과 담당자를 입력해주세요");
      return;
    }

    const newTask: CreateTask = {
      projectId,
      title: newTaskName,
      startDate: formatDateTime(selectedStartDate),
      endDate: formatDateTime(selectedEndDate),
      status: "BEFORE_START",
      assignedMemberId: selectedMember[0].memberId,
      participantIds: [selectedMember[0].memberId],
      colors: { background: "#ff5733", text: "#ffffff" },
    };

    if (startDate.isBefore(nowDate.subtract(1, "day"))) {
      showToast("error", "업무 시작은 어제 이후부터 설정할 수 있습니다.");
      return;
    }

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

    if (startDate > endDate) {
      showToast("error", "종료 날짜는 시작 날짜보다 뒤로 설정해야합니다.");
      return;
    }

    console.log(newTask);
    handleCreateTask(newTask);
  };

  // 비교가능한 날짜 형식 변경 함수
  // 날짜 변환 함수 (12시간제 → 24시간제)
  const convertToDate = (dateObj: selectedDateType) => {
    return dayjs(
      `${dateObj.year}-${dateObj.month}-${dateObj.day} ${dateObj.hour}:${dateObj.minute}`,
      "YYYY-MM-DD HH:mm"
    );
  };

  // 비교 가능한 날짜들 변환
  const startDate = convertToDate(selectedStartDate);
  const endDate = convertToDate(selectedEndDate);
  const nowDate = dayjs();
  // const nowEndDate = nowDate.add(1, "hour"); // 현재 시간 +1시간
  const projectStartDate = projectData?.startDate
    ? dayjs(projectData.startDate)
    : nowDate;
  const projectEndDate = projectData?.endDate
    ? dayjs(projectData.endDate)
    : nowDate;

  // useEffect를 활용한 날짜 검증
  useEffect(() => {
    //   if (!formattedProjectStartDate || !formattedProjectEndDate) return;

    //   if (startDate.isSame(nowDate) && endDate.isSame(nowEndDate)) return;

    //   if (projectEndDate.isBefore(nowDate)) {
    //     openModal("프로젝트 마감 기한이 지났습니다.");
    //     setSelectedEndDate(formattedProjectEndDate);
    //   }

    //   if (startDate.isBefore(nowDate)) {
    //     openModal("업무 시작은 현재 시간 이전으로 설정할 수 없습니다.");
    //     // setSelectedStartDate(nowDate.format("YYYY-MM-DD HH:mm:ss"));
    //     // setSelectedEndDate(nowEndDate.format("YYYY-MM-DD HH:mm:ss"));
    //   }

    //   if (startDate.isBefore(projectStartDate)) {
    //     openModal("업무 시작은 프로젝트 시작 이전으로 설정할 수 없습니다.");
    //     // setSelectedStartDate(nowDate.format("YYYY-MM-DD HH:mm:ss"));
    //     // setSelectedEndDate(nowEndDate.format("YYYY-MM-DD HH:mm:ss"));
    //   }

    //   if (endDate.isAfter(projectEndDate)) {
    //     openModal("업무 종료는 프로젝트 종료 이후로 설정할 수 없습니다.");
    //     // setSelectedStartDate(nowDate.format("YYYY-MM-DD HH:mm:ss"));
    //     // setSelectedEndDate(nowEndDate.format("YYYY-MM-DD HH:mm:ss"));
    //   }

    if (startDate.isBefore(nowDate.subtract(1, "day"))) {
      showToast("error", "업무 시작은 어제 이후부터 설정할 수 있습니다.");
    }

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

  // 로티 ref
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(0.7);
    }
  }, []);

  if (createTaskPending) {
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
      className="bg-white w-[350px] min-h-[497px] 
      flex flex-col gap-[20px] px-[40px] py-[30px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-center items-center">
        <span className="text-[18px] font-bold">업무 생성</span>
      </div>
      {/* 업무, 프로젝트 생성에서 공동으로 쓰려면 제목 props로 내리도록 수정 필요 */}
      <WriteProjectName
        value="업무"
        newProjectNameValue={newTaskName}
        setNewProjectNameValue={setNewTaskName}
      />
      <SelectMember
        value="업무"
        selectedMembers={selectedMember}
        setSelectedMembers={setSelectedMember}
        memberData={memberData}
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
      <div className="flex gap-[20px] justify-center items-center">
        <Button
          text="생성하기"
          size="md"
          css="border border-main-green01 text-main-green01 font-bold text-[14px]  w-[89px] h-[27px]"
          onClick={handleSubmit}
        />
        <Button
          text="취소"
          size="md"
          onClick={() => onClose((prev) => !prev)}
          css="bg-logo-green text-main-beige01 font-bold text-[14px] w-[65px] h-[27px]"
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <AlertModal text={modalText} onClose={closeModal} />
        </div>
      )}
    </div>
  );
};

export default CreateTaskModal;
