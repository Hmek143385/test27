import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function CampagnesList() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [nom, setNom] = useState('');
  const [campagnes, setCampagnes] = useState([]);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ nom: '', description: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTemplates();
    fetchCampagnes();
  }, []);

  const fetchTemplates = async () => {
    const { data } = await supabase.from('templates').select('*');
    setTemplates(data || []);
  };

  const fetchCampagnes = async () => {
    const { data } = await supabase.from('campagnes').select('*');
    setCampagnes(data || []);
  };

  const handleTemplateChange = e => {
    const tpl = templates.find(t => t.id === Number(e.target.value));
    setSelectedTemplate(tpl);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async e => {
    e.preventDefault();
    setMessage('');
    if (!selectedTemplate) return;
    const res = await fetch('/api/campagnes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, template_id: selectedTemplate.id })
    });
    if (res.ok) {
      setMessage('Campagne créée !');
      setNom('');
      setSelectedTemplate(null);
      // Rafraîchir la liste
      fetchCampagnes();
    } else {
      setMessage('Erreur lors de la création');
    }
  };

  const handleEdit = c => setForm(c) || setEditId(c.id);

  const handleUpdate = async () => {
    await supabase.from('campagnes').update(form).eq('id', editId);
    setForm({ nom: '', description: '' });
    setEditId(null);
    fetchCampagnes();
  };

  const handleDelete = async id => {
    await supabase.from('campagnes').delete().eq('id', id);
    fetchCampagnes();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Campagnes Email/SMS</h2>
      <form onSubmit={handleAdd} className="mb-4">
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom de la campagne" className="border p-1 mr-2" required />
        <select onChange={handleTemplateChange} className="border p-1 mr-2" required value={selectedTemplate?.id || ''}>
          <option value="">Sélectionner un template</option>
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.nom} — {t.sujet}</option>
          ))}
        </select>
        {editId ? (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white px-3 py-1 rounded">Modifier</button>
        ) : (
          <button className="bg-indigo-600 text-white px-3 py-1 rounded">Créer la campagne</button>
        )}
        {message && <span className="ml-4 text-green-600">{message}</span>}
      </form>
      {selectedTemplate && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">Prévisualisation du template</h3>
          <div className="border p-2" dangerouslySetInnerHTML={{ __html: selectedTemplate.contenu }} />
        </div>
      )}
      <h3 className="font-semibold mt-4">Campagnes existantes</h3>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Description</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campagnes.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.nom}</td>
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

export default CampagnesList;