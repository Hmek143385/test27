const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('admins').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('admins').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(admin) {
    const { data, error } = await supabase.from('admins').insert([admin]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, admin) {
    const { data, error } = await supabase.from('admins').update(admin).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('admins').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Admin deleted' };
  }
};