import Button from "../components/common/Button";

const SignUpCompanyInfo = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[450px] h-[479px] bg-[#ffffff94] py-[100px]">
      <div className="text-center mt-[50px]">
        <span className="text-logo-green-light font-bold text-[20px]">
          개인정보 등록
        </span>
      </div>
      <div className="flex flex-col gap-[20px] my-[50px]">
        <div className="flex flex-col gap-[10px]">
          <span className="font-bold">이름</span>
          <input
            type="text"
            value="홍길동"
            disabled
            className="w-[250px] h-[33px] pl-[10px] bg-[#9A9A9A] font-bold"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-bold">이메일</span>
          <input
            type="text"
            value="hong@gmail.com"
            disabled
            className="w-[250px] h-[33px] pl-[10px] bg-[#9A9A9A] font-bold"
          />
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-bold">소속</span>
          <input
            type="text"
            value="이룸 7팀"
            className="w-[250px] h-[33px] pl-[10px] bg-[#9A9A9A] font-bold focus:outline-none"
          />
        </div>
        <div className="flex justify-center">
          <Button text="등록하기" size="md" to="/" />
        </div>
      </div>
    </div>
  );
};

export default SignUpCompanyInfo;
