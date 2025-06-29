import React, { useEffect, useState } from 'react';

function ContactKpi() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch('/api/contacts')
      .then(res => res.json())
      .then(data => setContacts(data))
      .catch(() => setContacts([]));
  }, []);

  const total = contacts.length;
  const nouveaux = contacts.filter(c => c.status === 'nouveau').length;
  const qualifies = contacts.filter(c => c.status === 'qualifié').length;

  return (
    <div className="flex gap-4 mb-4">
      <div className="bg-blue-100 px-4 py-2 rounded">Total : {total}</div>
      <div className="bg-green-100 px-4 py-2 rounded">Nouveaux : {nouveaux}</div>
      <div className="bg-yellow-100 px-4 py-2 rounded">Qualifiés : {qualifies}</div>
    </div>
  );
}

export default ContactKpi;