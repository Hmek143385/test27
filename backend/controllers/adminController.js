const supabase = require('../utils/supabaseClient');

exports.getAllAdmins = async (req, res) => {
  const { data, error } = await supabase.from('admins').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getAdminById = async (req, res) => {
  const { data, error } = await supabase.from('admins').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createAdmin = async (req, res) => {
  const { data, error } = await supabase.from('admins').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateAdmin = async (req, res) => {
  const { data, error } = await supabase.from('admins').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteAdmin = async (req, res) => {
  const { error } = await supabase.from('admins').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Admin deleted' });
};