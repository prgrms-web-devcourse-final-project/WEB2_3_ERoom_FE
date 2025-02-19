import { useEffect, useRef, useState } from "react";
import EditIcon from "../../assets/icons/edit.svg";
import SaveIcon from "../../assets/icons/save.svg";
import Button from "../common/Button";
import { twMerge } from "tailwind-merge";
import UnCheckBox from "../../assets/icons/unchecked_box.svg";
import CheckBox from "../../assets/icons/checked_box.svg";

interface AccountListProps {
  id: number;
  email: string;
  name: string;
  registeredDate: string;
  profileImage: string;
  organization: string;
  isSubscribed: boolean;
}

const AccountList = ({
  user,
  index,
  onUpdateSubscription,
  onUpdateUser,
}: {
  user: AccountListProps;
  index: number;
  onUpdateSubscription: (id: number, isSubscribed: boolean) => void;
  onUpdateUser: (id: number, updatedUser: Partial<AccountListProps>) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [isComposing, setIsComposing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [organizationWidth, setOrganizationWidth] = useState(10);
  const [profileImageWidth, setProfileImageWidth] = useState(10);

  const handleDropdown = () => {
    if (isEditing) return;
    setIsOpen((prev) => !prev);
  };

  const handleSubscribed = () => {
    onUpdateSubscription(user.id, !user.isSubscribed);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onUpdateUser(user.id, editedUser);
  };

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

  const toggleCheckBox = () => {
    setIsChecked((prev) => !prev);
  };

  useEffect(() => {
    setOrganizationWidth(getTextWidth(editedUser.organization));
    setProfileImageWidth(getTextWidth(editedUser.profileImage));
  }, [editedUser.organization, editedUser.profileImage]);

  return (
    <div
      className={twMerge(
        "flex flex-col cursor-pointer",
        isOpen ? "bg-main-green03" : "bg-transparent"
      )}
    >
      <div className="grid grid-cols-[5%_5%_30%_25%_25%_10%] h-[37px] w-full text-main-green text-[14px] py-[5px] ">
        <div className="flex justify-center items-center">
          <button onClick={toggleCheckBox}>
            <img src={isChecked ? CheckBox : UnCheckBox} alt="체크박스" />
          </button>
        </div>
        <div
          className="flex justify-center items-center"
          onClick={handleDropdown}
        >
          <span>{index + 1}</span>
        </div>
        <div
          className="flex justify-center items-center"
          onClick={handleDropdown}
        >
          {isEditing ? (
            <input
              type="text"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedUser.email.length + 1}ch` }}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>
        <div
          className="flex justify-center items-center"
          onClick={handleDropdown}
        >
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedUser.name.length + 1}ch` }}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>
        <div
          className="flex justify-center items-center"
          onClick={handleDropdown}
        >
          {isEditing ? (
            <input
              type="text"
              name="registeredDate"
              value={editedUser.registeredDate}
              onChange={handleInputChange}
              className="h-full w-auto text-center focus:outline-none border-b border-b-header-green"
              style={{ width: `${editedUser.registeredDate.length + 1}ch` }}
            />
          ) : (
            <span>{user.registeredDate}</span>
          )}
        </div>
        <div className="flex justify-center items-center">
          {user.isSubscribed ? (
            <Button
              size="sm"
              text="비구독"
              css="font-bold text-[14px] text-header-red border border-header-red bg-white h-[27px]"
              onClick={handleSubscribed}
            />
          ) : (
            <Button
              size="sm"
              text="구독"
              css="font-bold text-[14px] text-main-beige01 bg-header-green h-[27px]"
              onClick={handleSubscribed}
            />
          )}
        </div>
      </div>
      {isOpen && (
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
                  value={editedUser.organization}
                  onChange={handleInputChange}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => {
                    setIsComposing(false);
                    setOrganizationWidth(getTextWidth(editedUser.organization));
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
                  name="profileImage"
                  value={editedUser.profileImage}
                  onChange={handleInputChange}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => {
                    setIsComposing(false);
                    setProfileImageWidth(getTextWidth(editedUser.profileImage));
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
                <span className="flex items-center">{user.profileImage}</span>
              )}
            </div>
            <div className="flex justify-center items-center">
              {isEditing ? (
                <button onClick={handleSaveClick} className="cursor-pointer">
                  <img src={SaveIcon} alt="저장" />
                </button>
              ) : (
                <button onClick={handleEditClick} className="cursor-pointer">
                  <img src={EditIcon} alt="수정" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountList;
