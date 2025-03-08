interface TotalMember {
  startDate: string; // "YYYY-MM-DD" 형식의 날짜
  totalMembers: number;
}

interface NewMember {
  date: string; // "YYYY-MM-DD" 형식의 날짜
  newMembers: number;
}

interface DashboardType {
  totalMembers: TotalMember[];
  newMembers: NewMember[];
}

interface AccountListProps {
  memberId: number;
  email: string;
  username: string;
  createdAt: string;
  profile: string | null;
  organization: string | null;
}

interface EditAccountType {
  name: string;
}

interface AdminProjectsListType {
  projectId: number;
  projectName: string;
  assignedEmail: string;
  projectStatus: string;
  startDate: string;
  endDate: string;
  createAt: string;
}
interface ChartProps {
  data: number[];
  labelTitle: string;
  label: string[];
}

interface PaginationProps {
  totalPages: number;
  onPageChange: (selectedPage: number) => void;
  menu?: string;
}

interface ProgressStatusBoxProps {
  width?: string;
  height?: string;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}
