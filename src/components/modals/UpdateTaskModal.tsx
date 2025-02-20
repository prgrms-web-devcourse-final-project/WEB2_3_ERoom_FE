import { useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import SelectMember from "../EditProjectModal/SelectMember";
import WriteProjectName from "../EditProjectModal/WriteProjectName";

interface UpdateTaskModalProps {
  task: {
    id: number;
    name: string;
    memberId: number;
    memberName: string;
    startDate: string;
    endDate: string;
  };
  onClose: () => void;
}

interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

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

const UpdateTaskModal = ({ task, onClose }: UpdateTaskModalProps) => {
  //selectedStartDate, selectedEndDate에 데이터 들어갈 수 있게 분리하는 함수
  const parseDateTime = (dateTimeString: string) => {
    const [datePart, timePart] = dateTimeString.split(" ");
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

  const [selectedStatus, setSelectedStatus] = useState("진행예정");

  const statusOptions = ["진행완료", "진행 중", "진행예정", "보류"];

  return (
    <div
      className="bg-white w-[350px] max-h-full
    flex flex-col gap-[20px] px-[40px] py-[30px] overflow-y-scroll scrollbar"
    >
      <div className="flex justify-center items-center">
        <span className="text-[18px] font-bold">업무 생성</span>
      </div>
      {/* 업무, 프로젝트 생성에서 공동으로 쓰려면 제목 props로 내리도록 수정 필요 */}
      {/* 기본값 props로 내릴 수 있도록 수정 필요 */}
      <WriteProjectName />
      <SelectMember data={membersData} />
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
        <span className="font-bold text-[16px] text-main-green">진행상태</span>
        <div className="flex flex-col gap-[5px]">
          <div className="flex gap-[5px]">
            {statusOptions.slice(0, 2).map((status) => (
              <button
                key={status}
                className={`w-full h-[27px] font-medium text-[14px] flex justify-center items-center 
              ${
                selectedStatus === status
                  ? "bg-main-green01 text-main-green"
                  : "bg-gray02 text-gray01"
              }`}
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </button>
            ))}
          </div>
          <div className="flex gap-[5px]">
            {statusOptions.slice(2).map((status) => (
              <button
                key={status}
                className={`w-full h-[27px] font-medium text-[14px] flex justify-center items-center 
              ${
                selectedStatus === status
                  ? "bg-main-green01 text-main-beige02"
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
          css="border border-main-green01 text-main-green01 font-bold text-[14px]  w-[89px] h-[27px]"
        />
        <Button
          text="취소"
          size="md"
          onClick={onClose}
          css="bg-logo-green text-main-beige01 font-bold text-[14px] w-[65px] h-[27px]"
        />
      </div>
    </div>
  );
};

export default UpdateTaskModal;
