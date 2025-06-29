import React, { useEffect, useState } from 'react';

export default function SourceBar() {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => {
        // Regrouper les contacts par source
        const grouped = data.reduce((acc, curr) => {
          acc[curr.source] = (acc[curr.source] || 0) + 1;
          return acc;
        }, {});
        setSources(Object.entries(grouped));
      })
      .catch(() => setSources([]));
  }, []);

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="mb-2 font-semibold">Répartition par Source</h3>
      <ul>
        {sources.map(([source, count]) => (
          <li key={source} className="mb-2">
            <span className="font-medium">{source || 'Inconnu'}</span>
            <span className="text-xs text-gray-500 ml-2">{count} prospects</span>
          </li>
        ))}
      </ul>
    </div>
  );
}