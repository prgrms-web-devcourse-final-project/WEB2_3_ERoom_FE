import { useEffect, useState } from "react";
import socials from "../constants/socialLogin";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useAuthStore } from "../store/authStore";
import { postSignIn } from "../api/auth";

const useKakaoLogin = (isRedirect?: boolean) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<SocialUser | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const handleKakaoLogin = () => (window.location.href = socials.KAKAO_URL); //kakaoURL로 이동
  const [_, setCookie] = useCookies(["token"]);

  // 자동 로그인
  useEffect(() => {
    if (!user) return;
    setLoading(true);

    // 1. 회원가입
    const handleSignUp = async () => {
      return await postSignUp(user); // 회원가입 API 필요..
    };
    handleSignUp();

    // 2. 회원가입이 되어있거나 회원가입 후 로그인
    const handleSignIn = async () => {
      try {
        const { email, password } = user;
        // 로그인 API도 필요..
        const data = await postSignIn({
          email,
          password,
        });
        if (data) {
          login(data.user, data.token);
          setCookie("token", data.token);
          navigate("/");
        }
      } catch (err) {
        alert("로그인에 실패했습니다");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    setTimeout(() => {
      handleSignIn();
      // 회원가입 후 바로 로그인하면 에러나서 텀을 줘야함
    }, 1300);
  }, [user]);
  return {
    handleKakaoLogin,
    setUser,
    loading,
  };
};

export default useKakaoLogin;
