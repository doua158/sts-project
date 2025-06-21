import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export default function PartenaireLogin() {
  const [lang, setLang] = useState("fr");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });
  const [adminError, setAdminError] = useState("");
  const [register, setRegister] = useState({
    entreprise: "", responsable: "", adresse: "", email: "", phone: "", password: "",
  });
  const [registerMessage, setRegisterMessage] = useState("");

  // Redirection si déjà connecté
  useEffect(() => {
    if (localStorage.getItem("partenaireId")) {
      window.location.href = "#/dashboard-partenaire";
    } else if (localStorage.getItem("adminToken")) {
      window.location.href = "#/dashboard-admin";
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${API_BASE}/api/partner/login`, login);
      const partner = response.data?.partner;
      if (partner && partner._id) {
        localStorage.setItem("partenaireId", partner._id);
        window.location.href = "#/dashboard-partenaire";
      } else {
        setError("❌ Identifiants invalides ou données manquantes.");
      }
    } catch (err) {
      setError("❌ " + (err.response?.data?.message || "Erreur serveur"));
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError("");
    try {
      const response = await axios.post(`${API_BASE}/api/admin/login`, adminLogin);
      localStorage.setItem("adminToken", response.data?.token);
      window.location.href = "#/dashboard-admin";
    } catch (err) {
      setAdminError("❌ " + (err.response?.data?.message || err.message));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterMessage("");
    try {
      await axios.post(`${API_BASE}/api/partner/register`, register);
      setRegisterMessage("✅ Partenaire enregistré avec succès !");
      setRegister({ entreprise: "", responsable: "", adresse: "", email: "", phone: "", password: "" });
    } catch (err) {
      setRegisterMessage("❌ " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      {/* Ton interface JSX ici */}
      {/* Formulaires de connexion admin, partenaire, et d’inscription */}
    </div>
  );
}
