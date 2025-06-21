import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

export default function Login() {
  const [lang, setLang] = useState("fr");
  const [login, setLogin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });
  const [adminError, setAdminError] = useState("");
  const [register, setRegister] = useState({
    entreprise: "",
    responsable: "",
    adresse: "",
    email: "",
    phone: "",
    password: "",
  });
  const [registerMessage, setRegisterMessage] = useState("");

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
      setRegister({
        entreprise: "",
        responsable: "",
        adresse: "",
        email: "",
        phone: "",
        password: "",
      });
    } catch (err) {
      setRegisterMessage("❌ " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Connexion Partenaire</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
          required
        />
        <button type="submit">Connexion</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <hr />

      <h1>Connexion Admin</h1>
      <form onSubmit={handleAdminLogin}>
        <input
          type="email"
          placeholder="Email admin"
          value={adminLogin.email}
          onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe admin"
          value={adminLogin.password}
          onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
          required
        />
        <button type="submit">Connexion Admin</button>
        {adminError && <p style={{ color: "red" }}>{adminError}</p>}
      </form>

      <hr />

      <h1>Inscription Partenaire</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Entreprise"
          value={register.entreprise}
          onChange={(e) => setRegister({ ...register, entreprise: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Responsable"
          value={register.responsable}
          onChange={(e) => setRegister({ ...register, responsable: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Adresse"
          value={register.adresse}
          onChange={(e) => setRegister({ ...register, adresse: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Téléphone"
          value={register.phone}
          onChange={(e) => setRegister({ ...register, phone: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={register.password}
          onChange={(e) => setRegister({ ...register, password: e.target.value })}
          required
        />
        <button type="submit">Inscription</button>
        {registerMessage && <p>{registerMessage}</p>}
      </form>
    </div>
  );
}
