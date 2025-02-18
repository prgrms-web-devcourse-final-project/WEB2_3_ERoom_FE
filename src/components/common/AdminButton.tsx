import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";

interface AdminButtonProps {
  text: string;
  type: "green" | "white";
  to?: string;
  css?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AdminButton = ({ text, to, type, css, onClick }: AdminButtonProps) => {
  const navigate = useNavigate();
  const BASE_STYLE =
    "flex justify-center items-center rounded-[2px] h-[29px] py-[5px] px-[10px]  cursor-pointer";

  const TYPE_STYLE = {
    green: "bg-header-green text-main-beige01 font-bold",
    white: "text-header-green font-bold border border-header-green",
  }[type];

  return (
    <>
      <button
        className={twMerge(BASE_STYLE, TYPE_STYLE, css)}
        onClick={(e) => (to ? navigate(to) : onClick && onClick(e))}
      >
        {text}
      </button>
    </>
  );
};

export default AdminButton;
