import { useSearchParams } from "react-router";
import Button from "../../components/common/Button";
import TaskList from "../../components/Task/TaskList";
import { useEffect, useState } from "react";
// import newTaskIcon from "../../assets/icons/newTaskIcon.svg";

const ProjectRoomDetail = () => {
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get("category"));

  useEffect(() => {
    console.log(searchParams.get("category"));
    setCategory(searchParams.get("category"));
  }, [searchParams.get("category")]);

  return (
    <div className="min-h-screen ml-[130px] px-10 pt-5 bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0 ">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-[25px]">
        <h1 className="font-bold text-[22px]">프로젝트 명</h1>
        <Button
          text="+ 업무 생성"
          size="md"
          css="bg-transparent border-main-green01 
          text-main-green01 text-[14px]"
        />
      </div>

      {/* 업무 리스트 */}
      {(category === "all" || !category) && (
        <div className="flex gap-10 overflow-x-scroll min-h-[calc(100vh-200px)]">
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
        <div className="flex gap-10">
          <TaskList name="박선형" isAll={false} />
          <TaskList name="한규혁" isAll={false} />
          <TaskList name="성송원" isAll={false} />
        </div>
      )}
    </div>
  );
};

export default ProjectRoomDetail;
