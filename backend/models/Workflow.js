// Modèle Workflow marketing
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const supabase = require('../utils/supabaseClient');

const Workflow = sequelize.define('Workflow', {
  name: DataTypes.STRING,
  trigger_type: DataTypes.STRING,
  trigger_config: DataTypes.JSON,
  actions: DataTypes.JSON,
  is_active: DataTypes.BOOLEAN,
  created_by: DataTypes.UUID
});

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('workflows').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('workflows').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(workflow) {
    const { data, error } = await supabase.from('workflows').insert([workflow]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, workflow) {
    const { data, error } = await supabase.from('workflows').update(workflow).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('workflows').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Workflow deleted' };
  }
};