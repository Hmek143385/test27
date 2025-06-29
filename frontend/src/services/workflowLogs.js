// Service API pour logs de workflows
export async function getWorkflowLogs() {
  const res = await fetch('/api/workflow-logs', {
    headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}