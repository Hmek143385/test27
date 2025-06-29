import React, { useEffect, useState } from 'react';

export default function RecentProspects() {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => setProspects(data))
      .catch(() => setProspects([]));
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="mb-2 font-semibold">Prospects Récents</h3>
      <ul>
        {prospects.slice(0, 5).map(p => (
          <li key={p.id} className="mb-2">
            <span className="font-medium">{p.first_name || ''} {p.last_name || ''}</span>
            <span className="text-xs text-gray-500 ml-2">{p.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}