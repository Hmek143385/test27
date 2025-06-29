import { supabase } from './supabaseClient';

export async function getInteractions() {
  const { data, error } = await supabase.from('interactions').select('*');
  if (error) throw error;
  return data;
}

export async function createInteraction(interaction) {
  const { data, error } = await supabase.from('interactions').insert([interaction]);
  if (error) throw error;
  return data;
}

export async function updateInteraction(id, updates) {
  const { data, error } = await supabase.from('interactions').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteInteraction(id) {
  const { data, error } = await supabase.from('interactions').delete().eq('id', id);
  if (error) throw error;
  return data;
}