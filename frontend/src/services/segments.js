// Service API pour segments
export async function getSegments() {
  const res = await fetch('/api/segments', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

export async function createSegment(data) {
  const res = await fetch('/api/segments', {
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