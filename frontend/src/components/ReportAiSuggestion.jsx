import React, { useState, useEffect } from 'react';
import { getAiRecommendation } from '../services/ai';

function ReportAiSuggestion() {
  const [kpi, setKpi] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/kpi')
      .then(res => res.json())
      .then(data => setKpi(data))
      .catch(() => setKpi(null));
  }, []);

  const handleClick = async () => {
    if (!kpi) return;
    setLoading(true);
    const prompt = `Analyse les performances commerciales et marketing suivantes : ${JSON.stringify(kpi)}`;
    const res = await getAiRecommendation(prompt);
    setSuggestion(res.candidates?.[0]?.content?.parts?.[0]?.text || 'Aucune suggestion');
    setLoading(false);
  };

  return (
    <div className="my-4">
      <h3 className="font-semibold mb-2">KPI commerciaux & marketing</h3>
      {kpi ? (
        <pre className="bg-gray-100 p-2 rounded text-xs mb-2">{JSON.stringify(kpi, null, 2)}</pre>
      ) : (
        <span>Chargement des KPI...</span>
      )}
      <button onClick={handleClick} className="bg-indigo-600 text-white px-3 py-1 rounded" disabled={!kpi || loading}>
        Obtenir une analyse IA
      </button>
      {loading && <span className="ml-2">Analyse en cours...</span>}
      {suggestion && <div className="mt-2 p-2 bg-gray-100 rounded">{suggestion}</div>}
    </div>
  );
}

export default ReportAiSuggestion;