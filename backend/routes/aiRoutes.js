const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { getSmartRecommendation } = require('../openai/googleAiService');

// IA Google pour recommandations smart (ventes, campagnes)
router.post('/recommendation', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  const { prompt } = req.body;
  const result = await getSmartRecommendation(prompt);
  res.json(result);
});

module.exports = router;