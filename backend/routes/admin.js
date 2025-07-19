const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const Admin = require(path.join(__dirname, "..", "models", "Admin"));
const Partner = require(path.join(__dirname, "..", "models", "Partner"));
const Employee = require(path.join(__dirname, "..", "models", "Employee"));

// 🔐 Connexion admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Identifiants admin invalides" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Identifiants admin invalides" });

    return res.status(200).json({ token: "admin-token", message: "Connexion réussie" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🛠️ Route pour forcer l’insertion d’un admin (à usage unique)
router.post("/force-create", async (req, res) => {
  try {
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@test.com", password: hashedPassword });
    return res.status(201).json({ message: "✅ Admin réinséré avec succès (admin123)" });
  } catch (err) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ Récupérer le résumé des partenaires (avec leur ID et nombre d’employés)
router.get("/partners-summary", async (req, res) => {
  try {
    const partners = await Partner.find();
    const summary = await Promise.all(partners.map(async (p) => {
      const employeeCount = await Employee.countDocuments({ partenaireId: p._id });
      return {
        _id: p._id, // pour que le bouton fonctionne dans DashboardAdmin
        entreprise: p.entreprise,
        responsable: p.responsable,
        adresse: p.adresse,
        email: p.email,
        phone: p.telephone, // attention : champ correct attendu par frontend
        nbEmployes: employeeCount
      };
    }));

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
