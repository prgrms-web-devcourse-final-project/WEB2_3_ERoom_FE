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

interface MemberType {
  username: string;
  profile: string;
  email?: string;
  id: number;
}

interface SelectMembersProps {
  selectedData?: Task | ProjectListType;
  selectedMembers?: MemberType[];
  setSelectedMembers?: React.Dispatch<React.SetStateAction<selectedMembers>>;
  value: string;
}
