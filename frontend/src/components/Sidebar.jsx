import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  // Exemple : récupérer le rôle depuis le localStorage ou un contexte
  const userRole = localStorage.getItem('role') || 'user';
  let menu = [
    { label: 'Dashboard', to: '/' },
    { label: 'Prospects', to: '/prospects' },
    { label: 'Contrats', to: '/contrats' },
    { label: 'Tâches', to: '/taches' },
    { label: 'Campagnes', to: '/campagnes' },
    { label: 'Rapports', to: '/rapports' },
    { label: 'Segmentation', to: '/segmentation' },
    { label: 'Automatisation', to: '/automatisation', roles: ['admin', 'directeur commercial', 'marketeur'] },
    { label: 'Templates Email', to: '/templates', roles: ['admin', 'marketeur'] },
    { label: 'Import Données', to: '/import', roles: ['admin', 'marketeur'] }
  ];
  // Filtrer selon les droits
  menu = menu.filter(item => !item.roles || item.roles.includes(userRole));

  return (
    <aside className="bg-gradient-to-b from-blue-700 to-purple-600 text-white w-60 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-8">AssurCRM</h2>
      <ul className="space-y-2">
        {menu.map(item => (
          <li key={item.to}>
            <Link to={item.to} className="block py-2 px-4 rounded hover:bg-blue-800">{item.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;