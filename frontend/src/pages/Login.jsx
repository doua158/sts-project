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
    entreprise: "",
    responsable: "",
    adresse: "",
    email: "",
    phone: "",
    password: "",
  });
  const [registerMessage, setRegisterMessage] = useState("");

  const t = {
    fr: {
      title: "Espace Partenaire",
      loginTitle: "Connexion Partenaire",
      adminTitle: "Connexion Admin",
      email: "Courriel",
      password: "Mot de passe",
      loginBtn: "Se connecter",
      adminBtn: "Se connecter comme Admin",
      registerTitle: "Inscription Partenaire",
      entreprise: "Nom de l’entreprise",
      responsable: "Responsable du partenariat",
      adresse: "Adresse",
      phone: "Numéro de téléphone",
      registerBtn: "Créer un compte partenaire",
      success: "✅ Partenaire enregistré avec succès !",
    },
    en: {
      title: "Partner Portal",
      loginTitle: "Partner Login",
      adminTitle: "Admin Login",
      email: "Email",
      password: "Password",
      loginBtn: "Login",
      adminBtn: "Login as Admin",
      registerTitle: "Partner Registration",
      entreprise: "Company name",
      responsable: "Partnership manager",
      adresse: "Address",
      phone: "Phone number",
      registerBtn: "Create partner account",
      success: "✅ Partner registered successfully!",
    },
  };

  useEffect(() => {
    const partenaireId = localStorage.getItem("partenaireId");
    const adminToken = localStorage.getItem("adminToken");
    if (partenaireId) {
      window.location.href = "#/dashboard-partenaire";
    } else if (adminToken) {
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
      setRegisterMessage(t[lang].success);
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
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")' }}
    >
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />
      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <img src="/sts-logo.png" alt="STS" className="h-10" />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="bg-white text-[#003865] rounded px-3 py-1 text-sm shadow"
        >
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="relative z-10 flex-grow flex justify-center items-center px-6 py-12">
        <div className="bg-white/95 rounded-xl shadow-lg w-full max-w-6xl flex flex-wrap overflow-hidden">
          {/* Connexion Partenaire et Admin */}
          <div className="w-full md:w-1/2 p-8 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-[#003865] text-center">{t[lang].loginTitle}</h2>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder={t[lang].email} value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="password" placeholder={t[lang].password} value={login.password}
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              {error && <div className="text-red-600 text-sm mb-3 text-center">{error}</div>}
              <button className="bg-[#c6d300] text-black font-semibold w-full py-2 rounded mb-6">
                {t[lang].loginBtn}
              </button>
            </form>

            <h2 className="text-xl font-bold mb-4 text-[#003865] text-center">{t[lang].adminTitle}</h2>
            <form onSubmit={handleAdminLogin}>
              <input type="email" placeholder={t[lang].email} value={adminLogin.email}
                onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="password" placeholder={t[lang].password} value={adminLogin.password}
                onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              {adminError && <div className="text-red-600 text-sm mb-3 text-center">{adminError}</div>}
              <button className="bg-[#217da0] text-white font-semibold w-full py-2 rounded">
                {t[lang].adminBtn}
              </button>
            </form>
          </div>

          {/* Inscription Partenaire */}
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-xl font-bold mb-4 text-[#003865] text-center">{t[lang].registerTitle}</h2>
            <form onSubmit={handleRegister}>
              <input type="text" placeholder={t[lang].entreprise} value={register.entreprise}
                onChange={(e) => setRegister({ ...register, entreprise: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="text" placeholder={t[lang].responsable} value={register.responsable}
                onChange={(e) => setRegister({ ...register, responsable: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="text" placeholder={t[lang].adresse} value={register.adresse}
                onChange={(e) => setRegister({ ...register, adresse: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="email" placeholder={t[lang].email} value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="text" placeholder={t[lang].phone} value={register.phone}
                onChange={(e) => setRegister({ ...register, phone: e.target.value })}
                className="w-full p-2 mb-3 border rounded" />
              <input type="password" placeholder={t[lang].password} value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
                className="w-full p-2 mb-4 border rounded" />
              {registerMessage && <div className="text-blue-700 text-sm mb-3 text-center">{registerMessage}</div>}
              <button className="bg-[#12365b] text-white w-full py-2 rounded">
                {t[lang].registerBtn}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
