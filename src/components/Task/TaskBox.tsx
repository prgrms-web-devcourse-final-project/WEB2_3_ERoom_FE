import Button from "../common/Button";
import ParticipantIcon from "../common/ParticipantIcon";

interface TaskBoxProps {
  isAll?: boolean;
}

const TaskBox = ({ isAll = true }: TaskBoxProps) => {
  // 전체 업무 박스
  if (isAll) {
    return (
      <div
        className="w-[320px] h-[120px] bg-white border border-main-green01 
      px-3 py-2 flex flex-col justify-center gap-2"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">업무명</p>
          <p className="text-[12px] font-medium">진행 중</p>
        </div>

        {/* 기간, 업무완료,시잔 버튼 */}
        <div className="flex justify-between items-center">
          <p className="text-[12px]">2025.02.12 ~ 2025.02.12</p>
          {/* <Button
            text={"업무완료"}
            size="md"
            css="border-none h-[22px] w-[70px] font-normal text-[14px] rounded-[4px] text-main-beige01 bg-main-green01"
          /> */}

          {/* 업무시작 버튼 */}
          <Button
            text={"업무시작"}
            size="md"
            css="border-main-green01 h-[22px] w-[70px] font-normal text-[14px] rounded-[4px] text-main-green01 bg-main-green02"
          />
        </div>

        {/* 담당자 */}
        <div
          className="w-full h-[30px] bg-gradient-to-b from-white to-main-green02 rounded-full
        flex justify-start items-center gap-2"
        >
          <ParticipantIcon />
          <p className="font-medium text-main-green">박선형</p>
        </div>
      </div>
    );
  } else {
    // 개인 업무박스
    return (
      <div
        className="w-[300px] h-[80px] bg-white border border-main-green02 
  px-3 py-2 flex flex-col justify-center gap-2"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">업무명</p>
          <p className="text-[12px] font-medium">진행 중</p>
        </div>

        {/* 기간, 업무완료,시잔 버튼 */}
        <div className="flex justify-between items-center">
          <p className="text-[12px]">2025.02.12 ~ 2025.02.12</p>
          <Button
            text={"업무완료"}
            size="md"
            css="border-none h-[22px] w-[70px] font-normal text-[14px] rounded-[4px] text-main-beige01 bg-main-green01"
          />
        </div>
      </div>
    );
  }
};

export default TaskBox;
