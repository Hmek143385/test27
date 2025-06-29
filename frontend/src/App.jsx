import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProspectsList from './pages/Prospects/ProspectsList';
import ContratsList from './pages/Contrats/ContratsList';
import TachesList from './pages/Taches/TachesList';
import CampagnesList from './pages/Campagnes/CampagnesList';
import RapportsDashboard from './pages/Rapports/RapportsDashboard';
import SegmentationList from './pages/Segmentation/SegmentationList';
import TemplatesList from './pages/Templates/TemplatesList';
import CrossSellingList from './pages/CrossSelling/CrossSellingList';

// Pages d'interface par rôle (à créer si besoin)
const AdminInterface = () => <div className="p-6"><h2>Interface Admin</h2></div>;
const CommercialInterface = () => <div className="p-6"><h2>Interface Commercial</h2></div>;
const MarketeurInterface = () => <div className="p-6"><h2>Interface Marketeur</h2></div>;

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prospects" element={<ProspectsList />} />
            <Route path="/contrats" element={<ContratsList />} />
            <Route path="/taches" element={<TachesList />} />
            <Route path="/campagnes" element={<CampagnesList />} />
            <Route path="/rapports" element={<RapportsDashboard />} />
            <Route path="/segmentation" element={<SegmentationList />} />
            <Route path="/templates" element={<TemplatesList />} />
            <Route path="/crossselling" element={<CrossSellingList />} />
            <Route path="/admin" element={<AdminInterface />} />
            <Route path="/commercial" element={<CommercialInterface />} />
            <Route path="/marketeur" element={<MarketeurInterface />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
