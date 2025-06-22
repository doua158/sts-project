import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PartnerDashboard() {
  const [tab, setTab] = useState("list");
  const [employes, setEmployes] = useState([]);
  const [nom, setNom] = useState("");
  const [carte, setCarte] = useState("");
  const [rabais, setRabais] = useState(10);
  const [message, setMessage] = useState("");

  const partenaireId = localStorage.getItem("partenaireId");

  // ✅ Fonctions API intégrées
  const getEmployesByPartner = (id) => {
    return axios.get(`http://localhost:5000/api/employee/by-partner/${id}`);
  };

  const addEmploye = (data) => {
    return axios.post("http://localhost:5000/api/employee/add", data);
  };

  const deleteEmploye = (id) => {
    return axios.delete(`http://localhost:5000/api/employee/${id}`);
  };

  const formatCAD = (value) =>
    new Intl.NumberFormat("fr-CA", {
      style: "currency",
      currency: "CAD",
    }).format(value);

  useEffect(() => {
    if (!partenaireId) {
      window.location.href = "/";
    }
  }, [partenaireId]);

  useEffect(() => {
    if (tab === "list" && partenaireId) {
      getEmployesByPartner(partenaireId)
        .then((res) => setEmployes(res.data))
        .catch((err) => console.error("❌ Erreur chargement employés :", err));
    }
  }, [tab, partenaireId]);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const totalMontant = employes.length * ((90 * rabais) / 100);
      await addEmploye({
        partenaireId,
        nom,
        carte,
        rabais,
        montant: totalMontant,
      });
      setMessage("✅ Employé ajouté !");
      setNom("");
      setCarte("");
      setRabais(10);
    } catch (err) {
      console.error("❌ Erreur ajout :", err);
      setMessage("❌ Erreur lors de l'ajout.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await deleteEmploye(id);
      setEmployes(employes.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("❌ Erreur suppression :", err);
      setMessage("❌ Erreur lors de la suppression.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("partenaireId");
    window.location.href = "/";
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des employés", 14, 10);
    const rows = employes.map((emp) => [emp.nom, emp.carte, `${emp.rabais} %`]);
    doc.autoTable({
      head: [["Nom", "Carte", "Rabais"]],
      body: rows,
    });
    doc.save("employes.pdf");
  };

  const montantParEmploye = 50;
  const totalEmployes = employes.length;
  const totalHT = montantParEmploye * totalEmployes;
  const taxe5 = totalHT * 0.05;
  const taxe9 = totalHT * 0.09;
  const totalTTC = totalHT + taxe5 + taxe9;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")' }}
    >
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />

      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <img src="/sts-logo.png" alt="STS" className="h-10" />
        <div className="flex gap-4">
          <h1 className="text-white text-xl font-semibold">Tableau de bord Partenaire</h1>
          <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">
            Déconnexion
          </button>
        </div>
      </div>

      <div className="relative z-10 flex justify-center gap-4 py-6">
        <button onClick={() => setTab("list")} className={`px-4 py-2 rounded ${tab === "list" ? "bg-[#c6d300] text-black" : "bg-white text-[#003865]"}`}>Liste des employés</button>
        <button onClick={() => setTab("add")} className={`px-4 py-2 rounded ${tab === "add" ? "bg-[#c6d300] text-black" : "bg-white text-[#003865]"}`}>Inscrire un employé</button>
        <button onClick={() => setTab("payment")} className={`px-4 py-2 rounded ${tab === "payment" ? "bg-[#c6d300] text-black" : "bg-white text-[#003865]"}`}>Paiement</button>
      </div>

      <div className="relative z-10 flex-grow px-6 pb-12 flex justify-center items-start">
        <div className="bg-white/95 p-10 rounded-2xl shadow-lg w-full max-w-5xl">
          {tab === "list" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#003865] text-center">Liste des employés</h2>
                <button onClick={exportPDF} className="bg-red-500 text-white px-3 py-1 rounded">Exporter en PDF</button>
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
                        <td className="border p-2">{emp.nom}</td>
                        <td className="border p-2">{emp.carte}</td>
                        <td className="border p-2">{emp.rabais}%</td>
                        <td className="border p-2">
                          <button onClick={() => alert("Fonction Modifier à implémenter")} className="bg-blue-500 text-white px-2 py-1 rounded">Modifier</button>
                          <button onClick={() => handleDeleteEmployee(emp._id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">Supprimer</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center p-4 text-gray-500">Aucun employé inscrit</td>
                    </tr>
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
                <p>Nombre d'employés : <strong>{totalEmployes}</strong></p>
                <p>Montant total (HT) : <strong>{formatCAD(totalHT)}</strong></p>
                <p>Taxe 5% : <strong>{formatCAD(taxe5)}</strong></p>
                <p>Taxe 9% : <strong>{formatCAD(taxe9)}</strong></p>
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
