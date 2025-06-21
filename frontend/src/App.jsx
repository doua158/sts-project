import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PartnerDashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard-partenaire" element={<PartnerDashboard />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
