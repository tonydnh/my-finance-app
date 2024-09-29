import { ChartData, ChartOptions } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
  chartData: ChartData<'doughnut'>;
  chartOptions: ChartOptions<'doughnut'>;
  onClick?: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, elements: any[]) => void;
  chartRef?: React.RefObject<any>;
}

export default function DoughnutChart({ chartData, chartOptions, onClick, chartRef }: DoughnutChartProps) {
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