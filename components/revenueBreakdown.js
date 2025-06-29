import { GraphContainer } from '@/utils/graphContainerStyle';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


// Register required elements for Doughnut charts
ChartJS.register(ArcElement, Tooltip, Legend);

export function RevenueChart() {
  const data = {
    labels: ['Electronics', 'Fashion', 'Home & Kitchen', 'Books'],
    datasets: [
      {
        data: [30000, 19000, 28000, 15000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    
    <GraphContainer className="graph-container">
      <Doughnut 
        data={data} 
        options={{ 
          plugins: { 
            title: { display: true, text: 'Revenue by Category' } 
          } 
        }} 
      />
    </GraphContainer>
  );
}