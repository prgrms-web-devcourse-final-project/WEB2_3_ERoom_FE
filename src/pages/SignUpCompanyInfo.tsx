import { useState } from "react";
import Button from "../components/common/Button";
import defaultImg from "../assets/defaultImg.svg";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { api } from "../api/api";
import { useNavigate } from "react-router";

const SignUpCompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState<string | undefined>("");
  const [profileImg, setProfileImg] = useState<string | null>(defaultImg);
  const [userName, setUserName] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { login } = useAuthStore();
  const { token } = useAuthStore();
  const navigate = useNavigate();

  const handleCompanyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo(e.target.value);
  };

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async () => {
    if (!companyInfo || !userName) {
      alert("이름과 소속을 입력해 주세요.");
      return;
    }
    // console.log(profileImg);

    // FormData 객체 생성
    const formData = new FormData();

    // 텍스트 필드 추가
    formData.append("organization", companyInfo);
    formData.append("username", userName ?? "");
    formData.append("idToken", token ?? "");

    // 이미지 파일 추가 (FileReader로 읽은 dataURL을 Blob으로 변환)
    if (profileImg) {
      const blob = dataURItoBlob(profileImg);
      formData.append("profileImage", blob, "profile.jpg"); // Blob 객체를 추가
    }

    // formdata 콘솔 확인
    formData.forEach((value, key) => {
      console.log(key, value); // 각 키-값 쌍을 출력
    });

    try {
      // 서버로 데이터 전송
      const response = await api.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("서버 응답:", response.data);
      alert("회원가입이 완료되었습니다.");
      login(response.data.accessToken, response.data.member);
      navigate("/");
    } catch (error) {
      console.error("업로드 실패:", error);
    }
  };

  // dataURL을 Blob으로 변환하는 유틸 함수
  const dataURItoBlob = (dataURI: string) => {
    const base64Index = dataURI.indexOf("base64,");
    if (base64Index === -1) {
      // base64가 없으면 SVG와 같은 경우일 수 있음
      const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
      const byteString = decodeURIComponent(dataURI.split(",")[1]);

      // Blob 객체로 변환 (SVG 등 Base64가 아닌 경우 처리)
      return new Blob([byteString], { type: mimeString });
    }

    // base64 부분을 추출하여 디코딩
    const byteString = atob(dataURI.split(",")[1]);

    // MIME 타입 추출
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // ArrayBuffer로 변환
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    // Blob 객체로 변환
    return new Blob([uintArray], { type: mimeString });
  };

  //프로필 이미지 수정 함수
  const handleProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        console.log(result); // reader.result가 정확한 dataURI로 반환되는지 확인
        setProfileImg(result);
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
              src={profileImg || defaultImg}
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
                {profileImg !== defaultImg && (
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
            <input
              type="text"
              value={userName ?? ""}
              onChange={handleUserName}
              placeholder="이름을 입력해주세요"
              className="w-[250px] h-[33px] pl-[10px] bg-transparent focus:outline-none border-b-[1px] border-b-gray01"
            />
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
          css="border-logo-green text-logo-green"
          onClick={handleSubmit}
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
