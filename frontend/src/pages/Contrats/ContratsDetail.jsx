import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ContratsDetail() {
  const { id } = useParams();
  const [contrat, setContrat] = useState(null);

  useEffect(() => {
    fetch(`/api/contrats/${id}`)
      .then(res => res.json())
      .then(data => setContrat(data))
      .catch(() => setContrat(null));
  }, [id]);

  if (!contrat) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Fiche Contrat</h2>
      <div className="bg-white p-4 rounded shadow">
        <div><b>Client :</b> {contrat.full_name}</div>
        <div><b>Produit :</b> {contrat.product_id}</div>
        <div><b>Date de signature :</b> {contrat.signature_date}</div>
        <div><b>Date de début :</b> {contrat.start_date}</div>
        <div><b>Date de fin :</b> {contrat.end_date}</div>
        <div><b>Prime annuelle :</b> {contrat.annual_premium}</div>
        <div><b>Commission annuelle :</b> {contrat.annual_commission}</div>
        <div><b>Statut :</b> {contrat.status}</div>
        {/* Ajoutez d'autres champs selon vos besoins */}
      </div>
    </div>
  );
}

export default ContratsDetail;