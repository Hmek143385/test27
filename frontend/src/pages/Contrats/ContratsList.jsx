import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ContratsList() {
  const [contrats, setContrats] = useState([]);

  useEffect(() => {
    fetch('/api/contrats')
      .then(res => res.json())
      .then(data => setContrats(Array.isArray(data) ? data : []))
      .catch(() => setContrats([]));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Contrats</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Client</th>
            <th className="border px-2 py-1">Produit</th>
            <th className="border px-2 py-1">Date signature</th>
            <th className="border px-2 py-1">Statut</th>
            <th className="border px-2 py-1">Détail</th>
          </tr>
        </thead>
        <tbody>
          {contrats.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.full_name}</td>
              <td className="border px-2 py-1">{c.product_id}</td>
              <td className="border px-2 py-1">{c.signature_date}</td>
              <td className="border px-2 py-1">{c.status}</td>
              <td className="border px-2 py-1">
                <Link to={`/contrats/${c.id}`} className="text-blue-600 underline">Voir</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContratsList;