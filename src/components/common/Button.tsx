import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  text: string;
  size: "md" | "lg";
  to?: string;
  css?: string;
  logo?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, to, size, css, logo, onClick }: ButtonProps) => {
  const navigate = useNavigate();
  const BASE_STYLE =
    "flex justify-center items-center bg-main-green01 border border-[1px] border-black rounded-[5px] font-bold text-main-beige01";

  const SIZE_STYLE = {
    lg: "w-[354px] h-[39px] font-bold",
    md: "w-[89px] h-[29px] font-bold",
  }[size];

  return (
    <>
      <button
        className={twMerge(BASE_STYLE, SIZE_STYLE, css)}
        onClick={(e) => (to ? navigate(to) : onClick && onClick(e))}
      >
        {logo && <img src={logo} />}
        {text}
      </button>
    </>
  );
};

export default Button;
