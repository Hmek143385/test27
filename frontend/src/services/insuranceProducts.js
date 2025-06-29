// Service API pour produits d'assurance
export async function getInsuranceProducts() {
  const res = await fetch('/api/insurance-products', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}