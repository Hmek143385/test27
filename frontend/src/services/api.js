// Service d'appel API générique
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export async function fetchData(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) throw new Error('Erreur API');
  return response.json();
}