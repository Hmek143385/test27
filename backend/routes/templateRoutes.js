const express = require('express');
const router = express.Router();
const Template = require('../models/Template');

// Liste des templates
router.get('/', async (req, res) => {
  const templates = await Template.findAll();
  res.json(templates);
});
// Créer un template
router.post('/', async (req, res) => {
  const tpl = await Template.create(req.body);
  res.json(tpl);
});
// Supprimer un template
router.delete('/:id', async (req, res) => {
  await Template.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});
// Modifier un template
router.put('/:id', async (req, res) => {
  const tpl = await Template.findByPk(req.params.id);
  if (!tpl) return res.status(404).json({ error: 'Not found' });
  await tpl.update(req.body);
  res.json(tpl);
});

module.exports = router;