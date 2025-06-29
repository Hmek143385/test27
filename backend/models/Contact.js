const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('contacts').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('contacts').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(contact) {
    const { data, error } = await supabase.from('contacts').insert([contact]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, contact) {
    const { data, error } = await supabase.from('contacts').update(contact).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('contacts').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Contact deleted' };
  }
};