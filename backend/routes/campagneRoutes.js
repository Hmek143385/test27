const express = require('express');
const router = express.Router();
const campagneController = require('../controllers/campagneController');

// Toutes les routes sont publiques, middleware requireAuth supprimé/commenté
router.get('/', campagneController.getAll);
router.post('/', campagneController.create);
router.get('/:id', campagneController.getById);
router.put('/:id', campagneController.update);
router.delete('/:id', campagneController.remove);

module.exports = router;