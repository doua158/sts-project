import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-partenaire" element={<Dashboard />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        {/* Ajoute ici d'autres routes si nécessaires */}
      </Routes>
    </Router>
  );
}

export default App;
