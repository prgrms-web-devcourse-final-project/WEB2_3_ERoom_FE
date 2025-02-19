import { useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../CreateModal/DateTimeSelect";
import WriteProjectName from "../CreateProjectModal/WriteProjectName";
import SelectMember from "../CreateProjectModal/SelectMember";

interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

const CreateTaskModal = ({ onClose }: { onClose: () => void }) => {
  const now = new Date();
  const [selectedStartDate, setSelectedStartDate] = useState<selectedDateType>({
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    hour: String(now.getHours() % 12 || 12).padStart(2, "0"),
    minute: String(now.getMinutes()).padStart(2, "0"),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  });

  const [selectedEndDate, setSelectedEndDate] = useState<selectedDateType>({
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
    day: String(now.getDate()).padStart(2, "0"),
    hour: String(now.getHours() % 12 || 12).padStart(2, "0"),
    minute: String(now.getMinutes()).padStart(2, "0"),
    ampm: now.getHours() >= 12 ? "PM" : "AM",
  });

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

  return (
    <div className="bg-white w-[350px] h-[497px] flex flex-col gap-[20px] px-[40px] py-[30px] ">
      <div className="flex justify-center items-center">
        <span className="text-[18px] font-bold">업무 생성</span>
      </div>
      {/* 업무, 프로젝트 생성에서 공동으로 쓰려면 제목 props로 내리도록 수정 필요 */}
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
      <div className="flex gap-[20px] justify-center items-center">
        <Button
          text="생성하기"
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

export default CreateTaskModal;
