import React, { useEffect, useState } from 'react';
import { getTemplates, createTemplate, deleteTemplate, updateTemplate } from '../../services/templates';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [nom, setNom] = useState('');
  const [sujet, setSujet] = useState('');
  const [contenu, setContenu] = useState('');
  const [editId, setEditId] = useState(null);
  const [editNom, setEditNom] = useState('');
  const [editSujet, setEditSujet] = useState('');
  const [editContenu, setEditContenu] = useState('');

  useEffect(() => {
    getTemplates().then(setTemplates);
  }, []);

  const handleCreate = async e => {
    e.preventDefault();
    const tpl = await createTemplate({ nom, sujet, contenu });
    setTemplates(tpls => [tpl, ...tpls]);
    setNom(''); setSujet(''); setContenu('');
  };

  const handleDelete = async id => {
    await deleteTemplate(id);
    setTemplates(tpls => tpls.filter(t => t.id !== id));
  };

  const startEdit = tpl => {
    setEditId(tpl.id);
    setEditNom(tpl.nom);
    setEditSujet(tpl.sujet);
    setEditContenu(tpl.contenu);
  };

  const handleEdit = async e => {
    e.preventDefault();
    const tpl = await updateTemplate(editId, { nom: editNom, sujet: editSujet, contenu: editContenu });
    setTemplates(tpls => tpls.map(t => t.id === tpl.id ? tpl : t));
    setEditId(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Templates Email</h2>
      <form onSubmit={handleCreate} className="mb-4">
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" className="border p-1 mr-2" required />
        <input value={sujet} onChange={e => setSujet(e.target.value)} placeholder="Sujet" className="border p-1 mr-2" required />
        <div className="mb-2 w-full">
          <ReactQuill value={contenu} onChange={setContenu} theme="snow" />
        </div>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Créer</button>
      </form>
      <ul>
        {templates.map(t => (
          <li key={t.id} className="mb-2 flex items-center">
            {editId === t.id ? (
              <form onSubmit={handleEdit} className="flex-1 flex items-center">
                <input value={editNom} onChange={e => setEditNom(e.target.value)} className="border p-1 mr-2" required />
                <input value={editSujet} onChange={e => setEditSujet(e.target.value)} className="border p-1 mr-2" required />
                <div className="mr-2 w-64">
                  <ReactQuill value={editContenu} onChange={setEditContenu} theme="snow" />
                </div>
                <button className="bg-green-600 text-white px-2 py-1 rounded mr-2">Enregistrer</button>
                <button type="button" onClick={() => setEditId(null)} className="text-gray-500">Annuler</button>
              </form>
            ) : (
              <>
                <span className="flex-1">{t.nom} — {t.sujet}</span>
                <button onClick={() => startEdit(t)} className="ml-2 text-blue-600">Éditer</button>
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