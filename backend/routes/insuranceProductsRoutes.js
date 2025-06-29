const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');

// Création d'un produit
router.post('/', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  // ...logique de création...
  res.json({ success: true });
});

// Modification
router.put('/:id', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  // ...logique de modification...
  res.json({ success: true });
});

// Suppression
router.delete('/:id', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  // ...logique de suppression...
  res.json({ success: true });
});

module.exports = router;