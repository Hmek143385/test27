const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('collaborateurs').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('collaborateurs').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(collaborateur) {
    const { data, error } = await supabase.from('collaborateurs').insert([collaborateur]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, collaborateur) {
    const { data, error } = await supabase.from('collaborateurs').update(collaborateur).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('collaborateurs').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Collaborateur deleted' };
  }
};