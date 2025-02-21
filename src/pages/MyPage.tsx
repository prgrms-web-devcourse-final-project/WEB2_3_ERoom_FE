import { useState } from "react";
import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import DefaultImg from "../assets/sample_default_profile.png";
import ConfirmModal from "../components/modals/ConfirmModal";

const MyPage = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");
  const [progileImg, setProfileImg] = useState("");
  const [name, setName] = useState<string | undefined>("");
  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);

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
    <section
      className="mypage-background flex justify-center items-center 
    relative min-h-screen"
    >
      {/* 투명 오버레이 */}
      <div className="absolute inset-0 blur bg-white/20"></div>

      <div className="relative z-10">
        <div
          className="flex flex-col justify-center items-center w-[680px] h-[559px] 
        bg-[#ffffff94] p-[100px] rounded-[10px]"
        >
          {/* 모달 제목 */}
          <div className="text-center">
            <span className="text-logo-green-light font-bold text-[20px]">
              개인정보
            </span>
          </div>

          <div className="flex gap-[30px] my-[50px]">
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

            {/* 개인정보란 */}
            <div className="flex flex-col gap-[20px]">
              {/* 이름 */}
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

              {/* 이메일 */}
              <div className="flex flex-col gap-[10px]">
                <span className="font-bold">이메일</span>
                <div className="pl-[10px]">
                  <span className="text-black01">hong@gmail.com</span>
                </div>
              </div>

              {/* 소속 */}
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
