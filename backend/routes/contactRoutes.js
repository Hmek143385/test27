const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Toutes les routes sont publiques, middleware requireAuth supprimé/commenté
router.get('/', contactController.getAll);
router.post('/', contactController.create);
router.get('/:id', contactController.getById);
router.put('/:id', contactController.update);
router.delete('/:id', contactController.remove);

module.exports = router;