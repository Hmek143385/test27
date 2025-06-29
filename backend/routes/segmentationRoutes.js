const express = require('express');
const router = express.Router();
const role = require('../middlewares/role');
const segmentationController = require('../controllers/segmentationController');

// Toutes les routes sont publiques, middleware requireAuth supprimé/commenté
router.get('/', segmentationController.getAll);
router.post('/', segmentationController.create);
router.get('/:id', segmentationController.getById);
router.put('/:id', segmentationController.update);
router.delete('/:id', segmentationController.remove);

module.exports = router;