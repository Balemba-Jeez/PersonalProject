import { GraphContainer } from '@/utils/graphContainerStyle';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// ✅ Register only what Line chart needs
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

export function VisitorsChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Unique Visitors',
        data: [320, 420, 510, 580, 500, 750, 650],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <GraphContainer className="graph-container">
      <Line 
        data={data} 
        options={{ 
          responsive: true,
          plugins: { 
            title: { display: true, text: 'Weekly Website Visitors' } 
          } 
        }} 
      />
    </GraphContainer>
  );
}
