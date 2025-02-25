// 임시
interface TaskType {
  taskId: number;
  title: string;
  startDate: string;
  endDate: string;
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD";
  assignedMemberName: string;
}

interface ProjectDetailListType {
  projectId: number;
  projectName: string;
  tasks: Task[];
}

interface Task {
  assignedMemberName: string;
  assignedMemberProfile: string;
  endDate: string;
  participants: string[];
  startDate: string;
  status: "IN_PROGRESS" | "COMPLETED" | "BEFORE_START" | "HOLD";
  taskId: number;
  title: string;
}
