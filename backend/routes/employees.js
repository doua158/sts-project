const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// ✅ Ajouter un employé
router.post("/add", async (req, res) => {
  const { partenaireId, nom, carte, rabais } = req.body;

  try {
    const newEmp = new Employee({
      partenaireId,
      nom,
      carte,
      rabais
    });

    await newEmp.save();
    res.status(201).json({ message: "Employé ajouté" });
  } catch (err) {
    console.error("Erreur ajout employé :", err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// ✅ Lister les employés d’un partenaire
router.get("/by-partner/:id", async (req, res) => {
  try {
    const employes = await Employee.find({ partenaireId: req.params.id });
    res.json(employes);
  } catch (err) {
    console.error("Erreur chargement employés :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
