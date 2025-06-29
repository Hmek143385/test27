const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('sales_targets').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('sales_targets').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(salesTarget) {
    const { data, error } = await supabase.from('sales_targets').insert([salesTarget]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, salesTarget) {
    const { data, error } = await supabase.from('sales_targets').update(salesTarget).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('sales_targets').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Sales target deleted' };
  }
};