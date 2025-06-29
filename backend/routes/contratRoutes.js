const express = require('express');
const router = express.Router();
const ContratClient = require('../models/ContratClient');

router.get('/', async (req, res) => {
  try {
    const contrats = await ContratClient.getAll();
    res.json(contrats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const contrat = await ContratClient.create(req.body);
    res.status(201).json(contrat);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;