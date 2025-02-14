import Button from "../components/common/Button";
import KakaoLogo from "../assets/kakao_logo.svg";
import GoogleLogo from "../assets/google_logo.svg";

const SignUp = () => {
  return (
    <div className="w-[554px] h-[309px] bg-[#ffffff94] px-[100px] py-[50px] rounded-[10px]">
      <div className="text-center mb-[50px]">
        <span className="text-logo-green-light font-bold text-[20px]">
          SIGN UP
        </span>
      </div>
      <div>
        <div className="flex flex-col gap-[20px]">
          <Button
            text="카카오 계정으로 가입하기"
            size="lg"
            css="bg-kakao border-gray01 text-black gap-[10px]"
            logo={KakaoLogo}
          />
          <Button
            text="구글 계정으로 가입하기"
            size="lg"
            css="bg-white border-gray01 text-black gap-[10px]"
            logo={GoogleLogo}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
