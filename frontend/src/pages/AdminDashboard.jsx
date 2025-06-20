import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/partners-summary`);
        setSummary(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    // garde ton interface de tableau ici aussi
    <div>... résumé des partenaires</div>
  );
}
