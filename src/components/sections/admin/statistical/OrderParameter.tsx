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
import { getOrderStatisticsByMonth } from "@/src/lib/api";

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
      text: "Biểu đồ đường thống kê đơn hàng",
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

const OrderParameter = () => {
  const { data: dataStOrder } = useQuery(
    ["listOrders"],
    async () => {
      try {
        const res = await getOrderStatisticsByMonth();
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
        label: "Đơn hàng",
        data: dataStOrder,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default OrderParameter;
