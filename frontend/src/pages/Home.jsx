import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col" style={{ backgroundImage: 'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")' }}>
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />
      <div className="relative z-10 flex justify-between items-center px-6 py-4">
        <img src="/sts-logo.png" alt="STS" className="h-10" />
      </div>

      <div className="relative z-10 flex-grow flex justify-center items-center px-6 py-12">
        <div className="bg-white/95 rounded-xl shadow-lg w-full max-w-4xl p-8 text-center">
          <h1 className="text-3xl font-bold text-[#003865] mb-6">Bienvenue sur la plateforme STS</h1>
          <p className="text-gray-700 mb-6">Gérez vos employés, consultez vos paiements et plus encore depuis votre espace partenaire ou admin.</p>
          <a href="/login" className="bg-[#c6d300] text-black font-semibold px-6 py-3 rounded shadow hover:bg-[#b0bc00] transition">
            Accéder à la connexion
          </a>
        </div>
      </div>
    </div>
  );
}
