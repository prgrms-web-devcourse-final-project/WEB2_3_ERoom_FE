import { useState } from "react";
import AlarmBox from "../AlamModal/AlarmBox";
import Button from "../common/Button";

interface AlarmModalProps {
  onClose: () => void;
}

const AlarmModal = ({ onClose }: AlarmModalProps) => {
  // 임시 더미 알람 데이터
  const [dummyAlarms, setDummyAlarms] = useState([
    {
      id: 1,
      theme: "message" as const,
      project: "최종 프로젝트",
    },
    {
      id: 2,
      theme: "newTask" as const,
      project: "최종 프로젝트",
      task: "UI 디자인 수정",
    },
    { id: 3, theme: "newProject" as const, project: "최종 프로젝트" },
    { id: 4, theme: "endProject" as const, project: "최종 프로젝트" },
    {
      id: 5,
      theme: "message" as const,
      project: "최종 프로젝트",
    },
    {
      id: 6,
      theme: "newTask" as const,
      project: "최종 프로젝트",
      task: "UI 디자인 수정",
    },
    { id: 7, theme: "newProject" as const, project: "최종 프로젝트" },
    { id: 8, theme: "endProject" as const, project: "최종 프로젝트" },
  ]);

  const handleRemoveAllAlarm = () => {
    setDummyAlarms([]);
  };

  const handleRemoveSpecificAlarm = (id: number) => {
    setDummyAlarms((prevAlarms) =>
      prevAlarms.filter((alarm) => alarm.id !== id)
    );
  };

  return (
    <div className="flex flex-col w-[321px] h-[499px] rounded-[10px] pt-[30px] px-[30px] gap-[30px] bg-white">
      <div className="flex justify-center">
        <span className="text-center text-main-green text-[18px] font-bold">
          NOTIFICATIONS
        </span>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-end">
          <Button
            text="모두읽기"
            size="sm"
            onClick={handleRemoveAllAlarm}
            css="bg-white border-logo-green text-logo-green "
          />
        </div>
        <div className="flex flex-col w-full h-[300px] gap-[10px] overflow-y-auto scrollbar-none">
          {dummyAlarms.length > 0 ? (
            dummyAlarms.map((alarm, index) => (
              <AlarmBox
                key={index}
                theme={alarm.theme}
                project={alarm.project}
                task={
                  ["newTask"].includes(alarm.theme)
                    ? alarm.task ?? undefined
                    : undefined
                }
                onRemove={() => handleRemoveSpecificAlarm(alarm.id)}
              />
            ))
          ) : (
            <span className="text-center text-main-green text-[12px]">
              새로운 알람이 없습니다
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="닫기"
          size="sm"
          onClick={onClose}
          css="bg-[#2B3E34] border-none text-main-beige01 font-bold text-[12px]"
        />
      </div>
    </div>
  );
};

export default AlarmModal;
