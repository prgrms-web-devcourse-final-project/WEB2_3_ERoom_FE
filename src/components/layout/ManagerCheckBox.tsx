import { twMerge } from "tailwind-merge";
import sideCheckIcon from "../../assets/icons/sideCheckIcon.svg";

interface ManagerCheckBoxProps {
  checkboxId: string;
  checkboxName: string;
  labelName: string;
}

const ManagerCheckBox = ({
  checkboxId,
  checkboxName,
  labelName,
}: ManagerCheckBoxProps) => {
  return (
    <div className="relative flex items-center gap-2 font-bold transition-all">
      <label
        htmlFor={checkboxId}
        className="text-gray01 peer-checked:text-header-green-hoverlight text-[14px]
        flex items-center gap-3"
      >
        <input
          type="checkbox"
          id={checkboxId}
          name={checkboxName}
          className={twMerge(`peer hidden`)}
        />
        <div
          className="w-[13px] h-[13px] bg-white border border-gray01 flex items-center justify-center peer-checked:border-header-green-hoverlight
        peer-checked:bg-main-green01"
        ></div>
        <img
          src={sideCheckIcon}
          alt="checked"
          className="w-[11px] h-[11px] hidden peer-checked:block absolute left-[1px]"
        />

        <span className="peer-checked:text-header-green-hoverlight cursor-pointer">
          {labelName}
        </span>
      </label>
    </div>
  );
};

export default ManagerCheckBox;
