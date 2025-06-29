import React from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qzntxmcfmjjonnpcmnyh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bnR4bWNmbWpqb25ucGNtbnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2NzQzNjYsImV4cCI6MjA2NjI1MDM2Nn0.MXCbON_vtdk7HMoFOZxBNo3oQ46hkZi7iip5aBImUzM"
);

export default function ProspectsList() {
  const [prospects, setProspects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [showModal, setShowModal] = React.useState(false);
  const [modalMode, setModalMode] = React.useState("create");
  const [selectedProspect, setSelectedProspect] = React.useState(null);
  const [formData, setFormData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    age: "",
    status: "nouveau",
    source: "",
    notes: "",
    assigned_to: "",
  });

  // Ajout d'une liste déroulante pour l'attribution (commercial)
  const [collaborateurs, setCollaborateurs] = React.useState([]);

  const itemsPerPage = 10;

  const fetchProspects = async () => {
    setLoading(true);
    try {
      let query = supabase.from("contacts").select("*");
      if (statusFilter) query = query.eq("status", statusFilter);
      if (sourceFilter) query = query.eq("source", sourceFilter);
      if (searchTerm)
        query = query
          .ilike("first_name", `%${searchTerm}%`)
          .or(`last_name.ilike.%${searchTerm}%`);
      const { data, error } = await query;
      if (error) throw error;
      setProspects(data || []);
    } catch (error) {
      setError("Impossible de charger les prospects");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProspects();
    fetchCollaborateurs();
    // eslint-disable-next-line
  }, [statusFilter, sourceFilter, searchTerm]);

  const fetchCollaborateurs = async () => {
    const { data } = await supabase.from('collaborateurs').select('id, first_name, last_name, role');
    setCollaborateurs(data ? data.filter(c => c.role && c.role.toLowerCase().includes('commercial')) : []);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleSourceFilter = (e) => {
    setSourceFilter(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (mode, prospect = null) => {
    setModalMode(mode);
    setSelectedProspect(prospect);
    if (mode === "create") {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        age: "",
        status: "nouveau",
        source: "",
        notes: "",
        assigned_to: "",
      });
    } else if (mode === "edit" && prospect) {
      setFormData({
        first_name: prospect.first_name || "",
        last_name: prospect.last_name || "",
        email: prospect.email || "",
        phone: prospect.phone || "",
        age: prospect.age || "",
        status: prospect.status || "nouveau",
        source: prospect.source || "",
        notes: prospect.notes || "",
        assigned_to: prospect.assigned_to || "",
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProspect(null);
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      age: "",
      status: "nouveau",
      source: "",
      notes: "",
      assigned_to: "",
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ajout d'un refresh après chaque ajout/modif/suppression
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === "create") {
        const { error } = await supabase.from("contacts").insert([formData]);
        if (error) throw error;
      } else if (modalMode === "edit" && selectedProspect) {
        const { error } = await supabase
          .from("contacts")
          .update(formData)
          .eq("id", selectedProspect.id);
        if (error) throw error;
      }
      closeModal();
      await fetchProspects();
    } catch (error) {
      setError("Erreur lors de la sauvegarde du prospect");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
      await fetchProspects();
    } catch (error) {
      setError("Erreur lors de la suppression du prospect");
    }
  };

  const totalProspects = prospects.length;
  const newProspects = prospects.filter((p) => p.status === "nouveau").length;
  const qualifiedProspects = prospects.filter((p) => p.status === "qualifié")
    .length;
  const convertedProspects = prospects.filter((p) => p.status === "converti")
    .length;

  const totalPages = Math.ceil(totalProspects / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProspects = prospects.slice(startIndex, endIndex);

  const getStatusColor = (status) => {
    switch (status) {
      case "nouveau":
        return "bg-blue-100 text-blue-800";
      case "qualifié":
        return "bg-yellow-100 text-yellow-800";
      case "converti":
        return "bg-green-100 text-green-800";
      case "perdu":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fc] font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 p-6 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Gestion des Prospects
          </h2>
          <p className="text-gray-600 mt-1">
            Gérez vos prospects et suivez leur progression
          </p>
        </div>
        <button
          onClick={() => {
            setShowModal(true);
            setModalMode("create");
          }}
          className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <i className="fas fa-plus mr-2"></i>
          Nouveau Prospect
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Prospects</p>
              <p className="text-3xl font-bold text-gray-900">{totalProspects}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-xl">
              <i className="fas fa-users text-white text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Nouveaux</p>
              <p className="text-3xl font-bold text-gray-900">{newProspects}</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-green-600 p-4 rounded-xl">
              <i className="fas fa-user-plus text-white text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Qualifiés</p>
              <p className="text-3xl font-bold text-gray-900">{qualifiedProspects}</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-xl">
              <i className="fas fa-star text-white text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Convertis</p>
              <p className="text-3xl font-bold text-gray-900">{convertedProspects}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 p-4 rounded-xl">
              <i className="fas fa-check-circle text-white text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4 px-6 mb-4">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un prospect..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent w-64"
            />
            <i className="fas fa-search absolute left-3 top-4 text-gray-400"></i>
          </div>
          <select
            value={statusFilter}
            onChange={handleStatusFilter}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent"
          >
            <option value="">Tous les statuts</option>
            <option value="nouveau">Nouveau</option>
            <option value="qualifié">Qualifié</option>
            <option value="converti">Converti</option>
            <option value="perdu">Perdu</option>
          </select>
          <select
            value={sourceFilter}
            onChange={handleSourceFilter}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent"
          >
            <option value="">Toutes les sources</option>
            <option value="site_web">Site Web</option>
            <option value="referencement">Référencement</option>
            <option value="publicite">Publicité</option>
            <option value="autres">Autres</option>
          </select>
        </div>
      </div>

      {/* Table principale */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mx-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prospect</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Âge</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date création</th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProspects.map((prospect) => (
                <tr key={prospect.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#667eea] to-[#764ba2] flex items-center justify-center">
                          <span className="text-sm font-medium text-white">
                            {prospect.first_name?.charAt(0)}{prospect.last_name?.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {prospect.first_name} {prospect.last_name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prospect.email}</div>
                    <div className="text-sm text-gray-500">{prospect.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prospect.age || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(prospect.status)}`}>
                      {prospect.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prospect.source || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(prospect.created_at).toLocaleDateString("fr-FR")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => openModal("edit", prospect)} className="text-green-600 hover:text-green-900 p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => handleDelete(prospect.id)} className="text-red-600 hover:text-red-900 p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Affichage de {startIndex + 1} à {Math.min(endIndex, totalProspects)} sur {totalProspects} prospects
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Précédent
                </button>
                <span className="text-sm text-gray-700 px-4 py-2 bg-white rounded-lg border">Page {currentPage} sur {totalPages}</span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  Suivant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{modalMode === "create" ? "Nouveau Prospect" : "Modifier le Prospect"}</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom *</label>
                  <input type="text" name="first_name" value={formData.first_name} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input type="text" name="last_name" value={formData.last_name} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
                  <input type="number" name="age" value={formData.age} onChange={handleFormChange} min="0" max="120" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select name="status" value={formData.status} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors">
                    <option value="nouveau">Nouveau</option>
                    <option value="qualifié">Qualifié</option>
                    <option value="converti">Converti</option>
                    <option value="perdu">Perdu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                  <select name="source" value={formData.source} onChange={handleFormChange} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors">
                    <option value="">Sélectionner une source</option>
                    <option value="site_web">Site Web</option>
                    <option value="referencement">Référencement</option>
                    <option value="publicite">Publicité</option>
                    <option value="autres">Autres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assigné à</label>
                  <select name="assigned_to" value={formData.assigned_to} onChange={handleFormChange} required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors">
                    <option value="">Sélectionner un commercial</option>
                    {collaborateurs.map(c => (
                      <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-colors" placeholder="Notes sur le prospect..."></textarea>
              </div>
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <button type="button" onClick={closeModal} className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors">Annuler</button>
                <button type="submit" className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105">{modalMode === "create" ? "Créer" : "Modifier"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-600"></div>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-600 text-center">{error}</div>
      )}
    </div>
  );
}
