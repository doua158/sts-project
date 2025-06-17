const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config(); // ✅ Chargement des variables d'environnement


const app = express();

// ✅ Importer les routes une seule fois
const adminRoutes = require("./routes/admin");
const partnerRoutes = require("./routes/partner");
const employeeRoutes = require("./routes/employees");

// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Activer les routes
app.use("/api/employee", employeeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partner", partnerRoutes);

// ✅ Connexion MongoDB Atlas via variable d'environnement
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Atlas connecté"))
.catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// ✅ Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
