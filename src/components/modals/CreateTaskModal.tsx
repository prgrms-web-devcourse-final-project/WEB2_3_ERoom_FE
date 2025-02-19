import { useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../CreateModal/DateTimeSelect";

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

  return (
    <div className="bg-white w-[350px] h-[497px] flex flex-col gap-[20px] px-[40px] py-[30px] ">
      <div>
        <span>업무 생성</span>
      </div>
      <div>업무명</div>
      <div>담당자</div>
      <div>
        <span>일정</span>
        <div className="flex flex-col gap-[10px]">
          <DateTimeSelect
            title="시작"
            selectedDate={selectedStartDate}
            setSelectedDate={setSelectedStartDate}
          />
          <DateTimeSelect
            title="종료"
            selectedDate={selectedEndDate}
            setSelectedDate={setSelectedEndDate}
          />
        </div>
      </div>
      <div>
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
