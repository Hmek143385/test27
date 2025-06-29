const supabase = require('../utils/supabaseClient');
const mailService = require('./mailService');
const notificationService = require('./notificationService');

/**
 * Exécute les workflows actifs pour un événement donné
 * @param {string} trigger_type - ex: 'form_submission', 'date', ...
 * @param {object} trigger_data - données de contexte (ex: contact, user, etc.)
 */
exports.executeWorkflows = async (trigger_type, trigger_data) => {
  // 1. Chercher les workflows actifs correspondant au trigger
  const { data: workflows, error } = await supabase
    .from('workflows')
    .select('*')
    .eq('trigger_type', trigger_type)
    .eq('is_active', true);
  if (error) throw error;
  if (!workflows || workflows.length === 0) return;

  for (const wf of workflows) {
    for (const action of wf.actions || []) {
      if (action.type === 'send_email') {
        // Exemple: envoyer un email au contact ou user
        await mailService.sendMail({
          to: trigger_data.email,
          subject: 'Automatisation CRM',
          text: action.value // ou utilisez un template dynamique
        });
      }
      if (action.type === 'notify') {
        // Exemple: notifier un commercial
        await notificationService.createAndNotify({
          user_id: trigger_data.assigned_to || trigger_data.user_id,
          message: action.value,
          type: 'workflow',
          io: trigger_data.io // optionnel pour WebSocket
        });
      }
      // Ajoutez d'autres types d'actions ici
    }
  }
};
