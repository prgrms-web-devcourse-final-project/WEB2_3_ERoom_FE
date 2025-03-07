import { useEffect, useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import CreateAINoteModal from "./CreateAINoteModal";
import { useMutation } from "@tanstack/react-query";
import { getAINote } from "../../api/meetingroom";

const CreateNotePeriodModal = ({
  onClose,
  chatRoomId,
  AINoteList,
  refetchAINoteList,
}: {
  onClose: () => void;
  chatRoomId: number;
  AINoteList: AINoteListType[] | null;
  refetchAINoteList: () => void;
}) => {
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
  const [title, setTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  //ISO 형식으로 변환하는 함수
  const formatDateFromISO = (date: selectedDateType) => {
    let formattedHour = date.hour;
    if (date.ampm === "PM" && date.hour !== "12") {
      formattedHour = String(Number(date.hour) + 12);
    } else if (date.ampm === "AM" && date.hour === "12") {
      formattedHour = "00";
    }
    return `${date.year}-${date.month}-${date.day}T${formattedHour}:${date.minute}:00`;
  };

  const startTime = formatDateFromISO(selectedStartDate);
  const endTime = formatDateFromISO(selectedEndDate);

  const {
    mutate: fetchAINote,
    data: AINote,
    isPending,
  } = useMutation<
    CreateAIMessage,
    Error,
    { chatRoomId: number; title: string; startTime: string; endTime: string }
  >({
    mutationFn: async ({ chatRoomId, title, startTime, endTime }) =>
      await getAINote(chatRoomId, title, startTime, endTime),
  });

  const handleRunAI = () => {
    fetchAINote({
      chatRoomId,
      title,
      startTime,
      endTime,
    });
    setIsRunAI(true);
  };

  useEffect(() => {
    console.log(" AI 회의록 데이터:", AINote);
  }, [AINote]);

  return (
    <>
      {!isRunAI ? (
        <div className="w-[380px] h-[364px] bg-white px-[50px] py-[30px]">
          <div className="flex justify-center">
            <span className="text-[16px] font-bold text-main-green">
              회의록
            </span>
          </div>
          <div className="flex flex-col mb-[20px] gap-[5px]">
            <span className="text-[16px] font-bold text-main-green">
              회의록 제목
            </span>
            <input
              type="text"
              className="w-full h-[27px] border border-gray01 rounded-[2px] text-[14px] font-bold text-main-green text-center focus:outline-none"
              placeholder="제목을 작성해주세요"
              onChange={handleChange}
            ></input>
          </div>
          <div className="mb-[20px]">
            <span className="text-[16px] font-bold text-main-green">
              회의 시간 설정
              <div className="relative z-40">
                <DateTimeSelect
                  title="시작"
                  selectedDate={selectedStartDate}
                  setSelectedDate={setSelectedStartDate}
                />
              </div>
              <div className="relative z-0">
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
          <CreateAINoteModal
            onClose={onClose}
            AINote={AINote}
            title={title}
            isLoading={isPending}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            AINoteList={AINoteList}
            refetchAINoteList={refetchAINoteList}
          />
        </div>
      )}
    </>
  );
};

export default CreateNotePeriodModal;
