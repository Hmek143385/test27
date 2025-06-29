// Service API pour templates email
export async function getTemplates() {
  const res = await fetch('/api/templates', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

export async function createTemplate(data) {
  const res = await fetch('/api/templates', {
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

export async function deleteTemplate(id) {
  const res = await fetch(`/api/templates/${id}`, {
    method: 'DELETE',
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

export async function updateTemplate(id, data) {
  const res = await fetch(`/api/templates/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}