import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register necessary components
ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend);

const StockChart = () => {
  const [stockData, setStockData] = useState([]);
  const lastValueRef = useRef(100); // Starting price
  const maxChange = 0.5; // Maximum change per second
  const numPoints = 50; // Maximum number of data points to display

  // Function to generate initial random data points
  const generateInitialData = () => {
    let initialData = [];
    for (let i = 0; i < 20; i++) {
      const change = (Math.random() - 0.5) * maxChange;
      const newValue = Math.max(0, (lastValueRef.current + change).toFixed(2));
      lastValueRef.current = newValue;
      initialData.push({ x: new Date(Date.now() - (20 - i) * 1000), y: newValue });
    }
    return initialData;
  };

  // Generate initial data points
  useEffect(() => {
    const initialData = generateInitialData();
    setStockData(initialData);
  }, []);

  const generateRandomData = () => {
    const change = (Math.random() - 0.5) * maxChange; // Change between -0.5 and +0.5
    const newValue = Math.max(0, (lastValueRef.current + change).toFixed(2)); // Prevent negative prices
    lastValueRef.current = newValue;

    const newDataPoint = { x: new Date(), y: newValue };
    setStockData((prevData) => {
      const updatedData = [...prevData, newDataPoint];
      if (updatedData.length > numPoints) {
        updatedData.shift(); // Remove the oldest point
      }
      return updatedData;
    });
  };

  useEffect(() => {
    const interval = setInterval(generateRandomData, 1000);
    return () => clearInterval(interval);
  }, []);

  // Create dataset for the line with color logic
  const getLineDataset = () => {
    const lineData = stockData.map((point, index) => {
      if (index === 0) return { ...point, color: 'rgba(0, 255, 0, 0.7)' }; // Default color for the first point
      const prevPoint = stockData[index - 1];
      return {
        ...point,
        color: point.y < prevPoint.y ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 255, 0, 0.7)',
      };
    });

    return {
      label: 'Stock Price',
      data: lineData,
      borderColor: lineData.map(point => point.color), // Apply colors based on the condition
      borderWidth: 3,
      tension: 0.4, // Smooth line
      fill: false,
    };
  };

  const data = {
    datasets: [
      getLineDataset(), // Single dataset with dynamic color
      {
        label: 'Stock Points',
        data: stockData,
        backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent for points
        borderColor: 'transparent', // No border color
        pointRadius: 8, // Size of points
        pointHoverRadius: 7, // Size of points on hover
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
          tooltipFormat: 'MMM d, yyyy HH:mm:ss',
        },
        grid: {
          display: false, // Hide grid lines
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          color: '#e0e0e0', // Light grid color for better visibility
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <Line options={options} data={data} />
    </div>
  );
};

export default StockChart;
