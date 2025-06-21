import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// 🟢 Tes composants/pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard-partenaire" element={<Dashboard />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        {/* Optionnel : route fallback si URL incorrecte */}
        <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
