import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PartenaireLogin from "./pages/Login";
import PartnerDashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard"; // ✅ ajout du dashboard admin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* ✅ Page d’accueil */}
        <Route path="/login" element={<PartenaireLogin />} /> {/* ✅ Connexion */}
        <Route path="/dashboard-partenaire" element={<PartnerDashboard />} /> {/* ✅ Dashboard partenaire */}
        <Route path="/dashboard-admin" element={<AdminDashboard />} /> {/* ✅ Dashboard admin */}
        <Route path="*" element={<NotFound />} /> {/* ✅ Page 404 */}
      </Routes>
    </Router>
  );
}

// ✅ Page 404
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
