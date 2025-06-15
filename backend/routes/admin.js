const express = require("express");
const router = express.Router();
const path = require("path");

// ✅ Chemin absolu pour éviter l'erreur de require
const Admin = require(path.join(__dirname, "..", "models", "Admin"));

console.log("✅ Fichier admin.js bien chargé !");

router.post("/login", async (req, res) => {
  console.log("🔵 Requête reçue :", req.body);
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Identifiants admin invalides" });
    }

    return res.status(200).json({ token: "admin-token", message: "Connexion réussie" });

  } catch (err) {
    console.error("❌ Erreur :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
