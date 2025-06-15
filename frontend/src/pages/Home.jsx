import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl font-bold text-[#12365b] mb-2">Programme Solidarité Transport</h1>
      <p className="text-lg text-[#4A5568] mb-6 max-w-xl">
        Offrez à votre clientèle un accès au transport collectif à tarif réduit à Sherbrooke.
        Ce portail permet aux organismes partenaires d’inscrire rapidement leurs bénéficiaires.
      </p>
      <Link to="/login" className="bg-[#217da0] text-white px-6 py-2 rounded-lg shadow hover:bg-[#195d73] transition">
        Accéder à l'espace partenaire
      </Link>
    </div>
  );
}
