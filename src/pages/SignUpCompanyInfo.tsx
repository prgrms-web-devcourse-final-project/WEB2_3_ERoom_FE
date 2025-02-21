import { useState } from "react";
import Button from "../components/common/Button";
import DefaultImg from "../assets/sample_default_profile.png";

const SignUpCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");
  const [progileImg, setProfileImg] = useState("");

  const handleCompanyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo(e.target.value);
  };

  //프로필 이미지 수정 함수(추후 구현)
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImg(e.target.value);
  };

  return (
    <div
      className="flex flex-col justify-between items-center w-[680px] h-[459px] 
      gap-[50px] px-[100px] py-[50px] bg-[#ffffff94] rounded-[10px]"
    >
      {/* 모달 제목 */}
      <div className="w-full text-center">
        <p className="text-logo-green-light font-bold text-[20px]">
          개인정보 등록
        </p>
      </div>

      <div className="flex gap-[30px]">
        {/* 프로필 이미지 */}
        <button
          onClick={() => handleProfileImg}
          className="w-[200px] h-full overflow-hidden cursor-pointer"
        >
          {/* 프로필 기본 이미지 샘플로 넣어둠. 추후 기본이미지 나오면 수정 필요 */}
          <img
            src={progileImg || DefaultImg}
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </button>

        {/* 개인 정보란 */}
        <div className="flex flex-col justify-between gap-[10px]">
          <div className="flex flex-col gap-[5px]">
            <p className="font-bold">이름</p>
            <div className="pl-[10px]">
              <p className="text-black01">홍길동</p>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="font-bold">이메일</p>
            <div className="pl-[10px]">
              <p className="text-black01">hong@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <p className="font-bold">소속</p>
            <input
              type="text"
              value={companyInfo ?? ""}
              onChange={handleCompanyInfo}
              placeholder="소속을 입력해주세요"
              className="w-[250px] h-[33px] pl-[10px] bg-transparent focus:outline-none border-b-[1px] border-b-gray01"
            />
          </div>
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
