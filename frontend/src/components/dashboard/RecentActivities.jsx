// Fichier de base pour RecentActivities
import React, { useEffect, useState } from 'react';

function RecentActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch('/api/interactions')
      .then(res => res.json())
      .then(data => setActivities(Array.isArray(data) ? data : []))
      .catch(() => setActivities([]));
  }, []);

  const handleTest = () => {
    alert('Test CRUD activité !');
  };

  const icon = type =>
    type === 'Appel' ? '📞' : type === 'Email' ? '📧' : '📅';

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="mb-2 font-semibold">Activités Récentes</h3>
      <button onClick={handleTest} className="mb-2 bg-indigo-600 text-white px-2 py-1 rounded">
        Tester CRUD
      </button>
      <ul>
        {activities.map(a => (
          <li key={a.id} className="flex items-center mb-2">
            <span className="text-xl mr-2">{icon(a.type)}</span>
            <span className="flex-1 text-sm">
              {a.type} avec {a.prospect || a.first_name || a.last_name || a.contact_id}
            </span>
            <span className="text-xs text-gray-500 ml-2">
              {a.date || a.scheduled_at || a.completed_at}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivities;