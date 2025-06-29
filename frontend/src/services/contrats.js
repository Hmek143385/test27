import { supabase } from './supabaseClient';

// Service API pour contrats
export async function getContrats() {
  const { data, error } = await supabase.from('contrats').select('*');
  if (error) throw error;
  return data;
}

export async function createContrat(contrat) {
  const { data, error } = await supabase.from('contrats').insert([contrat]);
  if (error) throw error;
  return data;
}

export async function updateContrat(id, updates) {
  const { data, error } = await supabase.from('contrats').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteContrat(id) {
  const { data, error } = await supabase.from('contrats').delete().eq('id', id);
  if (error) throw error;
  return data;
}