import { useState } from "react";
import Button from "../common/Button";
import DateTimeSelect from "../EditProjectModal/DateTimeSelect";
import WriteProjectName from "../EditProjectModal/WriteProjectName";
import SelectMember from "../EditProjectModal/SelectMember";

const CreateTaskModal = ({ onClose }: CreateTaskProps) => {
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

  // 작성한 업무명 상태
  const [newTaskName, setNewTaskName] = useState<string>("");

  // 선택한 팀원 상태
  const [selectedMember, setSelectedMember] = useState<MemberType[]>([]);

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
