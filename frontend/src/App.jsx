import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import DashboardAdmin from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />             {/* ✅ Page d'accueil */}
        <Route path="/login" element={<Login />} />       {/* ✅ Page de connexion */}
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
