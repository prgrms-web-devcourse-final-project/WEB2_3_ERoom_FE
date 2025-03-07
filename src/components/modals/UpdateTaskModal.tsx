import { useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectMember from "../EditProjectModal/SelectMember";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import ConfirmModal from "./ConfirmModal";
import { getTaskById } from "../../api/task";
import { useQuery } from "@tanstack/react-query";
import defaultImg from "../../assets/defaultImg.svg";
import { useAuthStore } from "../../store/authStore";

const UpdateTaskModal = ({
  task,
  onClose,
  value,
  onDelete,
  onUpdate,
  refetch,
}: UpdateTaskModalProps) => {
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const loginUser = useAuthStore((state) => state.member);

  //selectedStartDate, selectedEndDate에 데이터 들어갈 수 있게 분리하는 함수
  const parseDateTime = (dateTimeString: string) => {
    const [datePart, timePart] = dateTimeString.split("T");
    const [year, month, day] = datePart.split("-");
    let [hour, minute] = timePart.split(":").map(Number);

    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // 12시간제 변환

    return {
      year,
      month,
      day,
      hour: String(hour).padStart(2, "0"),
      minute: String(minute).padStart(2, "0"),
      ampm,
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
    ampm: parsedStartDate.ampm,
  });

  const [selectedEndDate, setSelectedEndDate] = useState<selectedDateType>({
    year: parsedEndDate.year,
    month: parsedEndDate.month,
    day: parsedEndDate.day,
    hour: parsedEndDate.hour,
    minute: parsedEndDate.minute,
    ampm: parsedEndDate.ampm,
  });

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
      profile: updatedData?.participantProfiles?.[0] ?? defaultImg,
      email: "",
      memberId: updatedData?.participantIds?.[0] ?? 0,
    },
  ]);

  const [taskName, setTaskName] = useState<string>(task.title);

  // 데이터 형식에 맞게 일정 변경 함수
  const formatDateTime = (dateObj: selectedDateType) => {
    return `${dateObj.year}-${dateObj.month}-${dateObj.day}T${
      dateObj.ampm === "PM"
        ? String((Number(dateObj.hour) % 12) + 12).padStart(2, "0")
        : dateObj.hour
    }:${dateObj.minute}:00`;
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
              onUpdate(task.taskId, taskInfo);
              refetch();
            }
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
    </div>
  );
};

export default UpdateTaskModal;
