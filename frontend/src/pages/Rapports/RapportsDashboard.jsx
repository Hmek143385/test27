import React, { useEffect, useState } from 'react';
import ReportAiSuggestion from '../../components/ReportAiSuggestion';

function RapportsDashboard() {
  const [contacts, setContacts] = useState([]);
  const [contrats, setContrats] = useState([]);
  const [objectif, setObjectif] = useState(20); // Objectif d'exemple
  const userRole = localStorage.getItem('role') || 'user';

  useEffect(() => {
    fetch('/api/contacts').then(res => res.json()).then(setContacts);
    fetch('/api/contrats').then(res => res.json()).then(setContrats);
  }, []);

  // Taux de conversion
  const prospects = contacts.filter(c => c.status !== 'client');
  const nbProspects = prospects.length;
  const nbContrats = contrats.length;
  const tauxConversion = nbProspects > 0 ? ((nbContrats / nbProspects) * 100).toFixed(1) : '0';

  // KPI par origine
  const kpiOrigine = contacts.reduce((acc, c) => {
    acc[c.source] = (acc[c.source] || 0) + 1;
    return acc;
  }, {});

  // Répartition par statut
  const kpiStatut = contacts.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});

  // Nombre de prospects/contrats par commercial
  const kpiCommercial = contacts.reduce((acc, c) => {
    if (c.assigned_to) acc[c.assigned_to] = (acc[c.assigned_to] || 0) + 1;
    return acc;
  }, {});
  const kpiContratsCommercial = contrats.reduce((acc, c) => {
    if (c.assigned_to) acc[c.assigned_to] = (acc[c.assigned_to] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Rapports & Analyses</h2>
      <div className="flex gap-4 mb-4">
        <div className="bg-blue-100 px-4 py-2 rounded">Taux de conversion : {tauxConversion}%</div>
        <div className="bg-green-100 px-4 py-2 rounded">Objectif : {nbContrats} / {objectif}</div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">KPI par origine</h3>
        <ul>
          {Object.entries(kpiOrigine).map(([src, n]) => (
            <li key={src}>{src || 'Inconnu'} : {n}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Répartition par statut</h3>
        <ul>
          {Object.entries(kpiStatut).map(([statut, n]) => (
            <li key={statut}>{statut} : {n}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Prospects par commercial</h3>
        <ul>
          {Object.entries(kpiCommercial).map(([collab, n]) => (
            <li key={collab}>ID {collab} : {n}</li>
          ))}
        </ul>
        <h3 className="font-semibold mt-2">Contrats par commercial</h3>
        <ul>
          {Object.entries(kpiContratsCommercial).map(([collab, n]) => (
            <li key={collab}>ID {collab} : {n}</li>
          ))}
        </ul>
      </div>
      {(userRole === 'directeur commercial' || userRole === 'marketeur') && (
        <ReportAiSuggestion />
      )}
    </div>
  );
}

export default RapportsDashboard;