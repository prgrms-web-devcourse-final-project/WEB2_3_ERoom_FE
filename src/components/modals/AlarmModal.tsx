import { useEffect, useState } from "react";
import AlarmBox from "../AlamModal/AlarmBox";
import Button from "../common/Button";
import { dummy } from "../../dummyData/dummy";
import useWebSocketStore from "../../store/useWebSocketStore";

const AlarmModal = ({ onClose }: AlarmModalProps) => {
  // 임시 더미 알람 데이터
  const [dummyAlarms, setDummyAlarms] = useState(dummy.alarmData);

  const handleRemoveAllAlarm = () => {
    setDummyAlarms([]);
  };

  const handleRemoveSpecificAlarm = (id: number) => {
    setDummyAlarms((prevAlarms) =>
      prevAlarms.filter((alarm) => alarm.id !== id)
    );
  };

  // 웹소켓을 통해 가져온 알람 데이터
  const { notifications } = useWebSocketStore();
  useEffect(() => {
    console.log("알람데이터", notifications);
  }, []);

  return (
    <div
      className="flex flex-col w-[321px] h-[499px] rounded-[10px] 
      pt-[30px] px-[30px] gap-[30px] bg-white drop-shadow-[0_0px_15px_rgba(0,0,0,0.6)]"
    >
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
          {/* 알림 데이터에 맞게 props 및 AlarmBox 컴포넌트 수정 필요 */}
          {notifications.length > 0 ? (
            notifications.map((alarm, index) => (
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
