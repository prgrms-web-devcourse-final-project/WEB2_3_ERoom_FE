interface EditProjectModalProps {
  projectId?: number;
  selectedProject?: ProjectListType;
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

//getProjectList API 반환값 타입 지정 (멤버이름, 프로필 객체로 수정될 예정)
interface ProjectType {
  id: number;
  name: string;
  createdAt: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  memberNames: string[];
  memberProfiles: (string | null)[];
  chatRoomId: number;
  progressRate: number;
}

//postProject API 타입 지정
interface postProjectType {
  name: string;
  description?: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  invitedMemberIds: number[];
}

// getProjectById API 타입 지정
interface ProjectDetailType {
  id: number;
  name: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  memberIds: number[];
  memberNames: string[];
  memberProfiles: (string | null)[];
}

//patchProjectById  입력값 타입 지정
interface patchProjectRequestType {
  name: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED";
  memberIds: number[];
}

//patchProjectById 반환값 타입 지정
interface patchProjectResponseType {
  id: number;
  name: string;
  createdAt: string;
  category: string;
  subCategories1: string[];
  subCategories2: string[];
  startDate: string;
  endDate: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
  memberNames: string[];
  memberProfiles: (string | null)[];
  chatRoomId: number;
  progressRate: number;
}

//프로젝트 검색 api 반환값 타입 지정
interface ProjectSearchResult {
  id: number;
  name: string;
  creator: string;
  status: "BEFORE_START" | "IN_PROGRESS" | "COMPLETED" | "HOLD";
}
