'use client';

import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface ChartDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  fill: boolean;
}

interface ChartData {
  labels: (string | number)[];
  datasets: ChartDataset[];
}

export default function Home() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Loss',
        data: [],
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: false,
      },
      {
        label: 'Accuracy',
        data: [],
        borderColor: '#36a2eb',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
   const ws = new WebSocket('ws://100.66.139.58:5000/ws/train'); // ✅ correct format
 // match your FastAPI backend

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.done) return;

      setChartData((prev) => ({
        ...prev,
        labels: [...prev.labels, data.epoch],
        datasets: [
          {
            ...prev.datasets[0],
            data: [...prev.datasets[0].data, data.loss],
          },
          {
            ...prev.datasets[1],
            data: [...prev.datasets[1].data, data.accuracy],
          },
        ],
      }));
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Live Model Training Demo</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: 'Epoch' } },
              y: { title: { display: true, text: 'Value' }, beginAtZero: true },
            },
          }}
        />
      </div>
    </div>
  );
}
