import React, { useEffect, useState } from 'react';

function AutomatisationList() {
  const [workflows, setWorkflows] = useState([]);

  // Exemple : récupérer le rôle depuis le localStorage ou un contexte
  const userRole = localStorage.getItem('role') || 'user';

  useEffect(() => {
    fetch('/api/workflows')
      .then(res => res.json())
      .then(data => setWorkflows(data))
      .catch(() => setWorkflows([]));
  }, []);

  // Filtrer les workflows selon le rôle si besoin (exemple : seuls les admins voient tout)
  const filteredWorkflows = userRole === 'admin'
    ? workflows
    : workflows.filter(w => !w.roles || w.roles.includes(userRole));

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Automatisation</h2>
      <ul>
        {filteredWorkflows.map(w => (
          <li key={w.id}>{w.name} ({w.trigger_type}) - {w.is_active ? 'Actif' : 'Inactif'}</li>
        ))}
      </ul>
    </div>
  );
}

export default AutomatisationList;