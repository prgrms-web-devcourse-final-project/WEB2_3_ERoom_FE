import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import KakaoLogo from "../assets/kakao_logo.svg";
import GoogleLogo from "../assets/google_logo.svg";
import { useAuthStore } from "../store/authStore";

const SignIn = () => {
  const { login } = useAuthStore();

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
          to="/"
          onClick={() => login()}
        />
        {/* (임시) 회원가입 되지 않은 상태 */}
        <Button
          text="구글 로그인"
          size="lg"
          css="bg-white border-gray01 text-black gap-[10px]"
          logo={GoogleLogo}
          to="/signup-company-info"
          onClick={() => login()}
        />
      </div>
    </div>
  );
};

export default SignIn;
