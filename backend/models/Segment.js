const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const supabase = require('../utils/supabaseClient');

const Segment = sequelize.define('Segment', {
  nom: DataTypes.STRING,
  type: DataTypes.STRING, // ex: relance, cross-sell
  criteres: DataTypes.JSON,
  description: DataTypes.TEXT
});

module.exports = {
  async getAll() {
    const { data, error } = await supabase.from('segments').select('*');
    if (error) throw error;
    return data;
  },
  async getById(id) {
    const { data, error } = await supabase.from('segments').select('*').eq('id', id).single();
    if (error) throw error;
    return data;
  },
  async create(segment) {
    const { data, error } = await supabase.from('segments').insert([segment]).select().single();
    if (error) throw error;
    return data;
  },
  async update(id, segment) {
    const { data, error } = await supabase.from('segments').update(segment).eq('id', id).select().single();
    if (error) throw error;
    return data;
  },
  async remove(id) {
    const { error } = await supabase.from('segments').delete().eq('id', id);
    if (error) throw error;
    return { message: 'Segment deleted' };
  }
};