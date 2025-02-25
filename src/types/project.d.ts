interface EditProjectModalProps {
  selectedData?: ProjectListType;
  setIsEditProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

interface selectedProjectData {
  projectName: string;
  projectStatus: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  cate: string;
  subcate1: string[];
  subcate2: string[];
}

interface AllProjectOutModalProps {
  setIsAllProjectOutModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ProjectListBoxProps {
  projectId: number;
  filterProject: string;
  projectInfo: ProjectListType;
  idx: number;
}

interface ProjectDataType {
  name?: string;
  startDate?: string;
  endDate?: string;
}

interface SelectProjectProps {
  data: ProjectDataType[];
}

interface WriteProjectNameType {
  value: string;
  name?: string;
  newProjectNameValue?: string;
  setNewProjectNameValue?: React.Dispatch<React.SetStateAction<string>>;
}
