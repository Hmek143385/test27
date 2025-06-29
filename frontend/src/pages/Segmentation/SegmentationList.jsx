import React, { useEffect, useState } from 'react';
import { getSegments, createSegment } from '../../services/segments';

function SegmentationList() {
  const [segments, setSegments] = useState([]);
  const [nom, setNom] = useState('');
  const [type, setType] = useState('relance');
  const [description, setDescription] = useState('');

  useEffect(() => {
    getSegments().then(setSegments);
  }, []);

  const handleCreate = async e => {
    e.preventDefault();
    const segment = await createSegment({ nom, type, description });
    setSegments(s => [segment, ...s]);
    setNom(''); setType('relance'); setDescription('');
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Segmentation</h2>
      <form onSubmit={handleCreate} className="mb-4">
        <input value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom du segment" className="border p-1 mr-2" required />
        <select value={type} onChange={e => setType(e.target.value)} className="border p-1 mr-2">
          <option value="relance">Relance</option>
          <option value="cross-sell">Cross-Sell</option>
        </select>
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border p-1 mr-2" />
        <button className="bg-indigo-600 text-white px-3 py-1 rounded">Créer</button>
      </form>
      <ul>
        {segments.map(s => (
          <li key={s.id} className="mb-2 flex items-center">
            <span className="flex-1">{s.nom} ({s.type})</span>
            <span className="text-gray-500 ml-2">{s.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SegmentationList;