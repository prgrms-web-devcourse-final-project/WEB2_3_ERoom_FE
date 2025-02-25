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
  members: {
    id: number;
    username: string;
    email: string;
    profile: string;
  }[];
}
