import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const supabase = createClient('https://qzntxmcfmjjonnpcmnyh.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM');

function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({ nom: '', sujet: '', contenu: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const { data } = await supabase.from('templates').select('*');
    setTemplates(data || []);
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async () => {
    await supabase.from('templates').insert([form]);
    setForm({ nom: '', sujet: '', contenu: '' });
    fetchTemplates();
  };

  const handleEdit = t => setForm(t) || setEditId(t.id);

  const handleUpdate = async () => {
    await supabase.from('templates').update(form).eq('id', editId);
    setForm({ nom: '', sujet: '', contenu: '' });
    setEditId(null);
    fetchTemplates();
  };

  const handleDelete = async id => {
    await supabase.from('templates').delete().eq('id', id);
    fetchTemplates();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Templates Email</h2>
      <div className="mb-4 flex gap-2">
        <input name="nom" value={form.nom} onChange={handleChange} placeholder="Nom" className="border px-2" />
        <input name="sujet" value={form.sujet} onChange={handleChange} placeholder="Sujet" className="border px-2" />
        <div className="mb-2 w-full">
          <ReactQuill name="contenu" value={form.contenu} onChange={value => setForm({ ...form, contenu: value })} theme="snow" />
        </div>
        {editId ? (
          <button onClick={handleUpdate} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
        ) : (
          <button onClick={handleAdd} className="bg-green-600 text-white px-2 py-1 rounded">Ajouter</button>
        )}
      </div>
      <ul>
        {templates.map(t => (
          <li key={t.id} className="mb-2 flex items-center">
            {editId === t.id ? (
              <form onSubmit={handleUpdate} className="flex-1 flex items-center">
                <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} className="border p-1 mr-2" required />
                <input value={form.sujet} onChange={e => setForm({ ...form, sujet: e.target.value })} className="border p-1 mr-2" required />
                <div className="mr-2 w-64">
                  <ReactQuill value={form.contenu} onChange={value => setForm({ ...form, contenu: value })} theme="snow" />
                </div>
                <button className="bg-green-600 text-white px-2 py-1 rounded mr-2">Enregistrer</button>
                <button type="button" onClick={() => setEditId(null)} className="text-gray-500">Annuler</button>
              </form>
            ) : (
              <>
                <span className="flex-1">{t.nom} — {t.sujet}</span>
                <button onClick={() => handleEdit(t)} className="ml-2 text-blue-600">Éditer</button>
                <button onClick={() => handleDelete(t.id)} className="ml-2 text-red-600">Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TemplatesList;