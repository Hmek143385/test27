import { supabase } from './supabaseClient';

export async function getProduits() {
  const { data, error } = await supabase.from('produits').select('*');
  if (error) throw error;
  return data;
}

export async function createProduit(produit) {
  const { data, error } = await supabase.from('produits').insert([produit]);
  if (error) throw error;
  return data;
}

export async function updateProduit(id, updates) {
  const { data, error } = await supabase.from('produits').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteProduit(id) {
  const { data, error } = await supabase.from('produits').delete().eq('id', id);
  if (error) throw error;
  return data;
}