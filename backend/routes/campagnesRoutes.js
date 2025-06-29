const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const supabase = require('../utils/supabaseClient');

// Exemple : création d'une campagne
router.post('/', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  try {
    const { nom, type, statut, cible, date_envoi } = req.body;
    const { data, error } = await supabase.from('campagnes').insert([
      { nom, type, statut, cible, date_envoi }
    ]).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// appliquer le middleware sur les autres routes sensibles...

module.exports = router;