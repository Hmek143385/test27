const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('campagnes').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('campagnes').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(campagne) {
    const { data, error } = await supabase.from('campagnes').insert([campagne]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, campagne) {
    const { data, error } = await supabase.from('campagnes').update(campagne).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('campagnes').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Campagne deleted' };
  }
};