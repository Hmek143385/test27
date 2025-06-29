const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const supabase = require('../utils/supabaseClient');

// Exemple : création d'une automatisation
router.post('/', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  try {
    const { name, trigger_type, trigger_config, actions, is_active } = req.body;
    const created_by = req.user.id;
    const { data, error } = await supabase.from('workflows').insert([
      { name, trigger_type, trigger_config, actions, is_active, created_by }
    ]).select().single();
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ...appliquer le middleware sur les autres routes sensibles...

module.exports = router;