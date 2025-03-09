interface TagCountBoxProps {
  title: string;
  count: number | undefined;
}

const TagCountBox = ({ title, count }: TagCountBoxProps) => {
  return (
    <div className="border w-[300px] px-[10px] py-[5px] rounded-[10px] border-main-green01 shadow-md">
      <p className="text-[14px]">{title}</p>
      <p className="font-bold text-[22px]">{count}개</p>
    </div>
  );
};

export default TagCountBox;
