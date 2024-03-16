import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  name: string;
  data: any;
  color: string;
};
const PieChart = ({ chartData }: any) => {
  const options: any = {
    plugins: {
      legend: false,
      tooltip: {
        enabled: true,
        backgroundColor: "#333333",
        titleColor: "#fff",
        bodyColor: "#fff",
        displayColors: false,
        bodyFont: {
          size: 12,
          weight: "bold",
        },
        callbacks: {
          label: (toolTipItem: { raw: number }) => {
            return "$" + toolTipItem.raw + "K";
          },
        },
        yAlign: "bottom",
        boxWidth: 40,
        bodySpacing: 20,
        padding: 15,
        cornerRadius: 10,
      },
      datalabels: false,
    },
  };

  const colors = [
    "#EDE7F6", // light purple
    "#9575CD", // dark purple
    "#FFD54F", // light yellow
    "#FFA000", // dark orange
    "#81C784", // light green
    "#388E3C", // dark green
    "#64B5F6", // light blue
    "#1976D2", // dark blue
    "#F48FB1", // light pink
    "#D81B60", // dark pink
    "#B0BEC5", // light gray
    "#455A64", // dark gray
  ];

  const data: any = {
    datasets: [
      {
        data: chartData,
        backgroundColor: colors,
        borderWidth: 0.2,
      },
    ],
  };

  return (
    <div className=" w-full flex mt-4 pb-20 flex-col items-center justify-center rounded-md">
      <div className="h-[300px] w-[300px] mt-6 self-start pl-5 lg:pl-8 py-8">
        <Pie data={data} height={300} width={300} options={options} />
      </div>

      <div className="flex  gap-2 my-[30px] items-center ">
        {chartData.map((item: any, index: number) => (
          <div
            key={index}
            style={{ backgroundColor: colors[index] }}
            className="w-8 h-3 "
          ></div>
        ))}
        <h1 className="text-[#828282]">Users</h1>
      </div>
    </div>
  );
};

export default PieChart;
