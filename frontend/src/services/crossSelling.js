// Service API pour cross-selling
export async function createCrossSellOperation(data) {
  const res = await fetch('/api/cross-sell', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}