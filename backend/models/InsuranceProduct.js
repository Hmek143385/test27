const supabase = require('../utils/supabaseClient');

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('produits').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('produits').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(produit) {
    const { data, error } = await supabase.from('produits').insert([produit]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, produit) {
    const { data, error } = await supabase.from('produits').update(produit).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('produits').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Produit deleted' };
  }
};