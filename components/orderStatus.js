import { GraphContainer } from '@/utils/graphContainerStyle';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// ✅ Register required chart types for Bar
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

export function OrdersChart() {
  const data = {
    labels: ['Completed', 'Processing', 'Shipped', 'Cancelled'],
    datasets: [
      {
        label: 'Orders',
        data: [120, 30, 45, 10],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
      },
    ],
  };

  return (
    <GraphContainer className="graph-container">
      <Bar 
        data={data} 
        options={{ 
          responsive: true,
          plugins: {
            title: { display: true, text: 'Order Status Distribution' },
          },
        }} 
      />
    </GraphContainer>
  );
}
