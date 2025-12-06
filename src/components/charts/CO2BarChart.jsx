import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function CO2BarChart({ data, title }) {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 24,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1A3D28',
        titleColor: '#FFFFFF',
        bodyColor: '#B8D4C0',
        borderColor: '#4A7C59',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.parsed.x} t CO₂`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(74, 124, 89, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#B8D4C0',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#B8D4C0',
          font: {
            size: 11,
          },
        },
      },
    },
  };

  return (
    <Card sx={{ height: '100%', backgroundColor: '#122A1C' }}>
      <CardContent sx={{ p: 2, height: '100%' }}>
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 600,
            color: '#FFFFFF',
            mb: 2,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ height: 300 }}>
          <Bar data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default CO2BarChart;


