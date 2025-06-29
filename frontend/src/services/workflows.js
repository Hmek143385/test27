import { supabase } from './supabaseClient';

export async function getWorkflows() {
  const { data, error } = await supabase.from('workflows').select('*');
  if (error) throw error;
  return data;
}

export async function createWorkflow(workflow) {
  const { data, error } = await supabase.from('workflows').insert([workflow]);
  if (error) throw error;
  return data;
}

export async function updateWorkflow(id, updates) {
  const { data, error } = await supabase.from('workflows').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteWorkflow(id) {
  const { data, error } = await supabase.from('workflows').delete().eq('id', id);
  if (error) throw error;
  return data;
}