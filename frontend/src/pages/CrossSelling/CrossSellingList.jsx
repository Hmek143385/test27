import React, { useEffect, useState } from 'react';
import { createCrossSellOperation } from '../../services/crossSelling';

function CrossSellingList() {
  const [clientId, setClientId] = useState('');
  const [produitId, setProduitId] = useState('');
  const [message, setMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => setClients(data));
    fetch('/api/produits')
      .then(res => res.json())
      .then(data => setProduits(data));
    fetch('/api/cross-sell')
      .then(res => res.json())
      .then(data => setOperations(data));
  }, []);

  const handleCreate = async e => {
    e.preventDefault();
    await createCrossSellOperation({ clientId, produitId });
    setMessage('Opération de cross-selling créée et affectée !');
    setClientId(''); setProduitId('');
    // Rafraîchir la liste des opérations
    fetch('/api/cross-sell')
      .then(res => res.json())
      .then(data => setOperations(data));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Cross-Selling</h2>
      <form onSubmit={handleCreate} className="mb-4">
        <select value={clientId} onChange={e => setClientId(e.target.value)} className="border p-1 mr-2" required>
          <option value="">Sélectionner un client</option>
          {clients.map(c => (
            <option key={c.id} value={c.id}>{c.first_name} {c.last_name} ({c.email})</option>
          ))}
        </select>
        <select value={produitId} onChange={e => setProduitId(e.target.value)} className="border p-1 mr-2" required>
          <option value="">Sélectionner un produit</option>
          {produits.map(p => (
            <option key={p.id} value={p.id}>{p.name || p.nom}</option>
          ))}
        </select>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Affecter</button>
      </form>
      {message && <div className="text-green-600">{message}</div>}
      <h3 className="font-semibold mt-4">Opérations de cross-selling</h3>
      <ul>
        {operations.map(op => (
          <li key={op.id}>{op.client_id} → {op.produit_id} (statut: {op.status || 'en attente'})</li>
        ))}
      </ul>
    </div>
  );
}

export default CrossSellingList;