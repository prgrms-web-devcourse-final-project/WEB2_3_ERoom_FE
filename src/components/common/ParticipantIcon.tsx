import { twMerge } from "tailwind-merge";

interface ParticipantIconProps {
  css?: string;
}

const ParticipantIcon = ({ css }: ParticipantIconProps) => {
  // 임시 입니다 추후에 이미지로 변경예정
  return (
    <div
      className={twMerge(
        `bg-white
        w-[30px] h-[30px] rounded-full border border-[#1F281E] ${css}`
      )}
    ></div>
  );
};

export default ParticipantIcon;
