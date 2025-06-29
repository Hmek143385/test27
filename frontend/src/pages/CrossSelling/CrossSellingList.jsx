import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { createCrossSellOperation } from '../../services/crossSelling';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function CrossSellingList() {
  const [clientId, setClientId] = useState('');
  const [produitId, setProduitId] = useState('');
  const [message, setMessage] = useState('');
  const [clients, setClients] = useState([]);
  const [produits, setProduits] = useState([]);
  const [operations, setOperations] = useState([]);
  const [cross, setCross] = useState([]);
  const [form, setForm] = useState({ produit: '', description: '' });
  const [editId, setEditId] = useState(null);

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
    fetchCross();
  }, []);

  const fetchCross = async () => {
    const { data } = await supabase.from('crossselling').select('*');
    setCross(data || []);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

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

  const handleAdd = async () => {
    await supabase.from('crossselling').insert([form]);
    setForm({ produit: '', description: '' });
    fetchCross();
  };

  const handleEdit = c => setForm(c) || setEditId(c.id);

  const handleUpdate = async () => {
    await supabase.from('crossselling').update(form).eq('id', editId);
    setForm({ produit: '', description: '' });
    setEditId(null);
    fetchCross();
  };

  const handleDelete = async id => {
    await supabase.from('crossselling').delete().eq('id', id);
    fetchCross();
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
      <h2 className="text-xl font-bold mb-4 mt-8">Liste Cross-Selling</h2>
      <div className="mb-4 flex gap-2">
        <input name="produit" value={form.produit} onChange={handleChange} placeholder="Produit" className="border px-2" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border px-2" />
        {editId ? (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
        ) : (
          <button onClick={handleAdd} className="bg-green-600 text-white px-2 py-1 rounded">Ajouter</button>
        )}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Produit</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cross.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.produit}</td>
              <td className="border px-2 py-1">{c.description}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleEdit(c)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Modifier</button>
                <button onClick={() => handleDelete(c.id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrossSellingList;