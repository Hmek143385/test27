const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('notifications').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('notifications').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(notification) {
    const { data, error } = await supabase.from('notifications').insert([notification]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, notification) {
    const { data, error } = await supabase.from('notifications').update(notification).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Notification deleted' };
  }
};