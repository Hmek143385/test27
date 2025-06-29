const express = require('express');
const router = express.Router();
const multer = require('multer');
const importService = require('../services/importService');
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const upload = multer({ dest: 'uploads/' });

// Upload fichier Excel/CSV
router.post('/file', auth, role(['directeur commercial', 'marketeur']), upload.single('file'), async (req, res) => {
  const result = await importService.importFromFile(req.file.path);
  res.json(result);
});
// Sync Facebook
router.post('/facebook', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  const result = await importService.importFromFacebook(req.body.accessToken);
  res.json(result);
});
// Sync TikTok
router.post('/tiktok', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  const result = await importService.importFromTikTok(req.body.accessToken);
  res.json(result);
});
// Sync Google Sheets
router.post('/googlesheet', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  const result = await importService.importFromGoogleSheet(req.body.sheetId, req.body.apiKey);
  res.json(result);
});
// Sync HubSpot
router.post('/hubspot', auth, role(['directeur commercial', 'marketeur']), async (req, res) => {
  const result = await importService.importFromHubSpot(req.body.apiKey);
  res.json(result);
});

module.exports = router;