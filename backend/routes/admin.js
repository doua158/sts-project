const express = require("express");
const router = express.Router();
const path = require("path");

// 🔒 Modèles
const Admin = require(path.join(__dirname, "..", "models", "Admin"));
const Partner = require(path.join(__dirname, "..", "models", "Partner"));
const Employee = require(path.join(__dirname, "..", "models", "Employee"));

// ✅ Connexion admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Identifiants admin invalides" });
    }
    return res.status(200).json({ token: "admin-token", message: "Connexion réussie" });
  } catch (err) {
    console.error("❌ Erreur connexion admin :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Résumé des partenaires + nombre d'employés
router.get("/partners-summary", async (req, res) => {
  try {
    const partners = await Partner.find();

    const summary = await Promise.all(
      partners.map(async (p) => {
        const count = await Employee.countDocuments({ partenaireId: p._id });
        return {
          _id: p._id,
          entreprise: p.entreprise,
          responsable: p.responsable,
          adresse: p.adresse,
          email: p.email,
          phone: p.phone,
          nbEmployes: count,
        };
      })
    );

    res.json(summary);
  } catch (err) {
    console.error("❌ Erreur résumé partenaires :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
