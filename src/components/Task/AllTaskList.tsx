import TaskBox from "./TaskBox";

interface TaskListProps {
  name: string;
}

const TaskList = ({ name }: TaskListProps) => {
  return (
    <div className="flex flex-col gap-4 items-center bg-red-50 px-2 py-1">
      <h1 className="font-bold text-main-green text-[22px]">{name}</h1>
      <TaskBox isAll={false} />
      <TaskBox />
      <TaskBox />
      <TaskBox />
      <TaskBox />
      <TaskBox />
      <TaskBox />
    </div>
  );
};

export default TaskList;
