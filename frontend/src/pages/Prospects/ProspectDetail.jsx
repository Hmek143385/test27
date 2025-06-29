import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProspectDetail() {
  const { id } = useParams();
  const [prospect, setProspect] = useState(null);

  useEffect(() => {
    fetch(`/api/contacts/${id}`)
      .then(res => res.json())
      .then(data => setProspect(data))
      .catch(() => setProspect(null));
  }, [id]);

  if (!prospect) return <div>Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Détail du Prospect</h2>
      <div className="bg-white p-4 rounded shadow">
        <div><b>Nom :</b> {prospect.last_name}</div>
        <div><b>Prénom :</b> {prospect.first_name}</div>
        <div><b>Email :</b> {prospect.email}</div>
        <div><b>Téléphone :</b> {prospect.phone}</div>
        <div><b>Statut :</b> {prospect.status}</div>
        {/* Ajoutez d'autres champs selon vos besoins */}
      </div>
    </div>
  );
}

export default ProspectDetail;