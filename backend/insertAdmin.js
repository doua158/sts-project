const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin"); // adapte le chemin si nécessaire

// ✅ URI correctement encadrée de guillemets
const MONGODB_URI = "mongodb+srv://omranidoua:14707902doua@cluster0.26xvhmp.mongodb.net/sts?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Connexion MongoDB réussie");

    // 🔁 Supprime tous les anciens admins (optionnel)
    await Admin.deleteMany({});
    console.log("🧹 Anciens admins supprimés");

    // 🔐 Hasher le mot de passe
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // 🆕 Création du nouvel admin
    await Admin.create({
      email: "admin@test.com",
      password: hashedPassword,
    });

    console.log("✅ Nouvel admin créé : admin@test.com / admin123");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion ou d’insertion :", err);
    mongoose.disconnect();
  });
