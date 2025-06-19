import React from "react";

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{
        backgroundImage:
          'url("/0ccc6485-54f9-4455-ab2b-9cae16b8cf77.jpeg")',
      }}
    >
      <div className="absolute inset-0 bg-[#001e3c]/80 z-0" />
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
        <img src="/sts-logo.png" alt="STS Logo" className="h-24 mb-6" />
        <h1 className="text-white text-4xl font-bold mb-4">
          Bienvenue sur la plateforme STS
        </h1>
        <p className="text-white text-lg max-w-xl">
          Cette plateforme permet aux partenaires d’inscrire leurs employés, de
          gérer les paiements et de suivre l’évolution de leur collaboration
          avec STS.
        </p>
      </div>
    </div>
  );
}
