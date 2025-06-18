const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Partner = require("../models/Partner");

// ✅ Inscription partenaire
router.post("/register", async (req, res) => {
  const { entreprise, responsable, adresse, email, phone, password } = req.body;

  try {
    const existingPartner = await Partner.findOne({ email });
    if (existingPartner) {
      return res.status(400).json({ message: "Ce courriel est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPartner = new Partner({
      entreprise,
      responsable,
      adresse,
      email,
      phone,
      password: hashedPassword,
    });

    await newPartner.save();
    res.status(201).json({ message: "Inscription réussie !" });
  } catch (err) {
    console.error("❌ Erreur register :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ✅ Connexion partenaire
router.post("/login", async (req, res) => {
  // 💬 Debug : afficher ce que le frontend envoie
  console.log("📥 Données reçues dans /login :", req.body);

  const { email, password } = req.body;

  try {
    const partner = await Partner.findOne({ email });

    if (!partner) {
      console.log("❌ Aucun partenaire trouvé avec cet email");
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(password, partner.password);
    if (!isMatch) {
      console.log("❌ Mot de passe incorrect pour :", email);
      return res.status(401).json({ message: "Identifiants invalides." });
    }

    // ✅ Succès
    console.log("✅ Connexion réussie pour :", email);
    res.status(200).json({
      message: "Connexion réussie",
      partner,
      token: "FAKE_TOKEN"
    });

  } catch (err) {
    console.error("❌ Erreur login :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
