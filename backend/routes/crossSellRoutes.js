const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const notificationService = require('../services/notificationService');
const mailService = require('../services/mailService');
const Admin = require('../models/Admin'); // ou Collaborator selon votre modèle

// Affecter une opération de cross-sell à un commercial
router.post('/affect', auth, async (req, res) => {
  const { commercialId, clientId, produitId } = req.body;
  // ... logique d'affectation ...
  // Créer la notification
  const io = req.app.get('io');
  await notificationService.createAndNotify({
    user_id: commercialId,
    message: `Nouvelle opération cross-sell à traiter pour le client ${clientId}`,
    type: 'cross-sell',
    io
  });
  // Envoyer l'email
  let user;
  try {
    user = await Admin.getById(commercialId); // ou Collaborator.getById
  } catch (e) {
    user = null;
  }
  if (user && user.email) {
    await mailService.sendMail({
      to: user.email,
      subject: 'Nouvelle opération cross-sell',
      text: `Vous avez une nouvelle opération cross-sell à traiter pour le client ${clientId}.`
    });
  }
  res.json({ success: true });
});

module.exports = router;