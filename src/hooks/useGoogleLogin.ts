import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { googleSignIn } from "../api/auth";
import getAccessToken from "../utils/signInGoogle/getAccessToken";
import { useAuthStore } from "../store/authStore";

const useGoogleLogin = () => {
  const [idTokenData, setIdTokenData] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태 추가
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;
  const REDIRECT_URI =
    window.location.hostname === "localhost"
      ? "http://localhost:5173/signin"
      : "https://errom.netlify.app/signin";
  const SCOPE = import.meta.env.VITE_GOOGLE_SCOPE;

  const handleGoogleLogin = () => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&access_type=offline&prompt=consent`;
    window.location.href = googleOAuthUrl;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("code")) {
      handleGoogleCallback(queryParams);
    }
  }, []);

  const handleGoogleCallback = async (queryParams: URLSearchParams) => {
    const code = queryParams.get("code");

    if (code) {
      setIsLoading(true); // 로딩 시작
      try {
        const tokenResponse = await getAccessToken(code);
        setIdTokenData(tokenResponse.id_token);
      } catch (error: any) {
        console.error("구글 로그인 실패:", error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }
  };

  useEffect(() => {
    if (idTokenData) {
      handleLogin(idTokenData);
    }
  }, [idTokenData]);

  const handleLogin = (idToken: string) => {
    if (!idToken) return alert("ID 토큰이 없습니다!");
    useAuthStore.getState().login(idToken, null, null, null);
    googleLoginMutation(idToken);
  };

  const { mutateAsync: googleLoginMutation, status } = useMutation({
    mutationFn: async (idToken: string) => {
      return await googleSignIn(idToken, "google");
    },
    onSuccess: (data: any) => {
      if (data.registered === false) {
        navigate(`/signup-company-info`);
      } else {
        login(data.idToken, data.accessToken, data.refreshToken, data.member);
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("로그인 실패!:", error);
    },
  });

  // 로그인 중 로딩 상태도 관리 (status === 'loading')
  const isLoginLoading = status === "pending" || isLoading;

  return { handleGoogleLogin, isLoginLoading };
};

export default useGoogleLogin;
