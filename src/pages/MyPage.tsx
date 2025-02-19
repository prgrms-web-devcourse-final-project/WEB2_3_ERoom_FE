import { useState } from "react";
import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import DefaultImg from "../assets/sample_default_profile.png";

const MyPage = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");
  const [progileImg, setProfileImg] = useState("");
  const [name, setName] = useState<string | undefined>("");

  const handleCompanyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo(e.target.value);
  };

  //프로필 이미지 수정 함수(추후 구현)
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImg(e.target.value);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <section className="mypage-background flex justify-center items-center relative min-h-screen">
      <div className="absolute inset-0 blur"></div>
      <div className="relative z-10">
        <div className="flex flex-col justify-center items-center w-[680px] h-[559px] bg-[#ffffff94] p-[100px] rounded-[10px]">
          <div className="text-center">
            <span className="text-logo-green-light font-bold text-[20px]">
              개인정보
            </span>
          </div>
          <div className="flex gap-[30px] my-[50px]">
            <button
              onClick={() => handleProfileImg}
              className="w-[200px] h-[206px] overflow-hidden cursor-pointer"
            >
              {/* 프로필 기본 이미지 샘플로 넣어둠. 추후 기본이미지 나오면 수정 필요 */}
              <img
                src={progileImg || DefaultImg}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </button>
            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px]">
                <span className="font-bold">이름</span>
                <input
                  type="text"
                  value={name ?? ""}
                  onChange={handleName}
                  placeholder="홍길동"
                  className="w-[250px] h-[33px] pl-[10px] bg-transparent focus:outline-none border-b-[1px] border-b-gray01"
                />
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
          </div>
          <div className="flex justify-center">
            <Button text="수정하기" size="md" to="/" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyPage;
