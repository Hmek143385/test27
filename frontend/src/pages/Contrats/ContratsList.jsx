import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function ContratsList() {
  const [contrats, setContrats] = useState([]);
  const [form, setForm] = useState({ client: '', produit: '', date: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchContrats();
  }, []);

  const fetchContrats = async () => {
    const { data } = await supabase.from('contrats').select('*');
    setContrats(data || []);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    await supabase.from('contrats').insert([form]);
    setForm({ client: '', produit: '', date: '' });
    fetchContrats();
  };

  const handleEdit = c => setForm(c) || setEditId(c.id);

  const handleUpdate = async () => {
    await supabase.from('contrats').update(form).eq('id', editId);
    setForm({ client: '', produit: '', date: '' });
    setEditId(null);
    fetchContrats();
  };

  const handleDelete = async id => {
    await supabase.from('contrats').delete().eq('id', id);
    fetchContrats();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Contrats</h2>
      <div className="mb-4 flex gap-2">
        <input name="client" value={form.client} onChange={handleChange} placeholder="Client" className="border px-2" />
        <input name="produit" value={form.produit} onChange={handleChange} placeholder="Produit" className="border px-2" />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" className="border px-2" />
        {editId ? (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
        ) : (
          <button onClick={handleAdd} className="bg-green-600 text-white px-2 py-1 rounded">Ajouter</button>
        )}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Client</th>
            <th className="border px-2 py-1">Produit</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contrats.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.client}</td>
              <td className="border px-2 py-1">{c.produit}</td>
              <td className="border px-2 py-1">{c.date}</td>
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

export default ContratsList;