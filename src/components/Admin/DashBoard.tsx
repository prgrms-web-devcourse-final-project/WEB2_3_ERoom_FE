import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart";
import { getAdminDashboard } from "../../api/admin";
import dayjs from "dayjs";

const DashBoard = () => {
  const { data: dashboardData } = useQuery<DashboardType[]>({
    queryKey: ["AdminDashboardData"],
    queryFn: getAdminDashboard,
  });

  if (!dashboardData) {
    return <div>로딩</div>;
  }

  const totalMembers = dashboardData[0].totalMembers;
  const newMembers = dashboardData[0].newMembers;

  return (
    <div
      className="pl-8 pr-8 h-[calc(100vh-50px)] 
    bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
    >
      <div className="bg-white/60 px-5">
        <h1 className="font-bold text-[27px] mb-4">회원 데이터</h1>
        <div
          className="border border-main-green02 w-[170px] h-[50px] flex gap-2 mb-5
            items-center justify-center text-main-green01 font-bold rounded-[10px]"
        >
          총 회원{" "}
          <p className="text-[25px] text-header-red">
            {totalMembers[totalMembers.length - 1].totalMembers}명
          </p>
        </div>
        <p className="text-main-green font-bold mb-2">누적 회원 수</p>
        <Chart
          data={totalMembers.map((totalInfo) => totalInfo.totalMembers)}
          labelTitle="누적 회원 수"
          label={totalMembers.map((totalInfo) =>
            dayjs(totalInfo.startDate).format("MM/DD")
          )}
        />
        <div className="mt-10">
          <p className="font-bold mb-5">신규 회원 수</p>
          <Chart
            data={newMembers.map((newInfo) => newInfo.newMembers)}
            labelTitle="신규 회원 수"
            label={newMembers.map((newInfo) =>
              dayjs(newInfo.date).format("MM/DD")
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
