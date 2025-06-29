const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('contrats').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('contrats').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(contrat) {
    const { data, error } = await supabase.from('contrats').insert([contrat]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, contrat) {
    const { data, error } = await supabase.from('contrats').update(contrat).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('contrats').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Contrat deleted' };
  }
};