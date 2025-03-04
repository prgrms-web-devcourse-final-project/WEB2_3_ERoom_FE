import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import KakaoLogo from "../assets/kakao_logo.svg";
import GoogleLogo from "../assets/google_logo.svg";
import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router";
import { postSignIn } from "../api/auth";
import useKakaoLogin from "../hooks/useKakaoLogin";
import getAccessToken from "../utils/signInGoogle/getAccessToken";
import getUserInfo from "../utils/signInGoogle/getUserInfo";
import { useEffect, useState } from "react";

const SignIn = () => {
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  // const { handleKakaoLogin, loading } = useKakaoLogin();

  /* 구글 로그인(미완성) */
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_ID;
  const REDIRECT_URI = "http://localhost:5173/signin";
  const SCOPE = import.meta.env.VITE_GOOGLE_SCOPE;

  const handleGoogleLogin = () => {
    const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&access_type=offline&prompt=consent`;

    window.location.href = googleOAuthUrl;
  };

  /* 구글 로그인(미완성) */
  const [searchParams, setSearchParams] = useState(window.location.search);

  // URL이 변경되었을 때 searchParams 업데이트
  useEffect(() => {
    // 페이지가 리디렉션되면서 쿼리 파라미터가 변경되므로 이를 감지하여 업데이트
    setSearchParams(window.location.search);
  }, [window.location.search]); // URL 변경 시마다 실행

  // 쿼리 파라미터에서 "code"가 있는지 확인하고, 있으면 처리
  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams);
    console.log("queryParams:", queryParams.toString());
    if (queryParams.has("code")) {
      handleGoogleCallback(queryParams); // "code"가 있다면 구글 로그인 처리
    }
  }, [searchParams]); // searchParams가 변경될 때마다 실행

  // 구글 로그인 후 액세스 토큰을 사용하여 사용자 정보 가져오기
  const handleGoogleCallback = async (queryParams: URLSearchParams) => {
    const code = queryParams.get("code");
    console.log("인증 코드:", code);

    if (code) {
      try {
        // 인증 코드로 액세스 토큰 및 ID 토큰 받기
        const tokenResponse = await getAccessToken(code);
        console.log("액세스 토큰:", tokenResponse.access_token);
        console.log("ID 토큰:", tokenResponse.id_token);

        // 액세스 토큰으로 사용자 정보 가져오기
        const userInfo = await getUserInfo(tokenResponse.access_token);
        console.log("구글 사용자 정보:", userInfo);

        // 사용자 정보를 상태에 저장하거나 로그인 처리
        // login({ username: userInfo.name });
      } catch (error: any) {
        console.error("구글 로그인 실패:", error);
        if (error.response) {
          console.error("Error Response:", error.response);
        } else {
          console.error("Error Message:", error.message);
        }
      }
    }
  };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div
      className="w-[554px] h-full bg-[#ffffff94] px-[100px] py-[50px] 
    flex flex-col gap-[50px] rounded-[10px]"
    >
      {/* LOGIN */}
      <div className="text-center">
        <p className="text-logo-green-light font-bold text-[20px]">LOGIN</p>
      </div>

      {/* 버튼 모음 */}
      {/* 버튼 글릭 시 회원가입 여부를 확인하는 로직 추가 필요 */}
      <div className="flex flex-col gap-[20px]">
        {/* (임시) 회원가입 된 상태 */}
        <Button
          text="카카오 로그인"
          size="lg"
          css="bg-kakao border-gray01 text-black gap-[10px]"
          logo={KakaoLogo}
          // onClick={handleKakaoLogin} 카카오로그인
          //임시 세션값 통한 로그인
          onClick={async () => {
            try {
              const data = await postSignIn("qwerty1@gmail.com", "1234");
              console.log(data);
              login({ username: "member1", userId: 1 });
            } catch (error) {
              console.error(error);
            }
          }}
        />
        <button
          onClick={async () => {
            try {
              const data = await postSignIn("qwerty1@gmail.com", "1234");
              console.log(data);
              login({ username: "member1", userId: 1 });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          1
        </button>
        <button
          onClick={async () => {
            try {
              const data = await postSignIn("qwerty2@gmail.com", "1234");
              console.log(data);
              login({ username: "member2", userId: 2 });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          2
        </button>
        <button
          onClick={async () => {
            try {
              const data = await postSignIn("qwerty3@gmail.com", "1234");
              console.log(data);
              login({ username: "member3", userId: 3 });
            } catch (error) {
              console.error(error);
            }
          }}
        >
          3
        </button>
        {/* (임시) 회원가입 되지 않은 상태 */}
        <Button
          text="구글 로그인"
          size="lg"
          css="bg-white border-gray01 text-black gap-[10px]"
          logo={GoogleLogo}
          onClick={() => handleGoogleLogin()}
        />
      </div>
    </div>
  );
};

export default SignIn;
