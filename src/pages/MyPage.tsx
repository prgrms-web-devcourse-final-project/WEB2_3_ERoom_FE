import { useState } from "react";
import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import defaultImg from "../assets/defaultImg.svg";
import ConfirmModal from "../components/modals/ConfirmModal";
//병합테스트용 주석
const MyPage = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");
  const [progileImg, setProfileImg] = useState<string | null>(null);
  const [name, setName] = useState<string | undefined>("");
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <section
      className="mypage-background flex justify-center items-center 
    relative min-h-screen"
    >
      {/* 투명 오버레이 */}
      <div className="absolute inset-0 blur bg-white/20"></div>

      <div className="relative z-10">
        <div
          className="flex flex-col justify-center items-center w-[680px] h-full 
        bg-[#ffffff94] px-[100px] py-[50px] rounded-[10px] gap-[50px]"
        >
          {/* 모달 제목 */}
          <div className="text-center">
            <span className="text-logo-green-light font-bold text-[20px]">
              개인정보
            </span>
          </div>

          <div className="h-fit flex gap-[30px]">
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
                      onClick={() =>
                        document.getElementById("fileInput")?.click()
                      }
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

            {/* 개인정보란 */}
            <div className="flex flex-col gap-[10px]">
              {/* 이름 */}
              <div className="flex flex-col gap-[5px]">
                <span className="font-bold">이름</span>
                <input
                  type="text"
                  value={name ?? ""}
                  onChange={handleName}
                  placeholder="홍길동"
                  className="w-[250px] h-[33px] pl-[10px] bg-transparent focus:outline-none border-b-[1px] border-b-gray01"
                />
              </div>

              {/* 이메일 */}
              <div className="flex flex-col gap-[5px]">
                <span className="font-bold">이메일</span>
                <div className="pl-[10px]">
                  <span className="text-black01">hong@gmail.com</span>
                </div>
              </div>

              {/* 소속 */}
              <div className="flex flex-col gap-[5px]">
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

          {/* 버튼 모음 */}
          <div className="flex flex-col justify-center gap-[10px]">
            <Button
              text="수정하기"
              size="md"
              to="/"
              css="bg-main-green01 border border-main-green text-main-beige01"
            />
            <Button
              text="탈퇴하기"
              size="md"
              css="border-none text-[12px] text-main-green01"
              onClick={() => setIsConfirmModal(true)}
            />
          </div>
        </div>
      </div>
      {/* 탈퇴 확인 모달 */}
      {isConfirmModal && (
        <div
          className="absolute inset-0 w-screen h-fit min-h-screen
            flex justify-center items-center bg-black/70"
          onClick={() => setIsConfirmModal(false)}
        >
          <ConfirmModal value="탈퇴" setIsModal={setIsConfirmModal} />
        </div>
      )}
    </section>
  );
};

export default MyPage;
