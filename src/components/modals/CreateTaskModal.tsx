import { useEffect, useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import SelectMember from "../EditProjectModal/SelectMember";
import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../api/task";
import AlertModal from "../common/AlertModal";

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
  const { mutateAsync } = useMutation({
    mutationFn: (newTaskInfo: CreateTask) => createTask(newTaskInfo),
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

  // set함수에 넣을 수 있는 프로젝트 날짜 형식 변환 함수
  const formatDateToObject = (dateString: string | undefined) => {
    if (!dateString) return null; // undefined일 경우 null 반환

    const date = new Date(dateString);

    let hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // 12시간제 변환

    return {
      year: String(date.getFullYear()), // 연도를 두 자리로 변환
      month: String(date.getMonth() + 1).padStart(2, "0"), // 월 (1월이 0이므로 +1)
      day: String(date.getDate()).padStart(2, "0"), // 일
      hour: String(hours).padStart(2, "0"), // 시간 (12시간제)
      minute: String(date.getMinutes()).padStart(2, "0"), // 분
      ampm, // 오전/오후
    };
  };

  // set함수에 넣을 수 있는 형식 변환된 시작/종료 날짜
  const formattedProjectStartDate = formatDateToObject(projectData?.startDate);
  const formattedProjectEndDate = formatDateToObject(projectData?.endDate);

  const now = new Date();
  const nowStart = {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    hour: String(now.getHours() % 12 || 12).padStart(2, "0"),
    minute: String(now.getMinutes()).padStart(2, "0"),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  };
  const nowEnd = {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    hour: String((now.getHours() + 1) % 12 || 12).padStart(2, "0"), // 시작보다 1시간 뒤
    minute: String(now.getMinutes()).padStart(2, "0"),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  };
  console.log(nowStart);
  console.log(nowEnd);

  // 선택한 일정 시작 상태 (현재 시간으로 기본 설정)
  const [selectedStartDate, setSelectedStartDate] =
    useState<selectedDateType>(nowStart);

  // 선택한 일정 종료 상태 (현재 시간 + 1시간으로 기본 설정)
  const [selectedEndDate, setSelectedEndDate] =
    useState<selectedDateType>(nowEnd);

  // 데이터 형식에 맞게 일정 변경 함수
  const formatDateTime = (dateObj: selectedDateType) => {
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T${
      dateObj.ampm === "PM"
        ? String((Number(dateObj.hour) % 12) + 12).padStart(2, "0")
        : dateObj.hour
    }:${dateObj.minute}:00`;
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
    // (임시) 알림창
    if (!newTaskName || !selectedMember.length) {
      openModal("업무명과 담당자를 입력해주세요");
      return;
    }

    const newTask: CreateTask = {
      projectId: projectId,
      title: newTaskName,
      startDate: formatDateTime(selectedStartDate),
      endDate: formatDateTime(selectedEndDate),
      status: "BEFORE_START",
      assignedMemberId: selectedMember[0].memberId,
      participantIds: [selectedMember[0].memberId],
      colors: { background: "#ff5733", text: "#ffffff" },
    };
    console.log(newTask);

    // 상태가 변경된 이후에 mutate 실행
    handleCreateTask(newTask);
  };

  // 비교가능한 날짜 형식 변경 함수
  const convertToDate = (dateObj: {
    year: string;
    month: string;
    day: string;
    hour: string;
    minute: string;
    ampm: string;
  }) => {
    let hour = parseInt(dateObj.hour, 10);

    // AM/PM 변환 (12시간제 → 24시간제)
    if (dateObj.ampm === "PM" && hour !== 12) {
      hour += 12;
    } else if (dateObj.ampm === "AM" && hour === 12) {
      hour = 0;
    }

    return new Date(
      parseInt(dateObj.year, 10),
      parseInt(dateObj.month, 10) - 1,
      parseInt(dateObj.day, 10),
      hour,
      parseInt(dateObj.minute, 10)
    );
  };

  // 비교가 가능하게 변환된 날짜들
  const startDate = convertToDate(selectedStartDate); // 선택된 시작날짜
  const endDate = convertToDate(selectedEndDate); // 선택된 종료날짜
  const nowDate = new Date(); // 현재 시작날짜
  const nowEndDate = new Date(nowDate); // 현재 종료날짜
  nowEndDate.setHours(nowEndDate.getHours() + 1);
  const projectStartDate = projectData?.startDate // 프로젝트 시작날짜
    ? new Date(projectData.startDate)
    : new Date();
  const projectEndDate = projectData?.endDate // 프로젝트 종료날짜
    ? new Date(projectData.endDate)
    : new Date();

  // 분까지만 비교
  startDate.setSeconds(0, 0);
  endDate.setSeconds(0, 0);
  nowDate.setSeconds(0, 0);
  nowEndDate.setSeconds(0, 0);
  projectStartDate.setSeconds(0, 0);
  projectEndDate.setSeconds(0, 0);

  // 시작과 종료 설정 시 종료가 시작과 같거나 이전이면 초기화
  useEffect(() => {
    if (!formattedProjectStartDate || !formattedProjectEndDate) {
      return;
    }

    if (startDate === nowDate && endDate === nowEndDate) {
      return;
    }

    // 프로젝트 종료일이 현재보다 이전일 경우 업무생성 불가 모달 오픈
    // 마감일은 프로젝트 마감일로 초기화
    if (projectEndDate < nowDate) {
      openModal("프로젝트 마감 기한이 지났습니다.");
      setSelectedEndDate(formattedProjectEndDate);
    }
    console.log(startDate);
    console.log(nowDate);
    // 시작일이 프로젝트 시작 이전일 경우 모달 오픈, 프로젝트 기간으로 설정
    if (startDate < nowDate) {
      console.log(startDate);
      openModal("업무 시작은 현재 시간 이전으로 설정할 수 없습니다.");
      setSelectedStartDate(nowStart);
      setSelectedEndDate(nowEnd);
    }

    // 시작일이 프로젝트 시작 이전일 경우 모달 오픈, 프로젝트 기간으로 설정
    if (startDate < projectStartDate) {
      openModal("업무 시작은 프로젝트 시작 이전으로 설정할 수 없습니다.");
      setSelectedStartDate(nowStart);
      setSelectedEndDate(nowEnd);
    }

    // 종료일이 프로젝트 종료 이후일 경우 모달 오픈, 프로젝트 기간으로 설정
    if (endDate > projectEndDate) {
      openModal("업무 종료는 프로젝트 종료 이후로 설정할 수 없습니다.");
      setSelectedStartDate(nowStart);
      setSelectedEndDate(nowEnd);
    }

    // 시작이 종료 이전으로 설정되게 제한
    if (startDate >= endDate) {
      openModal("업무 시작은 종료 이전으로 설정해야 합니다.");
      // 시작과 종료 초기화
      setSelectedStartDate(nowStart);
      setSelectedEndDate(nowEnd);
    }
  }, [startDate, endDate]);

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
          onClick={() => {
            handleSubmit();
          }}
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
