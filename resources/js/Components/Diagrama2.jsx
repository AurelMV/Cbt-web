import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los elementos de Chart.js
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const DiagramaBarras = () => {
  // Datos del gráfico
  const data = {
    labels: ['Programa A', 'Programa B', 'Programa C', 'Programa D', 'Programa E'], // Nombres de los programas
    datasets: [
      {
        label: 'Inscritos por programa',
        data: [120, 150, 180, 90, 200], // Número de inscritos por programa
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color de las barras
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
        borderWidth: 1, // Grosor del borde
      },
    ],
  };

  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Inscripciones por programa de estudio',
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} inscritos`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Asegura que el eje Y comience en cero
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DiagramaBarras;