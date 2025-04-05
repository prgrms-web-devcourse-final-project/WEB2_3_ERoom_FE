import { useEffect, useState } from "react";
import EditIcon from "../../../assets/icons/edit.svg";
import SaveIcon from "../../../assets/icons/save.svg";
import { twMerge } from "tailwind-merge";
import UnCheckBox from "../../../assets/icons/unchecked_box.svg";
import CheckBox from "../../../assets/icons/checked_box.svg";
import { useMutation } from "@tanstack/react-query";
import { editAdminAccount } from "../../../api/admin";
import { queryClient } from "../../../main";
import AdminEditCancelBtn from "../Button/AdminEditCancelBtn";

const AdminAccountList = ({
  user,
  index,
  setCheckedAccountIds,
  checkedAccountIds,
}: {
  user: AccountListProps;
  index: number;
  checkedAccountIds: number[];
  setCheckedAccountIds: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checkedAccountIds.includes(user.memberId)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedAccountIds]);

  const toggleCheckBox = () => {
    if (checkedAccountIds.includes(user.memberId)) {
      setCheckedAccountIds((prev) => prev.filter((id) => id !== user.memberId));
      setIsChecked(false);
    } else {
      setCheckedAccountIds((prev) => [...prev, user.memberId]);
      setIsChecked(true);
    }
  };

  // useEffect(() => {
  //   if (isChecked) {
  //     setCheckedAccountIds((prev) => [...prev, user.memberId]);
  //   } else {
  //     setCheckedAccountIds((prev) => prev.filter((id) => id !== user.memberId));
  //   }
  // }, [isChecked]);

  // 계정 관리 수정요청 데이터
  const editAccountData: EditAccountType = {
    name: editedUser.username,
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
        <div className="flex justify-center items-center ">
          <button onClick={toggleCheckBox} className="cursor-pointer">
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
          <span>{user.createdAt}</span>
        </div>
        <div className="flex justify-center items-center">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  mutate({ memberId: user.memberId, editAccountData });
                  setIsEditing(false);
                }}
              >
                <img src={SaveIcon} alt="저장" />
              </button>
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
              <span className="flex items-center">{user.organization}</span>
            </div>
            <div></div>
          </div>

          <div className="grid grid-cols-[10%_1fr_10%] h-[37px] w-full text-main-green text-[14px] py-[5px]">
            <div></div>
            <div className="flex w-full items-center overflow-hidden">
              <span className="mr-1">프로필 이미지:</span>
              <span className="flex items-center">{user.profile}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAccountList;
