import Button from "../components/common/Button";

const SignUp = () => {
  return (
    <div className="w-[520px] h-[298px] bg-[#D6D6D6] p-[100px]">
      <div>
        <div className="flex flex-col gap-[20px]">
          <Button text="카카오 계정으로 가입하기" size="lg" />
          <Button text="Google 계정으로 가입하기" size="lg" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
