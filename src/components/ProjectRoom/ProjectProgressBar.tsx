import { twMerge } from "tailwind-merge";

interface ProjectProgressBarProps {
  progress: number;
}

const ProjectProgressBar = ({ progress }: ProjectProgressBarProps) => {
  console.log(progress + "");
  return (
    <div
      className="w-full  h-[20px] rounded-[50px]
      bg-white border border-black"
    >
      <div
        className={twMerge(`bg-[#ff6854] opacity-70 h-full rounded-full`)}
        style={{ width: `${progress.toFixed(0)}%` }}
      ></div>
    </div>
  );
};

export default ProjectProgressBar;
