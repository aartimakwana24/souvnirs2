import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    layout: {
      padding: {
        bottom: 50,
      },
    },
  },
};

const DoughnutChart = ({ data }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
