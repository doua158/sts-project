import React, { useEffect, useState } from "react";
import API from "./api";

export default function AdminDashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await API.get("/api/admin/partners-summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#003865]">Dashboard Admin</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#003865] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Entreprise</th>
              <th className="py-3 px-6 text-left">Responsable</th>
              <th className="py-3 px-6 text-left">Adresse</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Téléphone</th>
              <th className="py-3 px-6 text-left">Nombre d’employés</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="py-3 px-6">{item.entreprise}</td>
                <td className="py-3 px-6">{item.responsable}</td>
                <td className="py-3 px-6">{item.adresse}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.phone}</td>
                <td className="py-3 px-6 text-center font-bold text-[#003865]">
                  {item.nbEmployes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
