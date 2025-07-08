const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const Admin = require(path.join(__dirname, "..", "models", "Admin"));
const Partner = require(path.join(__dirname, "..", "models", "Partner"));
const Employee = require(path.join(__dirname, "..", "models", "Employee"));

// 🔐 Route de connexion admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Identifiants admin invalides" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Identifiants admin invalides" });
    }

    return res.status(200).json({ token: "admin-token", message: "Connexion réussie" });
  } catch (err) {
    console.error("❌ Erreur connexion admin :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

// 🆕 ROUTE TEMPORAIRE pour insérer admin@test.com / admin123
router.post("/force-create", async (req, res) => {
  try {
    await Admin.deleteMany({}); // Nettoyage
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

module.exports = router;
