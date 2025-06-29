// Script cron pour mettre à jour l'engagement des prospects
const supabase = require('../utils/supabaseClient');

async function updateEngagements() {
  try {
    // Exemple : augmenter le score d'engagement de tous les prospects de 1
    const { error } = await supabase.rpc('increment_engagement_for_all');
    if (error) throw error;
    console.log('Engagement mis à jour pour tous les prospects.');
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'engagement :', err);
  }
}

updateEngagements();