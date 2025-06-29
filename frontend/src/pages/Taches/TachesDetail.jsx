import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TachesDetail() {
  const { id } = useParams();
  const [tache, setTache] = useState(null);

  useEffect(() => {
    fetch(`/api/taches/${id}`)
      .then(res => res.json())
      .then(data => setTache(data))
      .catch(() => setTache(null));
  }, [id]);

  if (!tache) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Fiche Tâche</h2>
      <div className="bg-white p-4 rounded shadow">
        <div><b>Titre :</b> {tache.titre}</div>
        <div><b>Description :</b> {tache.description}</div>
        <div><b>Statut :</b> {tache.statut}</div>
        <div><b>Assignée à :</b> {tache.assigned_to}</div>
        <div><b>Date d'échéance :</b> {tache.due_date}</div>
        {/* Ajoutez d'autres champs selon vos besoins */}
      </div>
    </div>
  );
}

export default TachesDetail;