import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/AdminDashboard";
import DashboardPartenaire from "./pages/Dashboard"; // ✅ fichier Dashboard.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/dashboard-partenaire" element={<DashboardPartenaire />} />
        <Route path="*" element={<div className="text-center p-10 text-red-600">404 - Page non trouvée</div>} />
      </Routes>
    </Router>
  );
}

export default App;
