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

  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // WebSocket for training updates
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/train');

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

  // WebSocket for drone control
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/control');

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log('Received from server:', event.data);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  const sendCommand = (command: string) => {
    if (socketRef.current && isConnected) {
      socketRef.current.send(command);
      console.log(`Sent command: ${command}`);
    } else {
      console.warn('WebSocket is not connected');
    }
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 className="text-2xl font-bold mb-4">Live Model Training Demo</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
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

      <h2 className="text-xl font-bold mb-2">Drone Control Panel</h2>
      <div className="p-4 space-y-4">
        <div className="space-x-2">
          <button
            onClick={() => sendCommand('takeoff')}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Takeoff
          </button>
          <button
            onClick={() => sendCommand('move_forward')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Move Forward
          </button>
          <button
            onClick={() => sendCommand('land')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Land
          </button>
          <button
            onClick={() => sendCommand('move_backward')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Move Backward
          </button>
          <button
            onClick={() => sendCommand('turn_left')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Turn Left
          </button>
          <button
            onClick={() => sendCommand('turn_right')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Turn Right
          </button>
        </div>
        <p>Status: {isConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      </div>
    </div>
  );
}
