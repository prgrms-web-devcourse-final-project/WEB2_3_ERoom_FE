interface MembersType {
  id: number;
  userName: string;
  email: string;
  password: string;
  grade: string;
  organization: string;
  profileImage: string;
  delete: string;
}

interface MemberType {
  username: string;
  profile: string;
  email?: string;
  id: number;
}

interface SelectMembersProps {
  selectedData?: UpdateTask | ProjectListType;
  selectedMembers?: MemberType[];
  setSelectedMembers?: React.Dispatch<React.SetStateAction<selectedMembers>>;
  value: string;
}
