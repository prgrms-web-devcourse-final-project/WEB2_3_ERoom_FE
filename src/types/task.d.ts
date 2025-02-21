interface UpdateTaskModalProps {
  task: {
    id: number;
    name: string;
    memberId: number;
    memberName: string;
    startDate: string;
    endDate: string;
  };
  onClose: () => void;
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
  taskInfo: TaskType[];
}

interface TaskBoxProps {
  isAll?: boolean;
  onClick: () => void;
  task: TaskType;
}

interface AllTasksType {
  IN_PROGRESS: TaskType[];
  COMPLETED: TaskType[];
  BEFORE_START: TaskType[];
  HOLD: TaskType[];
}
