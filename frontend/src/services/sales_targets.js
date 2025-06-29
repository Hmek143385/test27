import { supabase } from './supabaseClient';

export async function getSalesTargets() {
  const { data, error } = await supabase.from('sales_targets').select('*');
  if (error) throw error;
  return data;
}

export async function createSalesTarget(target) {
  const { data, error } = await supabase.from('sales_targets').insert([target]);
  if (error) throw error;
  return data;
}

export async function updateSalesTarget(id, updates) {
  const { data, error } = await supabase.from('sales_targets').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteSalesTarget(id) {
  const { data, error } = await supabase.from('sales_targets').delete().eq('id', id);
  if (error) throw error;
  return data;
}