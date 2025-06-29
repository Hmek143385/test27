import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ProspectsEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', status: 'nouveau' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetch(`/api/contacts/${id}`)
        .then(res => res.json())
        .then(data => setForm(data));
    }
  }, [id]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/contacts/${id}` : '/api/contacts';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setMessage('Prospect enregistré !');
      setTimeout(() => navigate('/prospects'), 1000);
    } else {
      setMessage('Erreur lors de l\'enregistrement');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Créer/Modifier un Prospect</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-4">
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Prénom" className="border p-1 mr-2" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Nom" className="border p-1 mr-2" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-1 mr-2" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone" className="border p-1 mr-2" />
        <select name="status" value={form.status} onChange={handleChange} className="border p-1 mr-2">
          <option value="nouveau">Nouveau</option>
          <option value="qualifié">Qualifié</option>
          <option value="prospect">Prospect</option>
          <option value="client">Client</option>
        </select>
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Enregistrer</button>
        {message && <span className="ml-4 text-green-600">{message}</span>}
      </form>
    </div>
  );
}

export default ProspectsEdit;