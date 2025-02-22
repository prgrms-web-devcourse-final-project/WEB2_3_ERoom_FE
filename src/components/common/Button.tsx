import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

const Button = ({ text, to, size, css, logo, onClick }: ButtonProps) => {
  const navigate = useNavigate();
  const BASE_STYLE =
    "flex justify-center items-center border border-[1px] rounded-[5px] cursor-pointer";

  const SIZE_STYLE = {
    lg: "w-[354px] h-[39px] font-bold bg-main-green01 border-maing-green text-main-beige01",
    md: "w-[86px] h-[29px] font-bold",
    sm: "w-auto h-[24px] font-semibold text-[12px] py-[5px] px-[10px]",
  }[size];

  return (
    <>
      <button
        type="button"
        className={twMerge(BASE_STYLE, SIZE_STYLE, css)}
        onClick={(e) => (to ? navigate(to) : onClick && onClick(e))}
      >
        {logo && <img src={logo} alt={`${text} 로고`} />}
        {text}
      </button>
    </>
  );
};

export default Button;
