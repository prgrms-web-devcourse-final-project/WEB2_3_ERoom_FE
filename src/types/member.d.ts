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

interface SelectMembersProps {
  data: MembersType[];
  selectedData?: MembersType[];
}
