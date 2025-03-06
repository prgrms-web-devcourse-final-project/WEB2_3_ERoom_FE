import { useQuery } from "@tanstack/react-query";
import { PROGRESS_STATUS } from "../../constants/status";
import Button from "../common/Button";
import ParticipantIcon from "../common/ParticipantIcon";
import { getTaskById } from "../../api/task";
import { useAuthStore } from "../../store/authStore";
import defaultImg from "../../assets/defaultImg.svg";

const TaskBox = ({ isAll = true, onClick, task, onUpdate }: TaskBoxProps) => {
  const { member } = useAuthStore();

  // 업무 수정 상세보기
  const { data: updatedData } = useQuery<GetUpdateTask>({
    queryKey: ["UpdatedData", task.taskId],
    queryFn: async () => {
      return await getTaskById(task.taskId);
    },
  });

  // console.log(updatedData);
  // console.log(task);
  // console.log(updatedData);
  // console.log(task);

  /* 시작버튼 클릭 -> 진행 중 상태 변경 함수 */
  const handleStateStart = () => {
    if (!updatedData) return; // undefined 체크

    const { id, participantProfiles, ...dataWithoutId } = updatedData; // id 및 participantProfiles 제외
    const dataChange: UpdateTask = {
      ...dataWithoutId,
      status: "IN_PROGRESS" as const,
    }; // as const 추가

    if (onUpdate) onUpdate(task.taskId, dataChange);
  };

  /* 완료버튼 클릭 -> 진행 완료 상태 변경 함수 */
  const handleCompleteStart = () => {
    if (!updatedData) return; // undefined 체크

    const { id, participantProfiles, ...dataWithoutId } = updatedData; // id 및 participantProfiles 제외
    const dataChange: UpdateTask = {
      ...dataWithoutId,
      status: "COMPLETED" as const,
    }; // as const 추가

    if (onUpdate) onUpdate(task.taskId, dataChange);
  };

  // 전체 업무 박스
  if (isAll && updatedData) {
    return (
      <div
        className={`w-[320px] h-[120px] bg-white border border-main-green02
        px-3 py-2 flex flex-col justify-center gap-2 ${
          task.assignedMemberName === member?.username &&
          "cursor-pointer transition-transform duration-500  hover:scale-105 hover:border-[3px] hover:border-main-green01 hover:rounded-[10px]"
        } 
        `}
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
            {updatedData &&
              `${updatedData.startDate.split("T")[0]} ~ ${
                updatedData.endDate.split("T")[0]
              }`}
          </p>
          {task.assignedMemberName === member?.username &&
            (task.status !== "IN_PROGRESS" ? (
              <Button
                text={"시작"}
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStateStart();
                }}
                css="border-main-green01 h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-green01 bg-main-green02"
              />
            ) : (
              <Button
                text={"완료"}
                size="md"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteStart();
                }}
                css="border-none h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-beige01 bg-main-green01"
              />
            ))}
        </div>

        {/* 담당자 */}
        <div
          className="w-full h-[30px] bg-gradient-to-b from-white to-main-green02 rounded-full
          flex justify-start items-center gap-2"
        >
          <ParticipantIcon
            css="w-[30px] h-[30px]"
            imgSrc={
              updatedData?.participantProfiles
                ? updatedData?.participantProfiles[0]
                : defaultImg
            }
          />

          <p className="font-medium text-main-green">
            {task.assignedMemberName}
          </p>
        </div>
      </div>
    );
  } else {
    // 개인 업무박스
    /* 로그인 유저의 업무인지 확인하여 편집가능하게 해야 함 */
    return (
      <div
        className={`w-[300px] h-[80px] bg-white border border-main-green02
        px-3 py-2 flex flex-col justify-center gap-2 ${
          task.assignedMemberName === member?.username &&
          "cursor-pointer transition-transform duration-500 hover:scale-105 hover:border-[3px] hover:border-main-green01 hover:rounded-[10px]"
        } 
        `}
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          {/* 업무명 */}
          <p className="font-bold">{task.title}</p>

          {/* 진행상태 */}
          <p className="text-[12px] font-medium">
            {PROGRESS_STATUS[task.status]}
          </p>
        </div>

        {/* 기간, 업무 완료/시작 버튼 */}
        <div className="flex justify-between items-center">
          <p className="text-[12px]">
            {task.startDate.split("T").slice(0, 1)} ~{" "}
            {task.endDate.split("T").slice(0, 1)}
          </p>
          {task.assignedMemberName === member?.username &&
            (task.status !== "IN_PROGRESS" ? (
              <Button
                text={"시작"}
                size="md"
                css="border-main-green01 h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-green01 bg-main-green02"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStateStart();
                }}
              />
            ) : (
              <Button
                text={"완료"}
                size="md"
                css="border-none h-[22px] w-fit px-[10px] py-[2px] font-normal text-[14px] rounded-[4px] text-main-beige01 bg-main-green01"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompleteStart();
                }}
              />
            ))}
        </div>
      </div>
    );
  }
};

export default TaskBox;
