import { useNavigate, useParams } from "react-router";

const MeetingRoomProjectBox = ({
  id,
  title,
  index,
}: {
  id: number;
  title: string;
  index: number;
}) => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const handleClick = () => {
    navigate(`/meeting-room/${id}`);
  };

  return (
    <div className="flex cursor-pointer" onClick={handleClick}>
      {/* 프로젝트 넘버 */}
      <div
        className={`border w-full h-[70px] flex 
          gap-5 items-center font-bold ${
            Number(projectId) === id
              ? "bg-header-green border-logo-green"
              : "bg-white border-[#CAD2CB]"
          }`}
      >
        <div className="flex items-center w-full">
          <div className="w-[80px] px-[11.5px]">
            <span
              className={`text-[50px] font-notoTC mt-0 ${
                Number(projectId) === id
                  ? "text-main-beige02"
                  : "text-main-green02"
              }`}
            >
              {index + 1}
            </span>
          </div>
          <div className="flex-grow flex justify-between px-[20px]">
            <div className="self-center">
              <span
                className={`font-bold ${
                  Number(projectId) === id
                    ? "text-main-beige01"
                    : "text-main-green"
                }`}
              >
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomProjectBox;
