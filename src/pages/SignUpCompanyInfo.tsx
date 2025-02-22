import { useState } from "react";
import Button from "../components/common/Button";
import defaultImg from "../assets/defaultImg.svg";
import { useAuthStore } from "../store/authStore";

const SignUpCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");
  const [progileImg, setProfileImg] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { login } = useAuthStore();

  const handleCompanyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo(e.target.value);
  };

  //프로필 이미지 수정 함수
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="flex flex-col justify-between items-center w-[680px] h-full
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
        <div
          className="flex flex-col justify-between items-center w-[200px] h-[200px]
              overflow-hidden gap-[10px]"
        >
          {/* 프로필 기본 이미지 샘플로 넣어둠. 추후 기본이미지 나오면 수정 필요 */}
          <div
            className="relative w-full h-full rounded-[5px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={progileImg || defaultImg}
              alt="프로필 이미지"
              className="w-full h-full object-cover object-center rounded-[5px]
                  border border-main-green"
            />

            {/* 이미지 변경 문구 (마우스 오버 시 표시) */}
            {isHovered && (
              <div
                className="absolute inset-0 flex flex-col justify-center items-center 
                    gap-[10px] bg-black/50 font-bold text-[16px]"
              >
                {/* 이미지 변경 버튼 */}
                <div
                  className="text-gray02 hover:text-white cursor-pointer
                      bg-main-green/30 hover:bg-main-green px-[10px] py-[5px] 
                      rounded-[5px]"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <p>이미지 변경</p>

                  {/* 파일 업로드 입력 (숨김) */}
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImg}
                  />
                </div>

                {/* 기본 이미지 버튼 */}
                {progileImg && (
                  <div
                    className="w-fit text-center px-[10px] py-[5px] cursor-pointer
                      text-[14px] font-bold text-white hover:text-main-green01
                      rounded-[5px] bg-white/30 hover:bg-white/70"
                    onClick={() => setProfileImg(null)}
                  >
                    기본 이미지 적용
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

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

      <div className="flex justify-center gap-[5px]">
        <Button
          text="등록하기"
          size="md"
          to="/"
          css="border-logo-green text-logo-green"
          onClick={() => login()}
        />
        <Button
          text="취소"
          size="md"
          to="/"
          css="bg-main-green01 border-main-green text-main-beige01"
        />
      </div>
    </div>
  );
};

export default SignUpCompanyInfo;
