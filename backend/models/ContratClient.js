const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('contrat_clients').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('contrat_clients').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(contratClient) {
    const { data, error } = await supabase.from('contrat_clients').insert([contratClient]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, contratClient) {
    const { data, error } = await supabase.from('contrat_clients').update(contratClient).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('contrat_clients').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Contrat client deleted' };
  }
};