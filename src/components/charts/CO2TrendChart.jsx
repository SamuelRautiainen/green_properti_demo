import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function CO2TrendChart({ data }) {
  const chartData = {
    labels: data.labels,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      tension: 0.4,
      fill: true,
      pointRadius: 3,
      pointHoverRadius: 6,
      pointBackgroundColor: dataset.borderColor,
      pointBorderColor: '#122A1C',
      pointBorderWidth: 2,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
          label: (context) => `${context.parsed.y} kg CO₂/m²`,
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
          color: 'rgba(74, 124, 89, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#B8D4C0',
          font: {
            size: 11,
          },
          callback: (value) => `${value}`,
        },
        min: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
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
          CO₂ trendi – Portfolio
        </Typography>
        <Box sx={{ height: 280 }}>
          <Line data={chartData} options={options} />
        </Box>
        <Box sx={{ display: 'flex', gap: 3, mt: 2, justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 3,
                backgroundColor: '#4A7C59',
                borderRadius: 1,
              }}
            />
            <Typography variant="caption" sx={{ color: '#B8D4C0' }}>
              CO₂ kg/m²
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CO2TrendChart;


