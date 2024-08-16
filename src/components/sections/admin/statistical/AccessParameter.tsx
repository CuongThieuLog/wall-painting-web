import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getAccessStatisticsByMonth } from "@/src/lib/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      text: "Biểu đồ đường thống kê lượt truy cập",
      display: true,
    },
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai",
];

const AccessParamter = () => {
  const { data: dataStAccess } = useQuery(
    ["listAccess"],
    async () => {
      try {
        const res = await getAccessStatisticsByMonth();
        return res?.data;
      } catch (err: any) {
        throw err;
      }
    },
    { keepPreviousData: true }
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Lượt truy cập",
        data: dataStAccess,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default AccessParamter;
