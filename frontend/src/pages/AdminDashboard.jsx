import React, { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function DashboardAdmin() {
  const [partenaires, setPartenaires] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCostSummary, setShowCostSummary] = useState(false);
  const [costSummary, setCostSummary] = useState(null);

  const getPartenairesSummary = () => {
    return axios.get(`${API}/api/admin/partners-summary`);
  };

  const getEmployeesByPartner = (id) => {
    return axios.get(`${API}/api/employee/by-partner/${id}`);
  };

  useEffect(() => {
    getPartenairesSummary()
      .then((res) => setPartenaires(res.data))
      .catch((err) => console.error("❌ Erreur chargement partenaires :", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  const handleShowCostSummary = (id) => {
    setShowCostSummary(true);
    getEmployeesByPartner(id)
      .then((res) => {
        const employeeCount = res.data.length;
        const totalCost = employeeCount * 90; // Coût de chaque employé (exemple à 90 CAD)
        const costDetails = res.data.map((emp) => ({
          name: emp.nom,
          cost: 90, // Le coût par employé
        }));
        setCostSummary({ employeeCount, totalCost, costDetails });
      })
      .catch((err) => console.error("❌ Erreur calcul coût :", err));
  };

  const filtered = partenaires.filter((p) =>
    p.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col" style={{ backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")' }}>
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <img src="/sts-logo.png" alt="STS" className="h-10" />
        <div className="flex gap-4 items-center">
          <h1 className="text-white text-xl font-semibold">Tableau de bord Admin</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Déconnexion</button>
        </div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 flex-grow px-6 pb-12 flex justify-center items-start">
        <div className="bg-white/95 p-10 rounded-2xl shadow-lg w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 text-[#003865] text-center">Liste des sociétés partenaires</h2>

          {/* Barre de recherche */}
          <div className="mb-6 text-center">
            <input
              type="text"
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border w-full max-w-md rounded shadow"
            />
          </div>

          {/* Table */}
          <table className="w-full table-auto border border-collapse bg-white shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">Entreprise</th>
                <th className="border p-2">Responsable</th>
                <th className="border p-2">Adresse</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Téléphone</th>
                <th className="border p-2">Nb Employés</th>
                <th className="border p-2">Sommaire des coûts</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((p) => (
                  <tr key={p._id}>
                    <td className="border p-2">{p.entreprise}</td>
                    <td className="border p-2">{p.responsable}</td>
                    <td className="border p-2">{p.adresse}</td>
                    <td className="border p-2">{p.email}</td>
                    <td className="border p-2">{p.phone}</td>
                    <td className="border p-2">{p.nbEmployes}</td>
                    <td className="border p-2">
                      <button onClick={() => handleShowCostSummary(p._id)} className="bg-green-500 text-white px-3 py-1 rounded">Voir les coûts</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center p-4 text-gray-500">Aucun partenaire correspondant.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Sommaire des coûts */}
          {showCostSummary && costSummary && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-[#003865]">Sommaire des coûts</h3>
              <p>Nombre d'employés : {costSummary.employeeCount}</p>
              <p>Total des coûts : {costSummary.totalCost} CAD</p>

              <table className="mt-4 w-full table-auto border border-collapse bg-white shadow">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Nom de l'employé</th>
                    <th className="border p-2">Coût par employé</th>
                  </tr>
                </thead>
                <tbody>
                  {costSummary.costDetails.map((emp, index) => (
                    <tr key={index}>
                      <td className="border p-2">{emp.name}</td>
                      <td className="border p-2">{emp.cost} CAD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
