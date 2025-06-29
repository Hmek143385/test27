// Contrôleur Contact (exemple CRUD)
const Contact = require('../models/Contact');

exports.getAll = async (req, res) => {
  try {
    const contacts = await Contact.getAll();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const contact = await Contact.getById(req.params.id);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const contact = await Contact.update(req.params.id, req.body);
    res.json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await Contact.remove(req.params.id);
    res.json({ message: 'Contact supprimé' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};