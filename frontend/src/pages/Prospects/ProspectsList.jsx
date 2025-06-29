import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function ProspectsList() {
  const [prospects, setProspects] = useState([]);
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    const { data } = await supabase.from('contacts').select('*');
    setProspects(data || []);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    await supabase.from('contacts').insert([form]);
    setForm({ first_name: '', last_name: '', email: '' });
    fetchProspects();
  };

  const handleEdit = p => setForm(p) || setEditId(p.id);

  const handleUpdate = async () => {
    await supabase.from('contacts').update(form).eq('id', editId);
    setForm({ first_name: '', last_name: '', email: '' });
    setEditId(null);
    fetchProspects();
  };

  const handleDelete = async id => {
    await supabase.from('contacts').delete().eq('id', id);
    fetchProspects();
  };

  const handleTest = () => {
    alert('Fonction test Prospects OK!');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Prospects</h2>
      <button onClick={handleTest} className="mb-4 bg-indigo-600 text-white px-3 py-1 rounded">
        Tester
      </button>
      <div className="mb-4 flex gap-2">
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Prénom" className="border px-2" />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Nom" className="border px-2" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border px-2" />
        {editId ? (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
        ) : (
          <button onClick={handleAdd} className="bg-green-600 text-white px-2 py-1 rounded">Ajouter</button>
        )}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map(p => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.last_name}</td>
              <td className="border px-2 py-1">{p.first_name}</td>
              <td className="border px-2 py-1">{p.email}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleEdit(p)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Modifier</button>
                <button onClick={() => handleDelete(p.id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProspectsList;