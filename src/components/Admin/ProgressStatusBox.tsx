import { twMerge } from "tailwind-merge";

const STATUS_NAME = ["진행 중", "진행 예정", "진행 완료"];

interface ProgressStatusBoxProps {
  width?: string;
  height?: string;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const ProgressStatusBox = ({
  width,
  height,
  status,
  setStatus,
}: ProgressStatusBoxProps) => {
  const handleItemClick = (name: string) => {
    setStatus(name);
  };

  return (
    <ul
      className={twMerge(
        `border border-main-green w-[100px]
      bg-main-green03 text-main-green absolute top-0 z-10`,
        width
      )}
    >
      {STATUS_NAME.map((name, idx) => {
        return (
          <li
            key={idx}
            className={twMerge(
              `${
                status === name && "bg-main-green02"
              } h-[25px] flex items-center justify-center
            border border-main-green02 hover:bg-main-green02/50 cursor-pointer`,
              height
            )}
            onClick={() => handleItemClick(name)}
          >
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default ProgressStatusBox;
