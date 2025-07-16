const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// Ajouter un employé
router.post("/api/employee/add", async (req, res) => {
  const { partenaireId, nom, carte, rabais, montant } = req.body;
  try {
    const newEmp = new Employee({ partenaireId, nom, carte, rabais, montant });
    await newEmp.save();
    res.status(201).json({ message: "Employé ajouté avec succès", employee: newEmp });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// Lister les employés d’un partenaire
router.get("/api/employee/by-partner/:id", async (req, res) => {
  try {
    const employes = await Employee.find({ partenaireId: req.params.id });
    res.status(200).json(employes);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Modifier un employé
router.put("/api/employee/:id", async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Employé non trouvé" });
    res.status(200).json({ message: "Employé modifié avec succès", employee: updated });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Supprimer un employé
router.delete("/api/employee/:id", async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Employé non trouvé" });
    res.status(200).json({ message: "Employé supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
