const supabase = require('../utils/supabaseClient');

exports.getAllSalesTargets = async (req, res) => {
  const { data, error } = await supabase.from('sales_targets').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getSalesTargetById = async (req, res) => {
  const { data, error } = await supabase.from('sales_targets').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createSalesTarget = async (req, res) => {
  const { data, error } = await supabase.from('sales_targets').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateSalesTarget = async (req, res) => {
  const { data, error } = await supabase.from('sales_targets').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteSalesTarget = async (req, res) => {
  const { error } = await supabase.from('sales_targets').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Sales target deleted' });
};