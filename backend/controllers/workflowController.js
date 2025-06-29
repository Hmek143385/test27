const supabase = require('../utils/supabaseClient');

exports.getAllWorkflows = async (req, res) => {
  const { data, error } = await supabase.from('workflows').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

exports.getWorkflowById = async (req, res) => {
  const { data, error } = await supabase.from('workflows').select('*').eq('id', req.params.id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

exports.createWorkflow = async (req, res) => {
  const { data, error } = await supabase.from('workflows').insert([req.body]).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

exports.updateWorkflow = async (req, res) => {
  const { data, error } = await supabase.from('workflows').update(req.body).eq('id', req.params.id).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

exports.deleteWorkflow = async (req, res) => {
  const { error } = await supabase.from('workflows').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Workflow deleted' });
};