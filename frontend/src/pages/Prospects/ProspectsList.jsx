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
    // eslint-disable-next-line
  }, [statusFilter, sourceFilter, searchTerm]);

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
      fetchProspects();
    } catch (error) {
      setError("Erreur lors de la sauvegarde du prospect");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
      fetchProspects();
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Gestion des Prospects</h2>
        <button
          onClick={() => {
            setShowModal(true);
            setModalMode("create");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nouveau Prospect
        </button>
      </div>
      <div className="mb-4">
        <input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Rechercher par prénom ou nom"
          className="border px-2 py-1 rounded w-full"
        />
      </div>
      <div className="mb-4 flex gap-2">
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="border px-2 py-1 rounded w-full"
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
          className="border px-2 py-1 rounded w-full"
        >
          <option value="">Toutes les sources</option>
          <option value="site_web">Site Web</option>
          <option value="réseaux_sociaux">Réseaux Sociaux</option>
          <option value="référencement">Référencement</option>
          <option value="autre">Autre</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Nom</th>
              <th className="border px-4 py-2 text-left">Prénom</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Téléphone</th>
              <th className="border px-4 py-2 text-left">Âge</th>
              <th className="border px-4 py-2 text-left">Statut</th>
              <th className="border px-4 py-2 text-left">Source</th>
              <th className="border px-4 py-2 text-left">Notes</th>
              <th className="border px-4 py-2 text-left">Attribution</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProspects.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{p.last_name}</td>
                <td className="border px-4 py-2">{p.first_name}</td>
                <td className="border px-4 py-2">{p.email}</td>
                <td className="border px-4 py-2">{p.phone}</td>
                <td className="border px-4 py-2">{p.age}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      getStatusColor(p.status)
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="border px-4 py-2">{p.source}</td>
                <td className="border px-4 py-2">{p.notes}</td>
                <td className="border px-4 py-2">{p.assigned_to}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => openModal("edit", p)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-700">
            Affichage de{" "}
            <span className="font-semibold">{startIndex + 1}</span> à{" "}
            <span className="font-semibold">{Math.min(endIndex, totalProspects)}</span>{" "}
            sur{" "}
            <span className="font-semibold">{totalProspects}</span> prospects
          </span>
        </div>
        <div>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l"
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r"
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {modalMode === "create" ? "Ajouter un Prospect" : "Modifier le Prospect"}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Prénom</label>
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleFormChange}
                  placeholder="Prénom"
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleFormChange}
                  placeholder="Nom"
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="border px-3 py-2 rounded w-full"
                  type="email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Téléphone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Téléphone"
                  className="border px-3 py-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Âge</label>
                <input
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  placeholder="Âge"
                  className="border px-3 py-2 rounded w-full"
                  type="number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Statut</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="nouveau">Nouveau</option>
                  <option value="qualifié">Qualifié</option>
                  <option value="converti">Converti</option>
                  <option value="perdu">Perdu</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Source</label>
                <input
                  name="source"
                  value={formData.source}
                  onChange={handleFormChange}
                  placeholder="Source"
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Notes"
                  className="border px-3 py-2 rounded w-full"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Attribution</label>
                <input
                  name="assigned_to"
                  value={formData.assigned_to}
                  onChange={handleFormChange}
                  placeholder="Attribution (UUID)"
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {modalMode === "create" ? "Ajouter" : "Modifier"}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Annuler
                </button>
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
        <div className="mt-4 text-red-600 text-center">
          {error}
        </div>
      )}
    </div>
  );
}
