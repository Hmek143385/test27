// Service API pour contrats
export async function getContracts() {
  const res = await fetch('/api/contracts', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}