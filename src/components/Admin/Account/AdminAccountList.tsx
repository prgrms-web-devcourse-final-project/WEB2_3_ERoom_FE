import { useEffect, useRef, useState } from "react";
import EditIcon from "../../../assets/icons/edit.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import { twMerge } from "tailwind-merge";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import { useMutation } from "@tanstack/react-query";
import { editAdminAccount } from "../../../api/admin";
import { queryClient } from "../../../main";
import AdminEditCancelBtn from "../AdminEditCancelBtn";

const AdminAccountList = ({
  user,
  index,
  setDeleteAccountId,
}: {
  user: AccountListProps;
  index: number;
  setDeleteAccountId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [organizationWidth, setOrganizationWidth] = useState(10);
  const [profileImageWidth, setProfileImageWidth] = useState(10);

  const handleEditClick = () => setIsEditing(true);

  // 텍스트의 정확한 픽셀 길이를 계산하는 함수
  const getTextWidth = (text: string, font = "14px Pretendard") => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return text.length * 10;
    context.font = font;
    let textWidth = context.measureText(text).width;

    // 영어와 한글 너비 차이를 보정
    const koreanCharCount = (text.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g) || []).length;
    const englishCharCount = text.length - koreanCharCount;

    // 영어일 경우 너비 보정 (Pretendard 기준)
    textWidth += englishCharCount * 0.3;

    return textWidth + 10; // 여유 공간 추가
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
    if (!isComposing) {
      if (name === "organization") {
        setOrganizationWidth(getTextWidth(value, "14px Pretendard"));
      } else if (name === "profileImage") {
        setProfileImageWidth(getTextWidth(value, "14px Pretendard"));
      }
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setDeleteAccountId(user.memberId);
    } else {
      setDeleteAccountId(null);
    }
  }, [isChecked]);

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setOrganizationWidth(getTextWidth(editedUser.organization || ""));
    setProfileImageWidth(getTextWidth(editedUser.profile || ""));
  }, [editedUser.organization, editedUser.profile]);

  // 계정 관리 수정요청 데이터
  const editAccountData: EditAccountType = {
    username: editedUser.username,
    createdAt: editedUser.createdAt,
    memberGrade: null,
    organization: editedUser.organization,
    profile: editedUser.profile,
  };

  // 계정관리 수정 함수
  const { mutate } = useMutation({
    mutationFn: ({
      memberId,
      editAccountData,
    }: {
      memberId: number;
      editAccountData: EditAccountType;
    }) => editAdminAccount(memberId, editAccountData),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["AdminAllMemberData"] }),
  });

  return (
    <div
      className={twMerge(
        "flex flex-col",
        isEditing ? "bg-main-green03" : "bg-transparent"
      )}
    >
      <div className="grid grid-cols-[5%_5%_30%_25%_25%_10%] h-[37px] w-full text-main-green text-[14px] py-[5px] ">
        <div className="flex justify-center items-center">
          <button onClick={toggleCheckBox}>
            <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <span>{index + 1}</span>
        </div>
        <div className="flex justify-center items-center">
          <span>{user.email}</span>
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={editedUser.username}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedUser.username.length + 2}ch` }}
            />
          ) : (
            <span>{user.username}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <input
              type="text"
              name="registeredDate"
              value={editedUser.createdAt}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedUser.createdAt.length + 1}ch` }}
            />
          ) : (
            <span>{user.createdAt}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  mutate({ memberId: user.memberId, editAccountData });
                  console.log(editAccountData, user.memberId);
                  setIsEditing(false);
                }}
              >
                <img src={SaveIcon} alt="저장" />
              </button>
              {/* <p
                onClick={() => {
                  setEditedUser({ ...user });
                  setIsEditing(false);
                }}
                className="w-[37px] h-[24px] border flex items-center justify-center rounded-[5px]
                text-header-green border-header-green cursor-pointer"
              >
                취소
              </p> */}
              <AdminEditCancelBtn
                onClick={() => {
                  setEditedUser({ ...user });
                  setIsEditing(false);
                }}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="cursor-pointer"
            >
              <img src={EditIcon} alt="수정" />
            </button>
          )}
        </div>
      </div>
      {isEditing && (
        <div>
          <div className="grid grid-cols-[10%_1fr_10%] h-[37px] w-full text-main-green text-[14px] ">
            <div></div>
            <div className="flex w-full items-center overflow-hidden">
              <span className="mr-1">소속: </span>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  name="organization"
                  value={editedUser.organization || ""}
                  onChange={handleInputChange}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => {
                    setIsComposing(false);
                    setOrganizationWidth(
                      getTextWidth(editedUser.organization || "")
                    );
                  }}
                  className="h-full focus:outline-none border-b border-b-header-green"
                  style={{
                    width: `${organizationWidth}px`,
                    minWidth: "fit-content",
                    maxWidth: "60%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              ) : (
                <span className="flex items-center">{user.organization}</span>
              )}
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-[10%_1fr_10%] h-[37px] w-full text-main-green text-[14px] py-[5px]">
            <div></div>
            <div className="flex w-full items-center overflow-hidden">
              <span className="mr-1">프로필 이미지:</span>
              {isEditing ? (
                <input
                  ref={inputRef}
                  type="text"
                  name="profile"
                  value={editedUser.profile || ""}
                  onChange={handleInputChange}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => {
                    setIsComposing(false);
                    setProfileImageWidth(
                      getTextWidth(editedUser.profile || "")
                    );
                  }}
                  className="h-full focus:outline-none border-b border-b-header-green"
                  style={{
                    width: `${profileImageWidth}px`,
                    minWidth: "fit-content",
                    maxWidth: "80%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                />
              ) : (
                <span className="flex items-center">{user.profile}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccountList;
