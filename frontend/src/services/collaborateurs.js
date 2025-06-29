import { supabase } from './supabaseClient';

export async function getCollaborateurs() {
  const { data, error } = await supabase.from('collaborateurs').select('*');
  if (error) throw error;
  return data;
}

export async function createCollaborateur(collaborateur) {
  const { data, error } = await supabase.from('collaborateurs').insert([collaborateur]);
  if (error) throw error;
  return data;
}

export async function updateCollaborateur(id, updates) {
  const { data, error } = await supabase.from('collaborateurs').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteCollaborateur(id) {
  const { data, error } = await supabase.from('collaborateurs').delete().eq('id', id);
  if (error) throw error;
  return data;
}