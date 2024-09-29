import DoughnutChart from './spending-components/DoughnutChart';
import { Chart, ChartOptions, CategoryScale } from 'chart.js/auto';
import { useUserData } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, useRef, useState } from 'react';
import { getElementsAtEvent } from 'react-chartjs-2';
import Transaction from './mark-components/Transaction';

Chart.register(CategoryScale);

interface Category {
  categoryName: string;
  total: number;
  color: string;
  transactions: TransactionType[];
}

interface TransactionType {
  id: string;
  date: string;
  description: string;
  amount: string;
}

export default function Spending() {
  const { userCategories } = useUserData();
  const navigate = useNavigate();
  const chartRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const spendingData = {
    labels: userCategories.map(category => category.categoryName),
    datasets: [{
      data: userCategories.map(category => category.total),
      backgroundColor: userCategories.map(category => category.color),
      hoverOffset: 4
    }],
  };

  const chartOptions: ChartOptions<'doughnut'> = {
    cutout: '55%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem: { raw: number }) {
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

  // Get the category when clicking a doughnut chart segment
  const handleClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (getElementsAtEvent(chartRef.current, event).length > 0) {
      const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index;
      setSelectedCategory(userCategories[dataPoint]);
    }
  }

  const totals = userCategories.map(category => category.total);
  const totalSpending = (totals.reduce((total, curr) => total + curr, 0)).toFixed(2);

  const transactions: JSX.Element[] = [];
  if (selectedCategory) {
    const categoryTransactions = selectedCategory.transactions;
    categoryTransactions.forEach((transaction, index) => {
      transactions.push(
        <Transaction
          key={index} 
          id={transaction.id}
          date={transaction.date} 
          description={transaction.description} 
          amount={"$" + transaction.amount.substring(1)}
          selected={false}
          onToggle={() => {}}
        />
      );
    });
  }

  return (
    <div className="h-full overflow-y-hidden">
      <h1 className="text-4xl font-semibold mt-8 mb-6 text-center">
        Tracked Spending
      </h1> 

      <div className="px-4 flex">
        <div className="flex-grow flex flex-col items-center gap-4">
          <DoughnutChart 
            chartData={spendingData} 
            chartOptions={chartOptions} 
            onClick={handleClick}
            chartRef = {chartRef}
          /> 
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
        {selectedCategory && (
          <div className="flex-grow-[5] w-[28rem] flex mr-1">
            <div className="w-[1px] h-6/7 bg-slate-300 my-2 mr-10"></div>

            <div className="flex-grow">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-medium text-center">
                  {selectedCategory.categoryName}
                </h3>
                <div className="flex flex-col h-[34rem] pr-1 gap-2 overflow-y-auto">
                  {transactions}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}