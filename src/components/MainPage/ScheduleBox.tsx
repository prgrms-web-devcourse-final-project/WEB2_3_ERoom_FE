import { useQuery } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { getProjectDetail } from "../../api/project";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

interface ScheduleBoxProps {
  task: GetAssignedTask;
  currentTime: string;
}

const ScheduleBox = ({ task, currentTime }: ScheduleBoxProps) => {
  const navigate = useNavigate();
  const [isDeadline, setIsDeadline] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<string>("");

  // 마감 시간 포맷
  const endTime = task.endDate
    .split("T")
    .pop()
    ?.split(":")
    .slice(0, 2)
    .join(":");

  // 현재 시간에 현재 날짜를 결합하여 dayjs에서 인식할 수 있는 형식으로 변환
  const now = dayjs();
  const fullCurrentTime = now.format("YYYY-MM-DD") + "T" + currentTime;

  // 남은 시간 계산
  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentDayjs = dayjs(fullCurrentTime); // currentTime을 fullCurrentTime으로 변환
      const end = dayjs(task.endDate);
      const diff = end.diff(currentDayjs);

      // 남은 시간이 1시간 이내라면 데드라인 상태로 변경
      setIsDeadline(diff > 0 && diff < 1000 * 60 * 60);

      if (diff <= 0) {
        setRemainingTime("마감됨");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      if (hours > 0) {
        setRemainingTime(`${hours}시간 ${minutes}분 남음`);
      } else if (hours === 0 && minutes > 0) {
        setRemainingTime(`${minutes}분 남음`);
      } else if (hours === 0 && minutes === 0) {
        setRemainingTime(`${seconds}초 남음`);
      }
    };

    calculateRemainingTime(); // currentTime이 변경될 때마다 실행
  }, [fullCurrentTime, task.endDate]);

  // 프로젝트 정보 불러오기
  const { data: projectDetail } = useQuery<ProjectDetailType>({
    queryKey: ["ProjectDetail"],
    queryFn: async () => {
      const response = await getProjectDetail(task.projectId);
      return response;
    },
  });

  // 프로젝트명
  const projectName = projectDetail?.projectName;

  return (
    <div
      className={twMerge(
        `w-full h-[110px] flex flex-col justify-around flex-shrink-0 text-main-green01
          items-center px-3 pb-2 bg-main-green02 cursor-pointer rounded-[10px]
          ${isDeadline && "bg-[#FF6854] text-white"}`
      )}
      onClick={() => navigate(`/project-room/${task.projectId}`)}
    >
      {/* 마감시간, 남은시간 */}
      <div>
        <div className="flex items-center gap-4 text-[30px] ">
          <p className="w-[100px] text-center">{endTime}</p>

          <p className="w-[120px] text-[14px]">{remainingTime}</p>
        </div>
      </div>

      {/* 업무명, 프로젝트 명 */}
      <div className="w-full py-1 px-2 shadow-2xl bg-white/25 rounded-[5px]">
        <p className="font-bold">{task.title}</p>
        <p className="font-extralight">{projectName}</p>
      </div>
    </div>
  );
};

export default ScheduleBox;
