import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ URL du backend depuis .env (React)
const API_BASE = process.env.REACT_APP_API_URL;

export default function DashboardAdmin() {
  const [partenaires, setPartenaires] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [costSummary, setCostSummary] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios
      .get(`${API_BASE}/api/admin/partners-summary`)
      .then((res) => {
        setPartenaires(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Erreur chargement partenaires :", err);
        setLoading(false);
      });
  }, []);

  const filtered = partenaires.filter((p) =>
    p.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  const handleShowCostSummary = (partenaireId, nbEmployes) => {
    const montantParEmploye = 50;
    const rabais = 0.20;
    const totalCost = nbEmployes * montantParEmploye * (1 - rabais);
    setCostSummary({ partenaireId, totalCost, nbEmployes });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")' }}
    >
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />

      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <img src="/sts-logo.png" alt="STS" className="h-10" />
        <div className="flex gap-4 items-center">
          <h1 className="text-white text-xl font-semibold">Tableau de bord Admin</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="relative z-10 flex-grow px-6 pb-12 flex justify-center items-start">
        <div className="bg-white/95 p-10 rounded-2xl shadow-lg w-full max-w-6xl">
          <h2 className="text-2xl font-bold mb-6 text-[#003865] text-center">
            Liste des sociétés partenaires
          </h2>

          <div className="mb-6 text-center">
            <input
              type="text"
              placeholder="Rechercher une entreprise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-3 border w-full max-w-md rounded shadow"
            />
          </div>

          {loading ? (
            <div className="text-center text-lg text-gray-500">Chargement...</div>
          ) : (
            <table className="w-full table-auto border border-collapse bg-white shadow">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Entreprise</th>
                  <th className="border p-2">Responsable</th>
                  <th className="border p-2">Adresse</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Téléphone</th>
                  <th className="border p-2">Nb Employés</th>
                  <th className="border p-2">Actions</th>
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
                        <button
                          onClick={() => handleShowCostSummary(p._id, p.nbEmployes)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Sommaire des coûts
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center p-4 text-gray-500">
                      Aucun partenaire correspondant.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {costSummary && (
            <div className="mt-6 p-4 bg-blue-100 rounded">
              <h3 className="text-lg font-semibold">
                Sommaire des coûts pour {costSummary.nbEmployes} employés
              </h3>
              <p>
                Coût total (avec rabais appliqué) :{" "}
                <strong>{costSummary.totalCost.toFixed(2)} CAD</strong>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
