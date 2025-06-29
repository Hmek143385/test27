import React from 'react';

// Pour afficher toutes les infos d'un prospect réel, adaptez les champs selon la structure de la table contacts.
function ProspectCard({ prospect }) {
  return (
    <div style={{border: '1px solid #eee', margin: '0.5rem', padding: '1rem'}}>
      <h3>{prospect.first_name || ''} {prospect.last_name || prospect.name || ''}</h3>
      <p>{prospect.email}</p>
      <p>{prospect.phone}</p>
      <p>{prospect.status}</p>
    </div>
  );
}

export default ProspectCard;