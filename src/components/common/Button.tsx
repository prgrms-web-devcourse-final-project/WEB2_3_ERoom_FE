import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  size: "md" | "lg";
  to?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, to, size, className, onClick }: ButtonProps) => {
  const navigate = useNavigate();
  const BASE_STYLE = "flex justify-center items-center bg-[#A1A1A1] font-bold";

  const SIZE_STYLE = {
    lg: "w-[320px] h-[39px] font-bold",
    md: "w-[89px] h-[29px] font-bold",
  }[size];

  return (
    <>
      <button
        className={twMerge(BASE_STYLE, SIZE_STYLE, className)}
        onClick={(e) => (to ? navigate(to) : onClick && onClick(e))}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
