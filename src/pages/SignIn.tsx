import Button from "../components/common/Button";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-[520px] h-[440px] bg-[#D6D6D6] p-[100px]">
        <div className="pb-[">
          <div className="flex flex-col gap-[20px] pb-[40px] border-b-[1px]">
            <Button text="카카오 계정으로 로그인" />
            <Button text="Google 계정으로 로그인" />
          </div>
          <div className="flex flex-col pt-[40px] gap-[5px]">
            <span className="text-sm text-center">아직 회원이 아니신가요?</span>
            <Button text="회원가입하러 가기" to="/signUp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
