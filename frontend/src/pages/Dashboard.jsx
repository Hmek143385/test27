import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KpiCard from '../components/dashboard/KpiCard';
import MonthlyChart from '../components/dashboard/MonthlyChart';
import SourceBar from '../components/dashboard/SourceBar';
import RecentProspects from '../components/dashboard/RecentProspects';
import TasksList from '../components/dashboard/TasksList';
import RecentActivities from '../components/dashboard/RecentActivities';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [contrats, setContrats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/contacts').then(res => res.json()).then(setContacts);
    fetch('/api/contrats').then(res => res.json()).then(setContrats);
  }, []);

  const totalProspects = contacts.length;
  const nouveaux = contacts.filter(c => c.status === 'nouveau').length;
  const qualifies = contacts.filter(c => c.status === 'qualifié').length;
  const tauxConversion = totalProspects > 0 ? ((contrats.length / totalProspects) * 100).toFixed(1) + '%' : '0.0%';

  const kpis = [
    { label: 'Total Prospects', value: totalProspects, icon: '👥', trend: '', color: 'green' },
    { label: 'Nouveaux', value: nouveaux, icon: '🆕', trend: '', color: 'blue' },
    { label: 'Qualifiés', value: qualifies, icon: '⭐', trend: '', color: 'yellow' },
    { label: 'Taux Conversion', value: tauxConversion, icon: '📈', trend: '', color: 'green' }
  ];

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6">
        <button onClick={() => navigate('/admin')} className="bg-blue-600 text-white px-4 py-2 rounded">Accès Admin</button>
        <button onClick={() => navigate('/commercial')} className="bg-green-600 text-white px-4 py-2 rounded">Accès Commercial</button>
        <button onClick={() => navigate('/marketeur')} className="bg-purple-600 text-white px-4 py-2 rounded">Accès Marketeur</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2"><MonthlyChart /></div>
        <div><SourceBar /></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RecentProspects />
        <TasksList />
        <RecentActivities />
      </div>
    </div>
  );
}

export default Dashboard;