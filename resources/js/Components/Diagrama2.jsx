import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { usePage } from '@inertiajs/react';

// Registrar los elementos de Chart.js
ChartJS.register(CategoryScale, BarElement, Title, Tooltip, Legend);

const DiagramaBarras = () => {

  const { programas, inscritosPorPrograma } = usePage().props;
  console.log(programas);
  console.log(inscritosPorPrograma);
  // Datos del gráfico
  const data = {
    labels: inscritosPorPrograma.map((programa) => programa.programa), // Nombres de los programas
    datasets: [
      {
        label: 'Inscritos por programa',
        data: programas.map((programa) => {
          const inscrito = inscritosPorPrograma.find((p) => p.programa === programa.nombre);
          return inscrito ? inscrito.inscritos : 0;}), // Número de inscritos por programa
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color de las barras
        borderColor: 'rgba(54, 162, 235, 1)', // Color del borde de las barras
        borderWidth: 1, // Grosor del borde
      },
    ],
  };

  console
  // Opciones del gráfico
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Inscritos por Programa de Estudios',
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
    <div style={{ width: '100%', height: '100%', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default DiagramaBarras;