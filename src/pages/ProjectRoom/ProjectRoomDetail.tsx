import Button from "../../components/common/Button";
import TaskList from "../../components/Task/AllTaskList";
// import newTaskIcon from "../../assets/icons/newTaskIcon.svg";

const ProjectRoomDetail = () => {
  return (
    <div
      className="h-screen ml-[130px] px-10 pt-5"
      style={{ width: "calc(100% - 130px)" }}
    >
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-[22px]">프로젝트 명</h1>
        <Button
          text="+ 업무 생성"
          size="md"
          css="bg-transparent border-main-green01 
          text-main-green01 text-[14px]"
        />
      </div>

      {/* 업무 리스트 */}
      <div className="flex gap-10">
        <TaskList name="진행 중" />
        <TaskList name="진행 예정" />
        <TaskList name="진행 완료" />
        <TaskList name="보류" />
        <TaskList name="철회" />
      </div>
    </div>
  );
};

export default ProjectRoomDetail;
