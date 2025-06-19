import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection automatique vers la page de connexion
    navigate("/login");
  }, [navigate]);

  return null; // Rien à afficher, redirection immédiate
}
