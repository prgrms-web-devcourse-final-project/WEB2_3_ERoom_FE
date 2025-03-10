import { useEffect, useRef, useState } from "react";
import Button from "../components/common/Button";
import "../styles/AuthLayout.css";
import defaultImg from "../assets/defaultImg.svg";
import ConfirmModal from "../components/modals/ConfirmModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editMyPageInfo, getMyPageInfo } from "../api/myPage";
import { queryClient } from "../main";
import SimpleAlertModal from "../components/modals/SimpleAlertModal";
import AlertModal from "../components/common/AlertModal";
import { useAuthStore } from "../store/authStore";

interface MyPageInfoType {
  email: string;
  username: string;
  organization: string;
  profile: string;
}

const MyPage = () => {
  const { data: myPageInfo, isLoading } = useQuery<MyPageInfoType>({
    queryKey: ["myPageInfo"],
    queryFn: getMyPageInfo,
  });

  // 유저 전역상태 업데이트 함수
  const updateMember = useAuthStore((state) => state.updateMember);

  const [modalText, setModalText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (text: string) => {
    setModalText(text);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalText("");
    setIsModalOpen(false);
  };

  const [companyInfo, setCompanyInfo] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [profileImgFile, setProfileImgFile] = useState<File>();

  useEffect(() => {
    if (myPageInfo) {
      setName(myPageInfo.username);
      setCompanyInfo(myPageInfo.organization);
      setProfileImgUrl(myPageInfo.profile);
    }
  }, [myPageInfo]);

  const [isConfirmModal, setIsConfirmModal] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  console.log("hover", isHovered);
  console.log("파일선택창오픈", isFileDialogOpen);

  const handleCompanyInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyInfo(e.target.value);
  };

  //프로필 이미지 수정 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const file = e.target.files?.[0];

    if (file) {
      setProfileImgFile(file);
      const tempImgUrl = URL.createObjectURL(file);
      setProfileImgUrl(tempImgUrl);
    }

    setIsHovered(false);
    setIsFileDialogOpen(false);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileInputClick = () => {
    setIsFileDialogOpen(true);
    if (fileInputRef.current === null) {
      // 파일 선택 안 할 경우 hover 초기화
      setIsFileDialogOpen(false);
    }
  };

  // 파일 선택창이 닫혔는지 감지하는 useEffect
  useEffect(() => {
    if (!isFileDialogOpen) {
      setTimeout(() => {
        setIsHovered(false);
      }, 300);
    }
  }, [isFileDialogOpen]);

  // 내 정보 수정 폼데이터
  const formData = new FormData();
  formData.append("username", name);
  formData.append("organization", companyInfo);

  if (profileImgFile) {
    // 프로필 이미지를 변경한 경우
    formData.append("profileImage", profileImgFile);
  }

  if (profileImgUrl === null) {
    const emptyFile = new File([""], "empty.jpg", { type: "image/jpeg" });
    formData.append("profileImage", emptyFile);
  }

  useEffect(() => {
    console.log("profileImgUrl", profileImgUrl);
    console.log("profileImgFile", profileImgFile);
  }, [profileImgUrl, profileImgFile]);

  // 정보 수정 함수
  const { mutateAsync: editMyInfo } = useMutation({
    mutationFn: async () => {
      const response = await editMyPageInfo(formData);
      updateMember(response?.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myPageInfo"] });
      setEditSuccessModalOpen(true);
    },
  });

  // 정보 수정 성공 시 모달 오픈
  const [editSuccessModalOpen, setEditSuccessModalOpen] = useState(false);

  if (isLoading) {
    return (
      <section className="mypage-background flex justify-center items-center relative min-h-[calc(100vh-50px)]">
        <div className="absolute inset-0 blur bg-white/20"></div>
        <div className="relative z-10 w-[680px] bg-[#ffffff94] px-[100px] py-[50px] rounded-[10px]">
          <div className="animate-pulse flex flex-col gap-[50px]">
            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            <div className="flex gap-[30px]">
              <div className="w-[200px] h-[200px] bg-gray-300 rounded"></div>
              <div className="flex flex-col gap-[10px] w-[250px]">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mypage-background flex justify-center items-center 
    relative min-h-[calc(100vh-50px)]"
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
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => !isFileDialogOpen && setIsHovered(false)}
              >
                <img
                  src={profileImgUrl || defaultImg}
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
                      className="text-gray02 hover:text-white bg-main-green/30 hover:bg-main-green 
                      px-[10px] py-[5px] rounded-[5px] cursor-pointer"
                    >
                      {/* <p>이미지 변경</p> */}
                      <label
                        className="w-full h-full cursor-pointer"
                        htmlFor="fileInput"
                        // onClick={handleFileInputClick}
                      >
                        이미지 변경
                      </label>
                      {/* 파일 업로드 입력 (숨김) */}
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onClick={handleFileInputClick}
                        onChange={handleFileChange}
                      />
                    </div>

                    {/* 기본 이미지 버튼 */}
                    {profileImgUrl && (
                      <div
                        className="w-fit text-center px-[10px] py-[5px] cursor-pointer
                      text-[14px] font-bold text-white hover:text-main-green01
                      rounded-[5px] bg-white/30 hover:bg-white/70"
                        onClick={() => {
                          setProfileImgUrl(null);
                        }}
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
                <span className="font-bold text-[14px]">이름</span>
                <input
                  type="text"
                  value={name}
                  onChange={handleName}
                  placeholder="홍길동"
                  className="w-[250px] h-[33px] pl-[10px] bg-transparent focus:outline-none border-b-[1px] border-b-gray01"
                />
              </div>

              {/* 이메일 */}
              <div className="flex flex-col gap-[5px]">
                <span className="font-bold text-[14px]">이메일</span>
                <div className="pl-[10px]">
                  <span className="text-black01">{myPageInfo?.email}</span>
                </div>
              </div>

              {/* 소속 */}
              <div className="flex flex-col gap-[5px]">
                <span className="font-bold text-[14px]">소속</span>
                <input
                  type="text"
                  value={companyInfo}
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
              css="bg-main-green01 border border-main-green text-main-beige01"
              onClick={() => {
                if (!name.trim().length || !companyInfo.trim().length) {
                  openModal("이름과 소속은 필수로 입력해야 됩니다!");
                  return;
                }
                editMyInfo();
              }}
            />
            {/* <Button
              text="탈퇴하기"
              size="md"
              css="border-none text-[12px] text-main-green01"
              onClick={() => setIsConfirmModal(true)}
            /> */}
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
      {/* 수정 완료 모달 */}
      {editSuccessModalOpen && (
        <div className="absolute bg-black/50 z-30 w-full h-full flex items-center justify-center">
          <SimpleAlertModal
            text="수정이 완료되었습니다!"
            setIsModal={setEditSuccessModalOpen}
            css="animate-fadeUp"
          />
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <AlertModal text={modalText} onClose={closeModal} />
        </div>
      )}
    </section>
  );
};

export default MyPage;
