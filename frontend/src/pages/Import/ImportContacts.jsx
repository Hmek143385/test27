import React, { useState } from 'react';
import { importFile, importFacebook, importTikTok, importGoogleSheet, importHubSpot } from '../../services/import';
import { useAuthContext } from '../../context/AuthContext';

function ImportContacts() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const { user } = useAuthContext();
  // On suppose que le token JWT contient le rôle dans user (ex: user.role)
  const allowed = user && (user.role === 'directeur commercial' || user.role === 'marketeur');

  const handleFile = e => setFile(e.target.files[0]);
  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return;
    await importFile(file);
    setMessage('Import fichier réussi !');
  };
  const handleSync = async (type) => {
    if (type === 'facebook') await importFacebook();
    if (type === 'tiktok') await importTikTok();
    if (type === 'googlesheet') await importGoogleSheet();
    if (type === 'hubspot') await importHubSpot();
    setMessage('Synchronisation réussie !');
  };
  if (!allowed) {
    return <div className="p-6 text-red-600">Accès réservé au directeur commercial ou marketeur.</div>;
  }
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Import & Synchronisation des Contacts</h2>
      <form onSubmit={handleUpload} className="mb-4">
        <input type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="mr-2" />
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Importer</button>
      </form>
      <div className="mb-4">
        <button onClick={() => handleSync('facebook')} className="bg-blue-600 text-white px-3 py-1 rounded mr-2">Sync Facebook</button>
        <button onClick={() => handleSync('tiktok')} className="bg-pink-600 text-white px-3 py-1 rounded mr-2">Sync TikTok</button>
        <button onClick={() => handleSync('googlesheet')} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Sync GoogleSheet</button>
        <button onClick={() => handleSync('hubspot')} className="bg-orange-600 text-white px-3 py-1 rounded">Sync HubSpot</button>
      </div>
      {message && <div className="text-green-600">{message}</div>}
    </div>
  );
}

export default ImportContacts;