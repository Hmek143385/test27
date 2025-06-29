const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('interactions').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('interactions').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(interaction) {
    const { data, error } = await supabase.from('interactions').insert([interaction]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, interaction) {
    const { data, error } = await supabase.from('interactions').update(interaction).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('interactions').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Interaction deleted' };
  }
};