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
interface Task {
  taskId: number;
  title: string;
  startDate: string; // ISO 형식의 날짜 문자열로 취급
  endDate: string; // ISO 형식의 날짜 문자열로 취급
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD"; // 상태값이 정해져 있을 경우 문자열 리터럴 타입을 사용
  assignedMemberName: string;
  assignedMemberProfile: string; // URL 형식으로 처리
  participants: string[]; // 참가자는 문자열 배열로 처리
}

interface ManageTasksType {
  name: string;
  tasks: Task[];
}
