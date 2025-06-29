const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middlewares/auth');

// Récupérer les notifications de l'utilisateur connecté
router.get('/', auth, async (req, res) => {
  const notifs = await Notification.findAll({ where: { user_id: req.user.id }, order: [['createdAt', 'DESC']] });
  res.json(notifs);
});
// Marquer comme lue
router.post('/:id/read', auth, async (req, res) => {
  await Notification.update({ read: true }, { where: { id: req.params.id, user_id: req.user.id } });
  res.json({ success: true });
});
// Créer une notification et émettre via WebSocket
router.post('/', auth, async (req, res) => {
  const notif = await Notification.create({
    user_id: req.body.user_id,
    message: req.body.message,
    type: req.body.type
  });
  // Émettre la notification en temps réel
  req.app.get('io').emit('notification', notif);
  res.json(notif);
});

module.exports = router;