const supabase = require('../utils/supabaseClient');

exports.getAllProduits = async (req, res) => {
  const { data, error } = await supabase.from('produits').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getProduitById = async (req, res) => {
  const { data, error } = await supabase.from('produits').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createProduit = async (req, res) => {
  const { data, error } = await supabase.from('produits').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateProduit = async (req, res) => {
  const { data, error } = await supabase.from('produits').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteProduit = async (req, res) => {
  const { error } = await supabase.from('produits').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Produit deleted' });
};