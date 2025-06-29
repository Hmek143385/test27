const axios = require('axios');

// Exemple d'appel à l'API Google AI (Gemini, Vertex AI, etc.)
// Utilisez process.env.GOOGLE_API_KEY pour sécuriser la clé
exports.getSmartRecommendation = async (prompt) => {
  const apiKey = process.env.GOOGLE_API_KEY;
  // Exemple pour Gemini API (adapter selon votre offre Google One)
  const response = await axios.post(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    { contents: [{ parts: [{ text: prompt }] }] },
    { params: { key: apiKey } }
  );
  return response.data;
};

// Utilisation :
// const { getSmartRecommendation } = require('./googleAiService');
// const reco = await getSmartRecommendation('Donne-moi une recommandation pour un cross-sell sur ce client...');