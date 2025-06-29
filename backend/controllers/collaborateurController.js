const supabase = require('../utils/supabaseClient');

exports.getAllCollaborateurs = async (req, res) => {
  const { data, error } = await supabase.from('collaborateurs').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getCollaborateurById = async (req, res) => {
  const { data, error } = await supabase.from('collaborateurs').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createCollaborateur = async (req, res) => {
  const { data, error } = await supabase.from('collaborateurs').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateCollaborateur = async (req, res) => {
  const { data, error } = await supabase.from('collaborateurs').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteCollaborateur = async (req, res) => {
  const { error } = await supabase.from('collaborateurs').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Collaborateur deleted' });
};