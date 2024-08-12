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
  "Tháng Sáu",
  "Tháng Bảy",
  "Tháng Tám",
  "Tháng Chín",
  "Tháng Mười",
  "Tháng Mười Một",
  "Tháng Mười Hai",
  "Tháng Một",
  "Tháng Hai",
  "Tháng Ba",
  "Tháng Tư",
  "Tháng Năm",
];

const data = {
  labels,
  datasets: [
    {
      label: "Lượt truy cập",
      data: [80, 82, 90, 138, 140, 150, 152, 182, 200, 210, 190, 220],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const AccessParamter = () => {
  return <Line options={options} data={data} />;
};

export default AccessParamter;
