const supabase = require('../utils/supabaseClient');

exports.getAllInteractions = async (req, res) => {
  const { data, error } = await supabase.from('interactions').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getInteractionById = async (req, res) => {
  const { data, error } = await supabase.from('interactions').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createInteraction = async (req, res) => {
  const { data, error } = await supabase.from('interactions').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateInteraction = async (req, res) => {
  const { data, error } = await supabase.from('interactions').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteInteraction = async (req, res) => {
  const { error } = await supabase.from('interactions').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Interaction deleted' });
};