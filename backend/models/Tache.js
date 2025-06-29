const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('taches').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('taches').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(tache) {
    const { data, error } = await supabase.from('taches').insert([tache]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, tache) {
    const { data, error } = await supabase.from('taches').update(tache).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('taches').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Tâche supprimée' };
  }
};