interface AccountListProps {
  id: number;
  email: string;
  name: string;
  registeredDate: string;
  profileImage: string;
  organization: string;
  isSubscribed: boolean;
  isActive: boolean;
}

interface ProjectsListType {
  id: number;
  projectName: string;
  projectStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  tag1: string;
  tag2: string;
  tag3: string;
  isActive: boolean;
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
