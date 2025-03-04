import { useAuthStore } from "../store/authStore";
import { api } from "./api";

export const postSignIn = async (email: string, password: string) => {
  try {
    return (await api.post(`/api/login`, { email, password })).data;
  } catch (error) {
    throw new Error(`로그인 실패! ${error}`);
  }
};

export const googleSignIn = async (
  token: string,
  provider: string
): Promise<signInData> => {
  try {
    const response = await api.post(`/api/auth/login`, { token, provider });
    const { accessToken, member } = response.data;

    useAuthStore.getState().login(accessToken, member);

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(`로그인 실패! ${error}`);
  }
};
