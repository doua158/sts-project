const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const Admin = require(path.join(__dirname, "..", "models", "Admin"));
const Partner = require(path.join(__dirname, "..", "models", "Partner"));
const Employee = require(path.join(__dirname, "..", "models", "Employee"));

// 🔐 Connexion admin avec logs de debug
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("📥 Données reçues :", email, password);

  try {
    const admin = await Admin.findOne({ email });
    console.log("🔍 Admin trouvé :", admin);

    if (!admin) {
      console.log("❌ Aucun admin trouvé pour :", email);
      return res.status(401).json({ message: "Identifiants admin invalides" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔐 bcrypt.compare:", isMatch);

    if (!isMatch) {
      console.log("❌ Mot de passe incorrect !");
      return res.status(401).json({ message: "Identifiants admin invalides" });
    }

    return res.status(200).json({ token: "admin-token", message: "Connexion réussie" });
  } catch (err) {
    console.error("❌ Erreur login admin :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🛠️ Route temporaire pour forcer l'insertion d’un admin
router.post("/force-create", async (req, res) => {
  try {
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@test.com",
      password: hashedPassword,
    });

    return res.status(201).json({ message: "✅ Admin réinséré avec succès (admin123)" });
  } catch (err) {
    console.error("❌ Erreur insertion force-create :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});
// ✅ Récupérer le résumé des partenaires (entreprise, nb employés)
router.get("/partners-summary", async (req, res) => {
  try {
    const partners = await Partner.find();

    // Pour chaque partenaire, compter les employés associés
    const summary = await Promise.all(partners.map(async (p) => {
      const employeeCount = await Employee.countDocuments({ partenaireId: p._id });
      return {
        entreprise: p.entreprise,
        responsable: p.responsable,
        adresse: p.adresse,
        email: p.email,
        telephone: p.telephone,
        nbEmployes: employeeCount
      };
    }));

    res.status(200).json(summary);
  } catch (err) {
    console.error("❌ Erreur partners-summary :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
