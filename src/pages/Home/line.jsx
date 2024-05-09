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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineBar = () => {
  return (
    <Line
      options={{
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      }}
      data={{
        labels: [
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023",
          "2024",
        ],
        datasets: [
          {
            label: "Count of People",
            data: [720, 720, 720, 720, 650, 650, 650, 750, 700, 702], // Replace with your actual data
            fill: false,
            borderColor: "#00569E",
            tension: 0.1,
          },
        ],
      }}
    />
  );
};

export default LineBar;
