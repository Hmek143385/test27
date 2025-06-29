// Appel IA Google pour recommandation smart
export async function getAiRecommendation(prompt) {
  const res = await fetch('/api/ai/recommendation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify({ prompt })
  });
  if (!res.ok) throw new Error('Erreur API IA');
  return res.json();
}