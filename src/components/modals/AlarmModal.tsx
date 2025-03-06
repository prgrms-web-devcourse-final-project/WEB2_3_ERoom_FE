import { useEffect } from "react";
import AlarmBox from "../AlamModal/AlarmBox";
import Button from "../common/Button";

const AlarmModal = ({
  onClose,
  allAlarms,
  readAllAlarms,
  onRemove,
}: AlarmModalProps) => {
  // 알람목록 확인용 (추후 지우기)
  useEffect(() => {
    console.log("알람 목록", allAlarms);
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
            css="bg-white border-logo-green text-logo-green "
            onClick={readAllAlarms}
          />
        </div>
        <div className="flex flex-col w-full h-[300px] gap-[10px] overflow-y-auto scrollbar-none">
          {allAlarms && allAlarms.length > 0 ? (
            [...allAlarms]
              .sort((a, b) => b.id - a.id) // id 내림차순 정렬 (큰 값이 먼저)
              .map((alarm) => (
                <AlarmBox
                  key={alarm.id}
                  id={alarm.id}
                  theme={alarm.type}
                  project={alarm.referenceName}
                  projectId={alarm.referenceId}
                  onRemove={() => onRemove(alarm.id)}
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
