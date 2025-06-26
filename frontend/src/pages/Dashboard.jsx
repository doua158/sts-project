// PartnerDashboard.jsx
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
  const [editId, setEditId] = useState(null);

  const partenaireId = localStorage.getItem("partenaireId");

  const getEmployesByPartner = (id) => axios.get(`${API}/api/employee/by-partner/${id}`);
  const addEmploye = (data) => axios.post(`${API}/api/employee/add`, data);
  const deleteEmploye = (id) => axios.delete(`${API}/api/employee/${id}`);
  const updateEmploye = (id, data) => axios.put(`${API}/api/employee/${id}`, data);

  const formatCAD = (value) => new Intl.NumberFormat("fr-CA", { style: "currency", currency: "CAD" }).format(value);

  useEffect(() => {
    if (!partenaireId) window.location.href = "/";
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
      if (editId) {
        await updateEmploye(editId, { nom, carte, rabais, montant: totalMontant });
        setMessage("✅ Employé modifié !");
        setEditId(null);
      } else {
        await addEmploye({ partenaireId, nom, carte, rabais, montant: totalMontant });
        setMessage("✅ Employé ajouté !");
      }
      setNom("");
      setCarte("");
      setRabais(10);
    } catch (err) {
      console.error("❌ Erreur ajout/modification :", err);
      setMessage("❌ Erreur lors de l'ajout ou de la modification.");
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

  const handleEditEmployee = (emp) => {
    setNom(emp.nom);
    setCarte(emp.carte);
    setRabais(emp.rabais);
    setEditId(emp._id);
    setTab("add");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des employés", 14, 10);
    const rows = employes.map((emp) => [emp.nom, emp.carte, `${emp.rabais} %`]);
    doc.autoTable({ head: [["Nom", "Carte", "Rabais"]], body: rows });
    doc.save("employes.pdf");
  };

  const montantParEmploye = 50;
  const totalEmployes = employes.length;
  const sousTotal = montantParEmploye * totalEmployes;
  const tps = sousTotal * 0.05;
  const tvq = sousTotal * 0.09975;
  const totalTTC = sousTotal + tps + tvq;

  return (
    <div>
      {/* Tabs */}
      <div>
        <button onClick={() => setTab("list")}>Liste des employés</button>
        <button onClick={() => setTab("add")}>{editId ? "Modifier" : "Ajouter"} un employé</button>
        <button onClick={() => setTab("payment")}>Paiement</button>
      </div>

      {/* Content */}
      {tab === "list" && (
        <div>
          <button onClick={exportPDF}>Exporter PDF</button>
          <table>
            <thead>
              <tr><th>Nom</th><th>Carte</th><th>Rabais</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {employes.map((emp) => (
                <tr key={emp._id}>
                  <td>{emp.nom}</td>
                  <td>{emp.carte}</td>
                  <td>{emp.rabais}%</td>
                  <td>
                    <button onClick={() => handleEditEmployee(emp)}>Modifier</button>
                    <button onClick={() => handleDeleteEmployee(emp._id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "add" && (
        <form onSubmit={handleAddEmployee}>
          <input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
          <input value={carte} onChange={(e) => setCarte(e.target.value)} placeholder="Carte" required />
          <select value={rabais} onChange={(e) => setRabais(e.target.value)}>
            <option value="10">10%</option>
            <option value="20">20%</option>
            <option value="30">30%</option>
          </select>
          <button type="submit">{editId ? "Modifier" : "Ajouter"}</button>
          {message && <p>{message}</p>}
        </form>
      )}

      {tab === "payment" && (
        <div>
          <p>Nombre d'employés : {totalEmployes}</p>
          <p>Sous-total : {formatCAD(sousTotal)}</p>
          <p>TPS (5%) : {formatCAD(tps)}</p>
          <p>TVQ (9.975%) : {formatCAD(tvq)}</p>
          <hr />
          <p>Total TTC : {formatCAD(totalTTC)}</p>
        </div>
      )}
    </div>
  );
}
