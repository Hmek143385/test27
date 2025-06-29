const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');

router.get('/', async (req, res) => {
  const produits = await Produit.findAll();
  res.json(produits);
});

router.post('/', async (req, res) => {
  const produit = await Produit.create(req.body);
  res.json(produit);
});

module.exports = router;