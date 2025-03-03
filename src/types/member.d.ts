interface MembersType {
  id: number;
  username: string;
  email: string;
  password: string;
  grade: string;
  organization: string;
  profileImage?: string;
  delete: string;
}

interface SearchMemberType {
  id: number;
  username: string;
  email: string;
  profile: string | null;
  organization: string | null;
  createdAt: string;
  deleteStatus: string;
}

interface MemberType {
  username: string;
  profile: string | null;
  email?: string;
  memberId: number;
}

interface SelectMembersProps {
  selectedData?: UpdateTask | ProjectListType;
  selectedMembers?: MemberType[];
  setSelectedMembers?: React.Dispatch<React.SetStateAction<selectedMembers>>;
  value: string;
}
