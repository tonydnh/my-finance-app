import { Doughnut } from 'react-chartjs-2';

export default function DoughnutChart({ chartData, chartOptions, onClick, chartRef }) {
  return (
    <div className="w-96 h-96">
      <Doughnut
        data={chartData}
        options={chartOptions}
        onClick={onClick}
        ref={chartRef}
      />
    </div>
  );
}