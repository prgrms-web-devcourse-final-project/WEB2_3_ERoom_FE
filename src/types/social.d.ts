interface SocialUser {
  email: string;
  password: string;
}

interface signInData {
  accessToken: string | null;
  refreshToken: string | null;
  member: {
    id: number;
    username: string;
    email: string;
    password: string;
    organization: string;
    memberGrade: string;
    profile: string;
    createdAt: string;
    deleteStatus: string;
  } | null;
  idToken: string | null;
  registered: boolean;
}
