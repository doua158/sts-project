import React from "react";
import { Link } from "react-router-dom";
import API from "./api";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white p-12 rounded-xl shadow-2xl text-center w-full max-w-lg">
        <img src="/sts-logo.png" alt="STS Logo" className="h-16 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Bienvenue sur la plateforme STS</h1>
        <p className="text-gray-700 mb-6">
          Veuillez vous connecter ou vous inscrire pour accéder à votre espace partenaire ou administrateur.
        </p>
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Connexion / Inscription
          </Link>
        </div>
      </div>
    </div>
  );
}
