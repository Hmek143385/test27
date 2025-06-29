import React, { useEffect, useState } from 'react';
import ContactKpi from './ContactKpi';

function ContactsList() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(() => setContacts([]));
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Liste des Contacts</h2>
      <ContactKpi contacts={contacts} />
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-1">Nom</th>
            <th className="border px-2 py-1">Prénom</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Téléphone</th>
            <th className="border px-2 py-1">Statut</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c.id}>
              <td className="border px-2 py-1">{c.last_name}</td>
              <td className="border px-2 py-1">{c.first_name}</td>
              <td className="border px-2 py-1">{c.email}</td>
              <td className="border px-2 py-1">{c.phone}</td>
              <td className="border px-2 py-1">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsList;