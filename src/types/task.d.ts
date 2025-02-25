interface UpdateTaskModalProps {
  task: Task;
  onClose: () => void;
  value: string;
}

interface selectedDateType {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  ampm: string;
}

interface CreateTaskProps {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TaskListProps {
  name: string;
  isAll?: boolean;
  taskInfo: Task[];
}

interface TaskBoxProps {
  isAll?: boolean;
  onClick: () => void;
  task: Task;
}

interface AllTasksType {
  IN_PROGRESS: Task[];
  COMPLETED: Task[];
  BEFORE_START: Task[];
  HOLD: Task[];
}
