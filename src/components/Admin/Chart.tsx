import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

interface ChartProps {
  data: number[];
  labelTitle: string;
  label: string[];
}

const Chart = ({ data, labelTitle, label }: ChartProps) => {
  const chartData: ChartData<"line"> = {
    labels: label,
    datasets: [
      {
        label: labelTitle,
        data: data,
        borderColor: labelTitle !== "매출액" ? "#FF6854" : "#657166",
        backgroundColor: labelTitle !== "매출액" ? "#ff68546a" : "#6571666a",
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8, // 마우스 올릴 때 점 크기
        pointBackgroundColor: labelTitle !== "매출액" ? "#FF6854" : "#657166", // 점 내부 색상
        pointBorderColor: labelTitle !== "매출액" ? "#FF6854" : "#657166", // 점 테두리 색상
        pointBorderWidth: 2, // 점 테두리 두께
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...data) + 40,
      },
    },
  };

  return (
    <div className="">
      <Line data={chartData} options={options} height={50} />
    </div>
  );
};

export default Chart;
