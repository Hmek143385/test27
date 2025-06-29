const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');

router.get('/', async (req, res) => {
  const taches = await Tache.findAll();
  res.json(taches);
});

router.post('/', async (req, res) => {
  const tache = await Tache.create(req.body);
  res.json(tache);
});

module.exports = router;