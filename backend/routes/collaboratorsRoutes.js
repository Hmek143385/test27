const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const Collaborator = require('../models/Collaborator');

// Création d'un collaborateur
router.post('/', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  try {
    const data = await Collaborator.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Modification
router.put('/:id', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  try {
    const data = await Collaborator.update(req.params.id, req.body);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Suppression
router.delete('/:id', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  try {
    const data = await Collaborator.remove(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;