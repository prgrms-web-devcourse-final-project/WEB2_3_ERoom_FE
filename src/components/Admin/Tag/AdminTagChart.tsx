import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { searchTagCount } from "../../../api/search";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminTagChart = () => {
  const { data: tagCount, isLoading } = useQuery({
    queryKey: ["adminTagCount"],
    queryFn: searchTagCount,
  });
  useEffect(() => {
    console.log(tagCount);
  }, [tagCount]);

  const data = {
    labels: tagCount ? Object.keys(tagCount) : [],
    datasets: [
      {
        label: "빈도 수",
        data: tagCount ? Object.values(tagCount) : [],
        backgroundColor: "#46544885", // 바 색상
        borderColor: "#46544885",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // 범례 위치
      },
      title: {
        display: true,
        text: "태그 빈도 수",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px]">
        <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse rounded"></div>
      </div>
    );
  }

  return <Bar data={data} options={options} width={""} height={100} />;
};

export default AdminTagChart;
