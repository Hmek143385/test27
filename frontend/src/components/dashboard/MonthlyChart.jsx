import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function MonthlyChart() {
  const data = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Nouveaux prospects',
        data: [3, 5, 7, 4, 6, 5],
        backgroundColor: 'rgba(79,70,229,0.7)'
      }
    ]
  };
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="mb-2 font-semibold">Performance Mensuelle</h3>
      <Bar data={data} options={{ plugins: { legend: { display: false } } }} />
    </div>
  );
}

// Ce composant affiche un graphique mensuel statique.
// Pour afficher des données dynamiques, récupérez-les depuis l'API backend (ex: via fetch ou axios) et mettez à jour le state.

export default MonthlyChart;