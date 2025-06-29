import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function SegmentationList() {
  const [segments, setSegments] = useState([]);
  const [form, setForm] = useState({ nom: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    const { data } = await supabase.from('segments').select('*');
    setSegments(data || []);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    await supabase.from('segments').insert([form]);
    setForm({ nom: '', description: '' });
    fetchSegments();
  };

  const handleEdit = s => setForm(s) || setEditId(s.id);

  const handleUpdate = async () => {
    await supabase.from('segments').update(form).eq('id', editId);
    setForm({ nom: '', description: '' });
    setEditId(null);
    fetchSegments();
  };

  const handleDelete = async id => {
    await supabase.from('segments').delete().eq('id', id);
    fetchSegments();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Segments</h2>
      <div className="mb-4 flex gap-2">
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="border px-2" />
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
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {segments.map(s => (
            <tr key={s.id}>
              <td className="border px-2 py-1">{s.nom}</td>
              <td className="border px-2 py-1">{s.description}</td>
              <td className="border px-2 py-1">
                <button onClick={() => handleEdit(s)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Modifier</button>
                <button onClick={() => handleDelete(s.id)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SegmentationList;