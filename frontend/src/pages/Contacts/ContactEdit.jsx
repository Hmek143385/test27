import React, { useState } from 'react';

function ContactEdit({ contact, onSave }) {
  const [form, setForm] = useState(contact || {});
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    onSave(form);
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <input name="first_name" value={form.first_name || ''} onChange={handleChange} placeholder="Prénom" className="border p-1 mr-2" />
      <input name="last_name" value={form.last_name || ''} onChange={handleChange} placeholder="Nom" className="border p-1 mr-2" />
      <input name="email" value={form.email || ''} onChange={handleChange} placeholder="Email" className="border p-1 mr-2" />
      <input name="phone" value={form.phone || ''} onChange={handleChange} placeholder="Téléphone" className="border p-1 mr-2" />
      <input name="status" value={form.status || ''} onChange={handleChange} placeholder="Statut" className="border p-1 mr-2" />
      <button className="bg-indigo-600 text-white px-3 py-1 rounded">Enregistrer</button>
    </form>
  );
}

export default ContactEdit;