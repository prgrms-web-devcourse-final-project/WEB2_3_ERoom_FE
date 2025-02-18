import { twMerge } from "tailwind-merge";
import Chart from "./Chart";
import { useState } from "react";

const PAY_DATA_FILTER = ["일일 매출", "월간 매출", "연간 매출"];

const DashBoard = () => {
  const [payDataTab, setPayDataTab] = useState("일일 매출");

  return (
    <div
      className="pl-8 pr-8 h-[calc(100vh-50px)] overflow-y-scroll
    bg-gradient-to-t from-white/0 via-[#BFCDB7]/30 to-white/0"
    >
      <div className="bg-white/60 px-5">
        <h1 className="font-bold text-[27px] mb-4">회원 데이터</h1>
        <p className="text-main-green font-bold mb-2">누적 회원 수</p>
        <div
          className="border border-main-green02 w-[170px] h-[50px] flex gap-2 mb-5
          items-center justify-center text-main-green01 font-bold rounded-[10px]"
        >
          총 구독 회원 <p className="text-[25px] text-header-red">127명</p>
        </div>
        <Chart
          data={[60, 80, 120, 120, 140]}
          labelTitle="누적 회원 수"
          label={["4주전", "3주전", "2주전", "1주전", "오늘"]}
        />
        <div className="mt-10">
          <p className="font-bold mb-5">신규 회원 수</p>
          <Chart
            data={[30, 20, 40, 0, 15]}
            labelTitle="신규 회원 수"
            label={["4주전", "3주전", "2주전", "1주전", "오늘"]}
          />
        </div>

        {/* 결제 데이터 */}
        <div className="mt-10">
          <p className="font-bold text-[20px] mb-5">결제 데이터</p>

          <ul className="flex gap-5 font-bold mb-5">
            {PAY_DATA_FILTER.map((payData, idx) => {
              return (
                <li
                  key={idx}
                  className={twMerge(
                    `w-[80px] h-[30px] bg-white flex items-center justify-center
                    border border-header-green rounded-[3px] text-header-green cursor-pointer
                    ${
                      payDataTab === payData &&
                      "text-main-beige01 bg-header-green border-none"
                    }`
                  )}
                  onClick={() => setPayDataTab(payData)}
                >
                  {payData}
                </li>
              );
            })}
          </ul>
          <Chart
            labelTitle="매출액"
            data={[15, 13, 20, 0, 10]}
            label={["1/17", "1/22", "2/1", "2/11", "오늘"]}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
