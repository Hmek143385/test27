import { supabase } from './supabaseClient';

export async function getContacts() {
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) throw error;
  return data;
}

export async function createContact(contact) {
  const { data, error } = await supabase.from('contacts').insert([contact]);
  if (error) throw error;
  return data;
}

export async function updateContact(id, updates) {
  const { data, error } = await supabase.from('contacts').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteContact(id) {
  const { data, error } = await supabase.from('contacts').delete().eq('id', id);
  if (error) throw error;
  return data;
}