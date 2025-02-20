import { useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import CreateAINoteModal from "./CreateAINoteModal";

interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

const CreateNotePeriodModal = ({ onClose }: { onClose: () => void }) => {
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

  const [isRunAI, setIsRunAI] = useState(false);

  const handleRunAI = () => {
    setIsRunAI(true);
  };

  return (
    <>
      {!isRunAI ? (
        <div className="w-[380px] h-[293px] bg-white px-[50px] py-[30px]">
          <div className="flex justify-center">
            <span className="text-[16px] font-bold text-main-green">
              회의록
            </span>
          </div>
          <div className="mb-[20px]">
            <span className="text-[16px] font-bold text-main-green">
              회의 시간 설정
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
            </span>
          </div>
          <div className="flex justify-between">
            <Button
              css="w-[41px] h-[24px] p-0 border border-main-green01 bg-white text-main-green01 font-bold text-[12px]"
              text="다음"
              size="sm"
              onClick={handleRunAI}
            />
            <Button
              css="w-[41px] h-[24px] p-0 border border-logo-green bg-logo-green text-main-beige01 font-bold text-[12px]"
              text="닫기"
              size="sm"
              onClick={onClose}
            />
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center  z-50">
          <CreateAINoteModal onClose={onClose} />
        </div>
      )}
    </>
  );
};

export default CreateNotePeriodModal;
