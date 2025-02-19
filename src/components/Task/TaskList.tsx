import TaskBox from "./TaskBox";

interface TaskListProps {
  name: string;
  isAll?: boolean;
}

const TaskList = ({ name, isAll = true }: TaskListProps) => {
  return (
    <div
      className={`flex flex-col gap-4 items-center px-2 py-1 ${
        !isAll ? "bg-white/60" : ""
      }`}
    >
      <h1 className="font-bold text-main-green text-[22px]">{name}</h1>
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
      <TaskBox isAll={isAll} />
    </div>
  );
};

export default TaskList;
