import { supabase } from './supabaseClient';

export async function getAdmins() {
  const { data, error } = await supabase.from('admins').select('*');
  if (error) throw error;
  return data;
}

export async function createAdmin(admin) {
  const { data, error } = await supabase.from('admins').insert([admin]);
  if (error) throw error;
  return data;
}

export async function updateAdmin(id, updates) {
  const { data, error } = await supabase.from('admins').update(updates).eq('id', id);
  if (error) throw error;
  return data;
}

export async function deleteAdmin(id) {
  const { data, error } = await supabase.from('admins').delete().eq('id', id);
  if (error) throw error;
  return data;
}