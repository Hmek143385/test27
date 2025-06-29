const supabase = require('../utils/supabaseClient');

exports.getAllContrats = async (req, res) => {
  const { data, error } = await supabase.from('contrats').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getContratById = async (req, res) => {
  const { data, error } = await supabase.from('contrats').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createContrat = async (req, res) => {
  const { data, error } = await supabase.from('contrats').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateContrat = async (req, res) => {
  const { data, error } = await supabase.from('contrats').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteContrat = async (req, res) => {
  const { error } = await supabase.from('contrats').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Contrat deleted' });
};