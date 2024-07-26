import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    title: {
      display: true,
      text: "Sales Report", 
      font: {
        size: 20,
        weight: "bold",
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, 
      },
      ticks: {
        display: true,
        font: {
          size: 12,
          color: "red", // Change the X-axis label color
        },
      },
    },
    y: {
      grid: {
        display: false, // Hide the horizontal grid lines
      },
      ticks: {
        display: false, // Hide the Y-axis ticks
      },
    },
  },
  layout: {
    // padding: 5, // Add some padding to the chart area
  },
};

var labels = ["January", "February", "March", "April", "May", "June", "July"];

const dataset1Data = [500, 300, 750, 200, 400, 800, 600];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: dataset1Data,
      backgroundColor: "#4C62C3",
    },
  ],
};
