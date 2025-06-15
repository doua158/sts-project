import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // ✅ ajout
import PartenaireLogin from "./pages/Login";
import PartnerDashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ route d'accueil */}
        <Route path="/login" element={<PartenaireLogin />} />
        <Route path="/dashboard-partenaire" element={<PartnerDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

// ✅ Composant 404
function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4 text-[#003865]">404 - Page non trouvée</h1>
      <p className="text-gray-700">Cette page n'existe pas.</p>
      <a href="/" className="mt-6 text-blue-600 underline">
        Retour à l'accueil
      </a>
    </div>
  );
}

export default App;
