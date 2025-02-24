import { api } from "./api";

export const postSignIn = async (email: string, password: string) => {
  try {
    return (await api.post(`/api/login`, { email, password })).data;
  } catch (error) {
    throw new Error(`로그인 실패! ${error}`);
  }
};
