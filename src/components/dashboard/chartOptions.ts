import { ChartOptions } from "chart.js";

export const getChartOptions = (): ChartOptions<"line"> => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#495057",
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        titleColor: "#495057",
        bodyColor: "#495057",
        borderColor: "#dee2e6",
        borderWidth: 1,
        callbacks: {
          label: function (tooltipItem) {
            const time = tooltipItem.label; // Access the time from the labels
            const datasetLabel = tooltipItem.dataset.label;

            // Check if it's the "Condition Met" line
            if (
              datasetLabel?.includes("Condition 1 Met") ||
              datasetLabel?.includes("Condition 2 Met") ||
              datasetLabel?.includes("Both Conditions Met")
            ) {
              return `${datasetLabel}: Time ${time}`;
            }

            // Otherwise, show the value for other lines
            return `${datasetLabel}: Value ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Time (seconds)",
          color: "#495057",
          font: {
            size: 16,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
        grid: {
          color: "rgba(222, 226, 230, 0.5)",
        },
        ticks: {
          color: "#495057",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
          color: "#495057",
          font: {
            size: 16,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
        grid: {
          color: "rgba(222, 226, 230, 0.5)",
        },
        ticks: {
          color: "#495057",
        },
      },
    },
  };
};
