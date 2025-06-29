const Prospect = require('../models/Prospect');

// Exemple de service pour les prospects
exports.findAll = async () => {
  return await Prospect.getAll();
};