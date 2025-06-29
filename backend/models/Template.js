const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('templates').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('templates').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(template) {
    const { data, error } = await supabase.from('templates').insert([template]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, template) {
    const { data, error } = await supabase.from('templates').update(template).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('templates').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Template deleted' };
  }
};