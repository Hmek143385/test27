import React, { useEffect, useState } from 'react';

function MarketingAutomation() {
  const [workflows, setWorkflows] = useState([]);
  const [campagnes, setCampagnes] = useState([]);
  const [form, setForm] = useState({ name: '', trigger_type: '', action_type: '', action_value: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/workflows')
      .then(res => res.json())
      .then(data => setWorkflows(data))
      .catch(() => setWorkflows([]));
    fetch('/api/campagnes')
      .then(res => res.json())
      .then(data => setCampagnes(data))
      .catch(() => setCampagnes([]));
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    // Exemple d'action : envoyer un email automatique
    const workflow = {
      name: form.name,
      trigger_type: form.trigger_type,
      trigger_config: {},
      actions: [{ type: form.action_type, value: form.action_value }],
      is_active: true
    };
    const res = await fetch('/api/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow)
    });
    if (res.ok) {
      setMessage('Workflow créé !');
      setForm({ name: '', trigger_type: '', action_type: '', action_value: '' });
      // Rafraîchir la liste
      fetch('/api/workflows')
        .then(res => res.json())
        .then(data => setWorkflows(data));
    } else {
      setMessage('Erreur lors de la création');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Marketing Automation & Workflows</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <h3 className="font-semibold mb-2">Créer un workflow</h3>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nom du workflow" className="border p-1 mr-2" required />
        <select name="trigger_type" value={form.trigger_type} onChange={handleChange} className="border p-1 mr-2" required>
          <option value="">Déclencheur</option>
          <option value="form_submission">Soumission formulaire</option>
          <option value="date">Date</option>
        </select>
        <select name="action_type" value={form.action_type} onChange={handleChange} className="border p-1 mr-2" required>
          <option value="">Action</option>
          <option value="send_email">Envoyer un email</option>
          <option value="notify">Notifier un commercial</option>
        </select>
        <input name="action_value" value={form.action_value} onChange={handleChange} placeholder="Valeur action (ex: template email)" className="border p-1 mr-2" required />
        <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded">Créer</button>
        {message && <span className="ml-4 text-green-600">{message}</span>}
      </form>
      <h3 className="font-semibold mt-4">Workflows</h3>
      <ul>
        {workflows.map(w => (
          <li key={w.id}>{w.name} ({w.trigger_type}) - {w.is_active ? 'Actif' : 'Inactif'}</li>
        ))}
      </ul>
      <h3 className="font-semibold mt-4">Campagnes</h3>
      <ul>
        {campagnes.map(c => (
          <li key={c.id}>{c.nom || c.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MarketingAutomation;