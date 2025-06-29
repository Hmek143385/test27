import React, { useEffect, useState } from 'react';

function ProspectsList() {
  const [prospects, setProspects] = useState([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => {
        const filtered = Array.isArray(data) ? data.filter(p => p.status !== 'client') : [];
        setProspects(filtered);
      })
      .catch(() => setProspects([]));
  }, []);

  const handleTest = () => {
    alert('Fonction test Prospects OK!');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Prospects</h2>
      <button onClick={handleTest} className="mb-4 bg-indigo-600 text-white px-3 py-1 rounded">
        Tester
      </button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Téléphone</th>
            <th className="border px-2 py-1">Statut</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map(p => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.last_name}</td>
              <td className="border px-2 py-1">{p.first_name}</td>
              <td className="border px-2 py-1">{p.email}</td>
              <td className="border px-2 py-1">{p.phone}</td>
              <td className="border px-2 py-1">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProspectsList;