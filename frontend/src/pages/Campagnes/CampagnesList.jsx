import React, { useEffect, useState } from 'react';
import { getTemplates } from '../../services/templates';

function CampagnesList() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [nom, setNom] = useState('');
  const [campagnes, setCampagnes] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getTemplates().then(setTemplates);
    fetch('/api/campagnes')
      .then(res => res.json())
      .then(data => setCampagnes(data))
      .catch(() => setCampagnes([]));
  }, []);

  const handleTemplateChange = e => {
    const tpl = templates.find(t => t.id === Number(e.target.value));
    setSelectedTemplate(tpl);
  };

  const handleCreate = async e => {
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
      fetch('/api/campagnes')
        .then(res => res.json())
        .then(data => setCampagnes(data));
    } else {
      setMessage('Erreur lors de la création');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Campagnes Email/SMS</h2>
      <form onSubmit={handleCreate} className="mb-4">
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom de la campagne" className="border p-1 mr-2" required />
        <select onChange={handleTemplateChange} className="border p-1 mr-2" required value={selectedTemplate?.id || ''}>
          <option value="">Sélectionner un template</option>
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.nom} — {t.sujet}</option>
          ))}
        </select>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Créer la campagne</button>
        {message && <span className="ml-4 text-green-600">{message}</span>}
      </form>
      {selectedTemplate && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="font-semibold mb-2">Prévisualisation du template</h3>
          <div className="border p-2" dangerouslySetInnerHTML={{ __html: selectedTemplate.contenu }} />
        </div>
      )}
      <h3 className="font-semibold mt-4">Campagnes existantes</h3>
      <ul>
        {campagnes.map(c => (
          <li key={c.id}>{c.nom} (template: {c.template_id})</li>
        ))}
      </ul>
    </div>
  );
}

export default CampagnesList;