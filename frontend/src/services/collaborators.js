// Service API pour collaborateurs
export async function getCollaborators() {
  const res = await fetch('/api/collaborators', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}