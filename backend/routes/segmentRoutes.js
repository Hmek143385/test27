const express = require('express');
const router = express.Router();
const Segment = require('../models/Segment');
const auth = require('../middlewares/auth');

// Lister les segments
router.get('/', auth, async (req, res) => {
  const segments = await Segment.findAll();
  res.json(segments);
});
// Créer un segment
router.post('/', auth, async (req, res) => {
  const segment = await Segment.create(req.body);
  res.json(segment);
});
// ... route pour affecter un segment à une campagne ou commercial ...

module.exports = router;