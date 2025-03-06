interface AdminTagBoxProps {
  name: string;
}

const AdminTagBox = ({ name }: AdminTagBoxProps) => {
  return (
    <div className="grid grid-cols-[9.4%_1fr_12.5%_12.5%] w-full h-[33px] text-main-green border-b border-b-main-green">
      <div className="flex justify-center">
        <span>No.</span>
      </div>
      <div className="flex justify-center">
        <span>{name}</span>
      </div>
      <div className="flex justify-center">
        <span>수정</span>
      </div>
      <div className="flex justify-center">
        <span>삭제</span>
      </div>
    </div>
  );
};

export default AdminTagBox;
