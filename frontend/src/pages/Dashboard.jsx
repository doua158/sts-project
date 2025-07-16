import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API = process.env.REACT_APP_API_URL;

export default function PartnerDashboard() {
  const [tab, setTab] = useState("list");
  const [employes, setEmployes] = useState([]);
  const [nom, setNom] = useState("");
  const [carte, setCarte] = useState("");
  const [rabais, setRabais] = useState(10);
  const [message, setMessage] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editNom, setEditNom] = useState("");
  const [editCarte, setEditCarte] = useState("");
  const [editRabais, setEditRabais] = useState(10);

  const partenaireId = localStorage.getItem("partenaireId");

  // Récupérer les employés d'un partenaire
  const getEmployesByPartner = (id) => axios.get(`${API}/api/employee/by-partner/${id}`);
  // Ajouter un employé
  const addEmploye = (data) => axios.post(`${API}/api/employee/add`, data);
  // Supprimer un employé
  const deleteEmploye = (id) => axios.delete(`${API}/api/employee/${id}`);
  // Mettre à jour un employé
  const updateEmploye = (id, data) => axios.put(`${API}/api/employee/${id}`, data);

  // Format CAD
  const formatCAD = (value) =>
    new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: "CAD",
    }).format(value);

  // Vérifier si le partenaire est connecté
  useEffect(() => {
    if (!partenaireId) window.location.href = "/";
  }, [partenaireId]);

  // Récupérer les employés à chaque changement d'onglet
  useEffect(() => {
    if (tab === "list" && partenaireId) {
      getEmployesByPartner(partenaireId)
        .then((res) => setEmployes(res.data))
        .catch((err) => console.error("❌ Erreur chargement employés :", err));
    }
  }, [tab, partenaireId]);

  // Ajouter un employé
 const handleAddEmployee = async (e) => {
  e.preventDefault();
  try {
    await addEmploye({ partenaireId, nom, carte, rabais });
    setMessage("✅ Employé ajouté !");
    setNom("");
    setCarte("");
    setRabais(10);
    setTab("list");
  } catch (err) {
    console.error("❌ Erreur ajout :", err.response?.data || err.message);
    setMessage("❌ Erreur lors de l'ajout.");
  }
};


  // Supprimer un employé
  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmploye(id);
      setEmployes(employes.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("❌ Erreur suppression :", err);
      setMessage("❌ Erreur lors de la suppression.");
    }
  };

  // Mettre à jour un employé
  const handleUpdateEmployee = async () => {
    try {
      await updateEmploye(editingId, { nom: editNom, carte: editCarte, rabais: editRabais });
      setEditingId(null);
      setTab("list");
    } catch (err) {
      console.error("❌ Erreur modification :", err);
    }
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("partenaireId");
    window.location.href = "/";
  };

  // Exporter les employés en PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des employés", 14, 10);
    const rows = employes.map((emp) => [emp.nom, emp.carte, `${emp.rabais} %`]);
    doc.autoTable({ head: [["Nom", "Carte", "Rabais"]], body: rows });
    doc.save("employes.pdf");
  };

  // Calcul des montants
  const montantParEmploye = 50;
  const totalEmployes = employes.length;
  const sousTotal = montantParEmploye * totalEmployes;
  const tps = sousTotal * 0.05;
  const tvq = sousTotal * 0.09975;
  const totalTTC = sousTotal + tps + tvq;

  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col" style={{ backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")' }}>
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />

      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <img src="/sts-logo.png" alt="STS" className="h-10" />
        <div className="flex gap-4">
          <h1 className="text-white text-xl font-semibold">Tableau de bord Partenaire</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Déconnexion</button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 py-6">
        <button onClick={() => setTab("list")} className={`px-4 py-2 rounded ${tab === "list" ? "bg-[#c6d300] text-black" : "bg-white text-[#003865]"}`}>Liste des employés</button>
        <button onClick={() => setTab("add")} className={`px-4 py-2 rounded ${tab === "add" ? "bg-[#c6d300] text-black" : "bg-white text-[#003865]"}`}>Ajouter un employé</button>
        <button onClick={() => setTab("payment")} className={`px-4 py-2 rounded ${tab === "payment" ? "bg-[#c6d300] text-black" : "bg-white text-[#003865]"}`}>Paiement</button>
      </div>

      <div className="relative z-10 flex-grow px-6 pb-12 flex justify-center items-start">
        <div className="bg-white/95 p-10 rounded-2xl shadow-lg w-full max-w-5xl">
          {tab === "list" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#003865]">Liste des employés</h2>
                <button onClick={exportPDF} className="bg-red-500 text-white px-3 py-1 rounded">Exporter PDF</button>
              </div>
              <table className="w-full table-auto border border-collapse bg-white">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border p-2">Nom</th>
                    <th className="border p-2">Carte</th>
                    <th className="border p-2">Rabais</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employes.length > 0 ? (
                    employes.map((emp) => (
                      <tr key={emp._id}>
                        <td className="border p-2">
                          {editingId === emp._id ? (
                            <input value={editNom} onChange={(e) => setEditNom(e.target.value)} className="border px-2" />
                          ) : emp.nom}
                        </td>
                        <td className="border p-2">
                          {editingId === emp._id ? (
                            <input value={editCarte} onChange={(e) => setEditCarte(e.target.value)} className="border px-2" />
                          ) : emp.carte}
                        </td>
                        <td className="border p-2">
                          {editingId === emp._id ? (
                            <select value={editRabais} onChange={(e) => setEditRabais(e.target.value)} className="border">
                              <option value="10">10%</option>
                              <option value="20">20%</option>
                              <option value="30">30%</option>
                            </select>
                          ) : `${emp.rabais}%`}
                        </td>
                        <td className="border p-2">
                          {editingId === emp._id ? (
                            <button onClick={handleUpdateEmployee} className="bg-green-600 text-white px-2 py-1 rounded">Sauvegarder</button>
                          ) : (
                            <>
                              <button onClick={() => {
                                setEditingId(emp._id);
                                setEditNom(emp.nom);
                                setEditCarte(emp.carte);
                                setEditRabais(emp.rabais);
                              }} className="bg-blue-500 text-white px-2 py-1 rounded">Modifier</button>
                              <button onClick={() => handleDeleteEmployee(emp._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Supprimer</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan="4" className="text-center p-4 text-gray-500">Aucun employé inscrit</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {tab === "add" && (
            <form className="space-y-4" onSubmit={handleAddEmployee}>
              <h2 className="text-xl font-bold mb-4 text-[#003865] text-center">Ajouter un nouvel employé</h2>
              <input type="text" placeholder="Nom et prénom" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full p-3 border rounded" required />
              <input type="text" placeholder="Numéro de carte à puce" value={carte} onChange={(e) => setCarte(e.target.value)} className="w-full p-3 border rounded" required />
              <select value={rabais} onChange={(e) => setRabais(e.target.value)} className="w-full p-3 border rounded">
                <option value="10">10%</option>
                <option value="20">20%</option>
                <option value="30">30%</option>
              </select>
              <button type="submit" className="bg-[#217da0] text-white px-4 py-3 rounded w-full">Ajouter</button>
              {message && <p className="text-center text-sm text-blue-600">{message}</p>}
            </form>
          )}

          {tab === "payment" && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-[#003865] text-center">Paiement</h2>
              <div className="space-y-2 text-gray-700 text-lg">
                <p>Sous-total : <strong>{formatCAD(sousTotal)}</strong></p>
                <p>TPS (5%) : <strong>{formatCAD(tps)}</strong></p>
                <p>TVQ (9.975%) : <strong>{formatCAD(tvq)}</strong></p>
                <hr className="my-2" />
                <p>Total TTC : <strong>{formatCAD(totalTTC)}</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
