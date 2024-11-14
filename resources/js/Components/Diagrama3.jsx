import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const DiagraPastel = () => {
  // Datos del gráfico
  const data = {
    labels: ['Hombres', 'Mujeres'], // Etiquetas de género
    datasets: [
      {
        label: 'Distribución por género',
        data: [200, 180], // Número de hombres y mujeres inscritos
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'], // Colores para hombres y mujeres
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'], // Colores de borde
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
        text: 'Distribución de Inscritos por Género',
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
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default DiagraPastel;