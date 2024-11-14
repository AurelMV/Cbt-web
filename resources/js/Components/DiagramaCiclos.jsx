import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import React from 'react';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EnrollmentAnalysis() {
  // Datos estáticos de ejemplo
  const ciclos = ["Ciclo 1", "Ciclo 2", "Ciclo 3", "Ciclo 4"];
  const inscripcionesPorCiclo = {
    "Ciclo 1": 30,
    "Ciclo 2": 45,
    "Ciclo 3": 25,
    "Ciclo 4": 50,
  };

  // Datos para el gráfico
  const chartData = {
    labels: ciclos, // Los nombres de los ciclos
    datasets: [
      {
        label: 'Número de Inscripciones',
        data: ciclos.map((ciclo) => inscripcionesPorCiclo[ciclo]),
        borderColor: '#FF5733', // Color de la línea
        backgroundColor: 'rgba(255, 87, 51, 0.2)', // Color de fondo de los puntos
        fill: true, // Rellenar el área debajo de la línea
        tension: 0.4, // Curvatura de la línea
      },
    ],
  };

  // Opciones para el gráfico
  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Inscripciones: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Análisis de Inscripciones por Ciclo</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}