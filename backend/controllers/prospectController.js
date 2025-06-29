const supabase = require('../utils/supabaseClient');

// Exemple de contrôleur pour les prospects
exports.getAllProspects = async (req, res) => {
  const { data, error } = await supabase.from('contacts').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getProspectById = async (req, res) => {
  const { data, error } = await supabase.from('contacts').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createProspect = async (req, res) => {
  const { data, error } = await supabase.from('contacts').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateProspect = async (req, res) => {
  const { data, error } = await supabase.from('contacts').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteProspect = async (req, res) => {
  const { error } = await supabase.from('contacts').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Prospect deleted' });
};