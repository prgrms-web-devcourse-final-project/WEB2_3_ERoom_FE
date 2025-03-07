import { twMerge } from "tailwind-merge";

const ParticipantIcon = ({ css, imgSrc }: ParticipantIconProps) => {
  // 임시 입니다 추후에 이미지로 변경예정
  return (
    <div
      className={twMerge(
        `bg-white
        w-[35px] h-[35px] rounded-full border border-[#1F281E] ${css}`
      )}
    >
      {/* 임시 */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt="프로필 이미지"
          className="w-full h-full rounded-full"
        />
      )}
    </div>
  );
};

export default ParticipantIcon;
