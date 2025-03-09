import { twMerge } from "tailwind-merge";
import defaultProfileImg from "../../assets/defaultImg.svg";

const ParticipantIcon = ({ css, imgSrc }: ParticipantIconProps) => {
  // 임시 입니다 추후에 이미지로 변경예정
  return (
    <div
      className={twMerge(
        `bg-white
        w-[35px] h-[35px] rounded-full border border-[#a8a8a8] ${css}`
      )}
    >
      <img
        src={imgSrc || defaultProfileImg}
        alt="프로필 이미지"
        className="w-full h-full rounded-full"
      />
    </div>
  );
};

export default ParticipantIcon;
