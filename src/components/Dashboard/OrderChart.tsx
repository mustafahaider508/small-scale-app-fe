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
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const OrderChart = ({ chartData }: any) => {
  const options: any = {
    responsive: true,
    plugins: {
      legend: false,
      tooltip: {
        enabled: true,
        mode: "index",
        interset: false,
        titleColor: "#111827",
        backgroundColor: "#FFFFFF",
        bodyColor: "#111827",
        displayColors: false,
        borderColor: "rgba(0, 0, 0, 0.06)",
        borderWidth: 1.5,
        bodyFont: {
          size: 12,
          weight: "bold",
        },
        boxWidth: 90,
        boxHeight: 90,
        bodySpacing: 20,
        padding: 15,
        cornerRadius: 10,

        callbacks: {
          label: (toolTipItem: { raw: number }) => {
            return "$" + toolTipItem.raw + "K";
          },
        },
      },
    },

    scales: {
      x: {
        border: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 13,
            weight: 600,
          },
        },
      },
      y: {
        border: {
          display: false,
        },
        ticks: {
          callback: function (value: number) {
            return value + "k"; // Add 'k' suffix to y-axis labels
          },
          stepSize: 40, // Define the step size between y-axis ticks
          color: "#6B7280", // Customize y-axis tick color
          font: {
            size: 13, // Font size
            weight: 600, // Font weight
          },
        },
        grid: {
          color: "#F3F4F6", // Customize y-axis grid color
          drawBorder: false, // Hide y-axis border
        },
      },
    },
  };

  const labels = ["Jan", "Feb", "Mar", "Apr", "June", "July", "Oct"];

  const data: any = {
    labels,
    datasets: [
      {
        label: "",
        data: chartData,
        borderColor: "#009FE3",
        pointStyle: false, // Set point style to none
        showLine: true, // Hide the line between data points
        tension: 0.4,
        borderWidth: 3,
        fillColor: "rgba(250,124,50,0.5)",
        fill: {
          target: "origin",
        },
        beginAtZero: true,
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx; //gradient under line
          const gradient = ctx.createLinearGradient(0, 0, 0, 350);
          gradient.addColorStop(0.1, "rgba(52, 178, 233,  0.1)");
          gradient.addColorStop(0.2, "rgba(52, 178, 233,  0.2)");
          gradient.addColorStop(0.7, "rgba(255, 255, 255, 0)");
          return gradient;
        },
        pointBackgroundColor: "transparent",
      },
    ],
  };
  return (
    <>
      <style>
        {`
          .chartjs-render-monitor {
            border: none !important;
          }
        `}
      </style>
      <Line options={options} data={data} />
    </>
  );
};
