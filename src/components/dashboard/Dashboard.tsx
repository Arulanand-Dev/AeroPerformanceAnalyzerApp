import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import LineChart from "./LineChart"; // Import the reusable LineChart component
import { getChartOptions } from "./chartOptions"; // Import the chart options function
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTelemetryData, clearTelemetryData } from "../../services/api";

interface TelemetryData {
  time: number;
  telemetry: {
    time: number;
    channel: number;
    outing: number;
    value: number;
  }[];
}

const colors = {
  condition1: {
    border: "rgba(0, 123, 255, 1)", // Bright blue
    background: "rgba(0, 123, 255, 0.1)",
  },
  condition2: {
    border: "rgba(40, 167, 69, 1)", // Green
    background: "rgba(40, 167, 69, 0.1)",
  },
  conditionMet: {
    border: "rgba(220, 53, 69, 1)", // Red
    background: "rgba(220, 53, 69, 0.3)",
  },
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Fetch telemetry data
  const { data, error, isLoading } = useQuery<TelemetryData[], Error>({
    queryKey: ["telemetryData"],
    queryFn: getTelemetryData,
  });

  // Mutation to clear telemetry data
  const { mutate: clearData } = useMutation({
    mutationFn: clearTelemetryData,
    onSuccess: () => {
      // Optionally refetch the telemetry data or navigate
      navigate("/"); // Redirect after clearing
    },
    onError: () => {
      console.error("Error clearing telemetry data");
    },
  });

  // Loading and error states
  if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading data</p>;
  if (!data || data.length === 0)
    return <p className="text-center text-gray-500">Telemetry data is empty</p>;

  // Process channel data for charts
  const channel2Data = data.map((entry) => {
    const channel2 = entry.telemetry.find((t) => t.channel === 2);
    return {
      time: entry.time,
      value: channel2 ? channel2.value : 0,
      conditionMet: channel2 ? channel2.value < -0.5 : false,
    };
  });

  const channel7Data = data.map((entry) => {
    const channel7 = entry.telemetry.find((t) => t.channel === 7);
    return {
      time: entry.time,
      value: channel7 ? channel7.value : 0,
      conditionMet: channel7 ? channel7.value < 0 : false,
    };
  });

  const bothConditionsData = data.map((entry) => {
    const channel2 = entry.telemetry.find((t) => t.channel === 2);
    const channel7 = entry.telemetry.find((t) => t.channel === 7);
    return {
      time: entry.time,
      value:
        channel2 && channel7 && channel2.value < -0.5 && channel7.value < 0
          ? 1
          : 0,
      conditionMet:
        channel2 && channel7 && channel2.value < -0.5 && channel7.value < 0,
    };
  });

  // Prepare chart data
  const chartData1 = {
    labels: channel2Data.map((d) => d.time),
    datasets: [
      {
        label: "Channel 2 Values",
        data: channel2Data.map((d) => d.value),
        borderColor: colors.condition1.border,
        backgroundColor: colors.condition1.background,
        fill: false,
        tension: 0.3,
      },
      {
        label: "Condition 1 Met",
        data: channel2Data.map((d) => (d.conditionMet ? d.value : null)),
        borderColor: colors.conditionMet.border,
        backgroundColor: colors.conditionMet.background,
        fill: false,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartData2 = {
    labels: channel7Data.map((d) => d.time),
    datasets: [
      {
        label: "Channel 7 Values",
        data: channel7Data.map((d) => d.value),
        borderColor: colors.condition2.border,
        backgroundColor: colors.condition2.background,
        fill: false,
        tension: 0.3,
      },
      {
        label: "Condition 2 Met",
        data: channel7Data.map((d) => (d.conditionMet ? d.value : null)),
        borderColor: colors.conditionMet.border,
        backgroundColor: colors.conditionMet.background,
        fill: false,
        pointStyle: "circle",
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartData3 = {
    labels: bothConditionsData.map((d) => d.time),
    datasets: [
      {
        label: "Channel 2 Values",
        data: channel2Data.map((d) => d.value),
        borderColor: colors.condition1.border,
        backgroundColor: colors.condition1.background,
        fill: false,
        tension: 0.3,
      },
      {
        label: "Channel 7 Values",
        data: channel7Data.map((d) => d.value),
        borderColor: colors.condition2.border,
        backgroundColor: colors.condition2.background,
        fill: false,
        tension: 0.3,
      },
      {
        label: "Both Conditions Met",
        data: bothConditionsData.map((d) => (d.conditionMet ? 1 : null)),
        borderColor: colors.conditionMet.border,
        backgroundColor: colors.conditionMet.background,
        fill: false,
        pointStyle: "star",
        pointRadius: 8,
        pointHoverRadius: 12,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Telemetry Data Analysis
      </h2>

      <div className="flex flex-col items-center">
        <div className="mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">
            Channel 2 Values &lt; -0.5
          </h3>
          <LineChart data={chartData1} options={getChartOptions()} />
        </div>

        <div className="mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">
            Channel 7 Values &lt; 0
          </h3>
          <LineChart data={chartData2} options={getChartOptions()} />
        </div>

        <div className="mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Both Conditions Met</h3>
          <LineChart data={chartData3} options={getChartOptions()} />
        </div>

        <button
          onClick={() => clearData()}
          className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 ease-in-out"
        >
          <FaTrash className="inline mr-1" /> Clear Telemetry Data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
