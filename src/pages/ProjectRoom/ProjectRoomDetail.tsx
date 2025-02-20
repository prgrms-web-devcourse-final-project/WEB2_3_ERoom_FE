import { useParams, useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import TaskList from "../../components/Task/TaskList";
import { useEffect, useState } from "react";
import MeetingRoomChatBox from "../../components/MeetingRoom/MeetingRoomChatBox";
import CreateTaskModal from "../../components/modals/CreateTaskModal";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../../utils/api/getProjectDetail";
// import newTaskIcon from "../../assets/icons/newTaskIcon.svg";

const ProjectRoomDetail = () => {
  const { projectId } = useParams();
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));
  const [isCreateTask, setIsCreateTask] = useState(false);

  console.log(projectId);

  const { data, isLoading } = useQuery({
    queryKey: ["ProjectDetail"],
    queryFn: () => getProjectDetail(projectId!),
  });

  useEffect(() => {
    console.log(data, isLoading);
  }, [data]);

  const handleCreateTaskModal = () => {
    setIsCreateTask((prev) => !prev);
  };

  useEffect(() => {
    console.log(searchParams.get("category"));
    setCategory(searchParams.get("category"));
  }, [searchParams.get("category")]);

  return (
    <div className="min-h-[calc(100vh-50px)] px-10 pt-5 bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0 max-w-[calc(100vw-155px)]">
      {category === "meeting" ? (
        <div className="flex flex-col gap-10 w-full min-h-[calc(100vh-60px)] bg-white/60 ">
          <MeetingRoomChatBox css="pb-[30px]" />
        </div>
      ) : (
        <>
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-[25px]">
            <h1 className="font-bold text-[22px]">프로젝트 명</h1>
            <Button
              text="+ 업무 생성"
              size="md"
              css="bg-transparent border-main-green01 
          text-main-green01 text-[14px]"
              onClick={handleCreateTaskModal}
            />
          </div>
          {/* 업무 리스트 */}
          {(category === "all" || !category) && (
            <div className="flex gap-10 min-h-[calc(100vh-150px)] w-full overflow-x-scroll">
              <TaskList name="진행 중" />
              <TaskList name="진행 예정" />
              <TaskList name="진행 완료" />
              <TaskList name="보류" />
              <TaskList name="철회" />
              <TaskList name="철회" />
              <TaskList name="철회" />
              <TaskList name="철회" />
              <TaskList name="철회" />
              <TaskList name="철회" />
            </div>
          )}
          {category === "manager" && (
            <div className="flex gap-10 min-h-[calc(100vh-150px)] w-full overflow-x-scroll">
              <TaskList name="박선형" isAll={false} />
              <TaskList name="한규혁" isAll={false} />
              <TaskList name="성송원" isAll={false} />
              <TaskList name="성송원" isAll={false} />
              <TaskList name="성송원" isAll={false} />
              <TaskList name="성송원" isAll={false} />
              <TaskList name="성송원" isAll={false} />
            </div>
          )}
        </>
      )}
      {isCreateTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <CreateTaskModal onClose={handleCreateTaskModal} />
        </div>
      )}
    </div>
  );
};

export default ProjectRoomDetail;
