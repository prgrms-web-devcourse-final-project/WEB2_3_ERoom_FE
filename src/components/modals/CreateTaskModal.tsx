import { useEffect, useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import SelectMember from "../EditProjectModal/SelectMember";

const CreateTaskModal = ({
  onClose,
  setData,
  projectId,
  setIsClicked,
}: CreateTaskProps) => {
  const now = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState<selectedDateType>({
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    hour: String(now.getHours() % 12 || 12).padStart(2, "0"),
    minute: String(now.getMinutes()).padStart(2, "0"),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  });

  // 선택한 일정 상태
  const [selectedEndDate, setSelectedEndDate] = useState<selectedDateType>({
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    hour: String(now.getHours() % 12 || 12).padStart(2, "0"),
    minute: String(now.getMinutes()).padStart(2, "0"),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  });

  // 데이터 형식에 맞게 일정 변경 함수
  const formatDateTime = (dateObj: selectedDateType) => {
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T${
      dateObj.ampm === "PM"
        ? String((Number(dateObj.hour) % 12) + 12).padStart(2, "0")
        : dateObj.hour
    }:${dateObj.minute}:00`;
  };
  const formattedStartDateTime = formatDateTime(selectedStartDate);
  const formattedEndDateTime = formatDateTime(selectedEndDate);
  // console.log(formattedStartDateTime);
  // console.log(formattedEndDateTime);

  // 작성한 업무명 상태
  const [newTaskName, setNewTaskName] = useState<string>("");
  // console.log("업무명 :", newTaskName);

  // 선택한 담당자 상태
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);
  // console.log("담당자 :", selectedMember);

  useEffect(() => {
    // 생성할 업무 정보
    const createTask = {
      projectId: projectId,
      title: newTaskName || "",
      startDate: formattedStartDateTime,
      endDate: formattedEndDateTime,
      status: "BEFORE_START",
      assignedMemberId: selectedMember[0]?.id,
      participantIds: [selectedMember[0]?.id],
      colors: { background: "#ff5733", text: "#ffffff" }, // 임시값
    };

    // 누락된 정보 확인
    const isEmpty = Object.values(createTask).some(
      (value) => value === "" || value === null || value === undefined
    );

    // 누락정보 없을 시 set함수 호출
    if (!isEmpty) {
      setData(createTask);
    }
  }, [
    newTaskName,
    formattedStartDateTime,
    formattedEndDateTime,
    selectedMember,
    projectId,
    setData,
  ]);

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
            setIsClicked(true);
          }}
        />
        <Button
          text="취소"
          size="md"
          onClick={() => onClose((prev) => !prev)}
          css="bg-logo-green text-main-beige01 font-bold text-[14px] w-[65px] h-[27px]"
        />
      </div>
    </div>
  );
};

export default CreateTaskModal;
