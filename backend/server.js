const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// ✅ Importer les routes
const adminRoutes = require("./routes/admin");
const partnerRoutes = require("./routes/partner");
const employeeRoutes = require("./routes/employees");


// ✅ Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/employee", employeeRoutes);

// ✅ Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/sts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connecté"))
.catch((err) => console.error("❌ MongoDB erreur :", err));

// ✅ Activer les routes
app.use("/api/admin", adminRoutes);
app.use("/api/partner", partnerRoutes); // ✅ Une seule fois

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur http://localhost:${PORT}`);
});
