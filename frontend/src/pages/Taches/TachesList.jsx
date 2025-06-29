import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function TachesList() {
  const [taches, setTaches] = useState([]);
  const [form, setForm] = useState({ titre: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTaches();
  }, []);

  const fetchTaches = async () => {
    const { data } = await supabase.from('taches').select('*');
    setTaches(data || []);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    await supabase.from('taches').insert([form]);
    setForm({ titre: '', description: '' });
    fetchTaches();
  };

  const handleEdit = t => setForm(t) || setEditId(t.id);

  const handleUpdate = async () => {
    await supabase.from('taches').update(form).eq('id', editId);
    setForm({ titre: '', description: '' });
    setEditId(null);
    fetchTaches();
  };

  const handleDelete = async id => {
    await supabase.from('taches').delete().eq('id', id);
    fetchTaches();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Tâches</h2>
      <div className="mb-4 flex gap-2">
        <input name="titre" value={form.titre} onChange={handleChange} placeholder="Titre" className="border px-2" />
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
            <th className="border px-2 py-1">Titre</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {taches.map(t => (
            <tr key={t.id}>
              <td className="border px-2 py-1">{t.titre}</td>
              <td className="border px-2 py-1">{t.description}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleEdit(t)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Modifier</button>
                <button onClick={() => handleDelete(t.id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TachesList;
