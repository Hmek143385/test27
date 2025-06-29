// Exemple de route pour les prospects
const express = require('express');
const router = express.Router();
const prospectController = require('../controllers/prospectController');

router.get('/', prospectController.getAllProspects);
// Ajouter d'autres routes ici

module.exports = router;