import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

interface LineChartProps {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default LineChart;
