import DoughnutChart from './spending-components/DoughnutChart';
import { Chart } from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import { useUserData } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';


Chart.register(CategoryScale);

export default function Spending() {
  const { userCategories } = useUserData();
  const navigate = useNavigate();

  const spendingData = {
    labels: userCategories.map(category => category.categoryName),
    datasets: [{
      data: userCategories.map(category => category.total),
      backgroundColor: userCategories.map(category => category.color),
      hoverOffset: 4
    }],
  };

  const chartOptions = {
    cutout: '55%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            // Adding "$" before the value for hover
            const value = tooltipItem.raw;
            return ` $${value.toLocaleString()}`; // Formats the value with commas as needed
          }
        }
      },
      legend: {
        labels: {
          font: {
            size: 20,
          },
        }
      }
    },
  };

  const totals = userCategories.map(category => category.total);
  const totalSpending = totals.reduce((total, curr) => total + curr, 0);

  return (
    <div className="h-full overflow-y-hidden flex flex-col items-center gap-4">
      <h1 className="text-4xl font-semibold mt-8 mb-2">
        Tracked Spending
      </h1>
      <DoughnutChart chartData={spendingData} chartOptions={chartOptions} /> 
      <h2 className="text-3xl font-medium">
        Total: ${totalSpending}
      </h2>
      <button
        className="self-center w-36 px-8 py-3 mt-3 text-lg bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300 shadow-sm"
        onClick={() => navigate("/home")}
      >
        Done
      </button>
    </div>
  );
}