const express = require('express');
const router = express.Router();
const Interaction = require('../models/Interaction');

router.get('/', async (req, res) => {
  const interactions = await Interaction.findAll();
  res.json(interactions);
});

router.post('/', async (req, res) => {
  const interaction = await Interaction.create(req.body);
  res.json(interaction);
});

module.exports = router;