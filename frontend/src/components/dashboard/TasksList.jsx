// Fichier de base pour TasksList
import React, { useEffect, useState } from 'react';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('/api/taches')
      .then(res => res.json())
      .then(data => setTasks(Array.isArray(data) ? data : []))
      .catch(() => setTasks([]));
  }, []);

  const handleTest = () => {
    alert('Test CRUD tâche !');
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="mb-2 font-semibold">Liste des Tâches</h3>
      <button onClick={handleTest} className="mb-2 bg-indigo-600 text-white px-2 py-1 rounded">
        Tester CRUD
      </button>
      <ul>
        {tasks.map(t => (
          <li key={t.id} className="mb-2">
            <span className="font-medium">{t.title || t.nom || t.description || 'Tâche'}</span>
            <span className="text-xs text-gray-500 ml-2">{t.status || t.statut}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}