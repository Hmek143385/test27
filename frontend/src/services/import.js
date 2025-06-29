// Service API pour import de données
export async function importDonnees() {}

// Import fichier Excel/CSV
export async function importFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch('/api/import/file', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    body: formData
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

// Sync Facebook
export async function importFacebook() {
  const res = await fetch('/api/import/facebook', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

// Sync TikTok
export async function importTikTok() {
  const res = await fetch('/api/import/tiktok', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

// Sync GoogleSheet
export async function importGoogleSheet() {
  const res = await fetch('/api/import/googlesheet', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

// Sync HubSpot
export async function importHubSpot() {
  const res = await fetch('/api/import/hubspot', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}