import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [lang, setLang] = useState("fr");

  const t = {
    fr: {
      title: "Bienvenue sur le portail STS",
      subtitle: "Gérez vos partenariats et employés facilement",
    },
    en: {
      title: "Welcome to STS Portal",
      subtitle: "Manage your partnerships and employees with ease",
    },
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{
        backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")',
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />

      {/* header */}
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

      {/* content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t[lang].title}</h1>
        <p className="text-xl md:text-2xl font-medium max-w-xl">{t[lang].subtitle}</p>
      </div>
    </div>
  );
}
