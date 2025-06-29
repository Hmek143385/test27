// Service API pour objectifs commerciaux
export async function getSalesTargets() {
  const res = await fetch('/api/sales-targets', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}