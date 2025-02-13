import { useNavigate } from "react-router";

type ButtonProps = {
  text: string;
  to?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({ text, to, onClick }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="flex justify-center items-center w-[320px] h-[39px] bg-[#A1A1A1] font-bold"
        onClick={(e) => (to ? navigate(to) : onClick && onClick(e))}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
