import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

export default function ProspectsList() {
  const [prospects, setProspects] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    birth_date: '',
    city: '',
    created_at: '',
    signature_date: '',
    source: '',
    status: '',
    assigned_to: '',
    cpl: '',
    country: ''
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { fetchProspects(); }, []);
  const fetchProspects = async () => {
    const { data } = await supabase.from('contacts').select('*');
    setProspects(data || []);
  };
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAdd = async () => {
    await supabase.from('contacts').insert([form]);
    setForm({ first_name: '', last_name: '', birth_date: '', city: '', created_at: '', signature_date: '', source: '', status: '', assigned_to: '', cpl: '', country: '' });
    setShowForm(false);
    fetchProspects();
  };
  const handleEdit = p => { setForm(p); setEditId(p.id); setShowForm(true); };
  const handleUpdate = async () => {
    await supabase.from('contacts').update(form).eq('id', editId);
    setForm({ first_name: '', last_name: '', birth_date: '', city: '', created_at: '', signature_date: '', source: '', status: '', assigned_to: '', cpl: '', country: '' });
    setEditId(null);
    setShowForm(false);
    fetchProspects();
  };
  const handleDelete = async id => {
    await supabase.from('contacts').delete().eq('id', id);
    fetchProspects();
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestion des Prospects</h2>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ first_name: '', last_name: '', birth_date: '', city: '', created_at: '', signature_date: '', source: '', status: '', assigned_to: '', cpl: '', country: '' }); }} className="bg-blue-600 text-white px-4 py-2 rounded">+ Nouveau Prospect</button>
      </div>
      {showForm && (
        <div className="mb-4 bg-gray-100 p-4 rounded shadow">
          <div className="flex flex-wrap gap-2 mb-2">
            <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Prénom" className="border px-2" />
            <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Nom" className="border px-2" />
            <input name="birth_date" value={form.birth_date} onChange={handleChange} placeholder="Date de naissance" className="border px-2" type="date" />
            <input name="city" value={form.city} onChange={handleChange} placeholder="Ville" className="border px-2" />
            <input name="signature_date" value={form.signature_date} onChange={handleChange} placeholder="Signature" className="border px-2" type="date" />
            <input name="source" value={form.source} onChange={handleChange} placeholder="Origine" className="border px-2" />
            <input name="status" value={form.status} onChange={handleChange} placeholder="Statut" className="border px-2" />
            <input name="assigned_to" value={form.assigned_to} onChange={handleChange} placeholder="Attribution (UUID)" className="border px-2" />
            <input name="cpl" value={form.cpl} onChange={handleChange} placeholder="CPL" className="border px-2" />
            <input name="country" value={form.country} onChange={handleChange} placeholder="Pays" className="border px-2" />
          </div>
          <div className="flex gap-2">
            {editId ? (
              <button onClick={handleUpdate} className="bg-yellow-500 text-white px-4 py-1 rounded">Modifier</button>
            ) : (
              <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-1 rounded">Ajouter</button>
            )}
            <button onClick={() => setShowForm(false)} className="bg-gray-400 text-white px-4 py-1 rounded">Annuler</button>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Date de naissance</th>
            <th className="border px-2 py-1">Ville</th>
            <th className="border px-2 py-1">Création</th>
            <th className="border px-2 py-1">Signature</th>
            <th className="border px-2 py-1">Origine</th>
            <th className="border px-2 py-1">Statut</th>
            <th className="border px-2 py-1">Attribution</th>
            <th className="border px-2 py-1">CPL</th>
            <th className="border px-2 py-1">Pays</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map(p => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.last_name}</td>
              <td className="border px-2 py-1">{p.first_name}</td>
              <td className="border px-2 py-1">{p.birth_date}</td>
              <td className="border px-2 py-1">{p.city}</td>
              <td className="border px-2 py-1">{p.created_at?.slice(0,10)}</td>
              <td className="border px-2 py-1">{p.signature_date}</td>
              <td className="border px-2 py-1">{p.source}</td>
              <td className="border px-2 py-1">{p.status}</td>
              <td className="border px-2 py-1">{p.assigned_to}</td>
              <td className="border px-2 py-1">{p.cpl}</td>
              <td className="border px-2 py-1">{p.country}</td>
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
