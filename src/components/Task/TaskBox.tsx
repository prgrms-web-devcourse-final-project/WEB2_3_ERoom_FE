import { useQuery } from "@tanstack/react-query";
import { PROGRESS_STATUS } from "../../constants/status";
import Button from "../common/Button";
import ParticipantIcon from "../common/ParticipantIcon";
import { getTaskById } from "../../api/task";

const TaskBox = ({ isAll = true, onClick, task }: TaskBoxProps) => {
  const { data: updatedData, isLoading } = useQuery<GetUpdateTask>({
    queryKey: ["UpdatedData", task.taskId],
    queryFn: async () => {
      return await getTaskById(task.taskId);
    },
  });

  // console.log(updatedData, isLoading);
  // console.log(task);

  // 전체 업무 박스
  if (isAll && updatedData) {
    return (
      <div
        className="w-[320px] h-[120px] bg-white border border-main-green02
        px-3 py-2 flex flex-col justify-center gap-2 cursor-pointer"
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">{task?.title}</p>
          <p className="text-[12px] font-medium">
            {PROGRESS_STATUS[updatedData.status]}
          </p>
        </div>

        {/* 기간, 업무완료,시잔 버튼 */}
        <div className="flex justify-between items-center">
          <p className="text-[12px]">
            {updatedData.startDate.split("T")[0]} ~{" "}
            {updatedData.endDate.split("T")[0]}
          </p>
          {task.status !== "IN_PROGRESS" ? (
            <Button
              text={"시작"}
              size="md"
              css="border-main-green01 h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-green01 bg-main-green02"
            />
          ) : (
            <Button
              text={"완료"}
              size="md"
              css="border-none h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-beige01 bg-main-green01"
            />
          )}
        </div>

        {/* 담당자 */}
        <div
          className="w-full h-[30px] bg-gradient-to-b from-white to-main-green02 rounded-full
        flex justify-start items-center gap-2"
        >
          <ParticipantIcon
            css="w-[30px] h-[30px]"
            imgSrc={updatedData?.participantProfiles[0]}
          />
          <p className="font-medium text-main-green">
            {updatedData.assignedMemberId}
          </p>
        </div>
      </div>
    );
  } else {
    // 개인 업무박스
    /* 로그인 유저의 업무인지 확인하여 편집가능하게 해야 함 */
    return (
      <div
        className="w-[300px] h-[80px] bg-white border border-main-green02 
        px-3 py-2 flex flex-col justify-center gap-2"
      >
        <div className="flex justify-between items-center">
          <p className="font-bold">{task.title}</p>
          <p className="text-[12px] font-medium">
            {PROGRESS_STATUS[task.status]}
          </p>
        </div>

        {/* 기간, 업무완료,시잔 버튼 */}
        <div className="flex justify-between items-center">
          <p className="text-[12px]">
            {task.startDate.split("T")[0]} ~ {task.endDate.split("T")[0]}
          </p>
          {task.status !== "IN_PROGRESS" ? (
            <Button
              text={"시작"}
              size="md"
              css="border-main-green01 h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-green01 bg-main-green02"
            />
          ) : (
            <Button
              text={"완료"}
              size="md"
              css="border-none h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-beige01 bg-main-green01"
            />
          )}
        </div>
      </div>
    );
  }
};

export default TaskBox;
