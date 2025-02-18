import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import KakaoLogo from "../assets/kakao_logo.svg";
import GoogleLogo from "../assets/google_logo.svg";

const SignIn = () => {
  return (
    <div className=" w-[554px] h-[414px] bg-[#ffffff94] px-[100px] py-[50px] rounded-[10px]">
      <div className="">
        <div className="text-center mb-[50px]">
          <span className="text-logo-green-light font-bold text-[20px]">
            LOGIN
          </span>
        </div>
        <div className="relative flex flex-col gap-[20px] pb-[40px] border-b-[1px]">
          <Button
            text="카카오 로그인"
            size="lg"
            css="bg-kakao border-gray01 text-black gap-[10px]"
            logo={KakaoLogo}
          />
          <Button
            text="구글 로그인"
            size="lg"
            css="bg-white border-gray01 text-black gap-[10px]"
            logo={GoogleLogo}
          />
        </div>
        <div className="relative flex flex-col pt-[40px] gap-[5px]">
          <span className="text-sm text-center font-semibold">
            아직 회원이 아니신가요?
          </span>
          <Button text="회원가입" to="/signup" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
