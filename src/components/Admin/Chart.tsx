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
}

const Chart = ({ data, labelTitle }: ChartProps) => {
  const chartData: ChartData<"line"> = {
    labels: ["4주전", "3주전", "2주전", "1주전", "오늘"],
    datasets: [
      {
        label: labelTitle,
        data: data,
        borderColor: "#FF6854",
        backgroundColor: "#ff68546a",
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8, // 마우스 올릴 때 점 크기
        pointBackgroundColor: "#FF6854", // 점 내부 색상
        pointBorderColor: "#FF6854", // 점 테두리 색상
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
        max: Math.max(...data) + 30,
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
