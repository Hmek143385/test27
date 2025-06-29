import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function TachesList() {
  const [taches, setTaches] = useState([]);

  useEffect(() => {
    fetch('/api/taches')
      .then(res => res.json())
      .then(data => setTaches(data))
      .catch(() => setTaches([]));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Tâches</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Titre</th>
            <th className="border px-2 py-1">Statut</th>
            <th className="border px-2 py-1">Assignée à</th>
            <th className="border px-2 py-1">Échéance</th>
            <th className="border px-2 py-1">Détail</th>
          </tr>
        </thead>
        <tbody>
          {taches.map(t => (
            <tr key={t.id}>
              <td className="border px-2 py-1">{t.titre}</td>
              <td className="border px-2 py-1">{t.statut}</td>
              <td className="border px-2 py-1">{t.assigned_to}</td>
              <td className="border px-2 py-1">{t.due_date}</td>
              <td className="border px-2 py-1">
                <Link to={`/taches/${t.id}`} className="text-blue-600 underline">Voir</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TachesList;