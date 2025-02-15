import { useState } from "react";
import Button from "../components/common/Button";

const SignUpCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");

  const handleCompanyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo(e.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center w-[450px] h-[479px] bg-[#ffffff94] px-[100px] rounded-[10px]">
      <div className="text-center">
        <span className="text-logo-green-light font-bold text-[20px]">
          개인정보 등록
        </span>
      </div>
      <div className="flex flex-col gap-[20px] my-[50px]">
        <div className="flex flex-col gap-[10px]">
          <span className="font-bold">이름</span>
          <div className="pl-[10px]">
            <span className="text-black01">홍길동</span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-bold">이메일</span>
          <div className="pl-[10px]">
            <span className="text-black01">hong@gmail.com</span>
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <span className="font-bold">소속</span>
          <input
            type="text"
            value={companyInfo ?? ""}
            onChange={handleCompanyInfo}
            placeholder="소속을 입력해주세요"
            className="w-[250px] h-[33px] pl-[10px] bg-transparent focus:outline-none border-b-[1px] border-b-gray01"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          text="등록하기"
          size="md"
          to="/"
          css="bg-main-green01 border-main-green text-main-beige01"
        />
      </div>
    </div>
  );
};

export default SignUpCompanyInfo;
