// insertAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

const MONGODB_URI = "mongodb+srv://omranidoua:14707902doua@cluster0.26xvhmp.mongodb.net/sts?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log("✅ Connexion MongoDB réussie");

    // Supprime les anciens admins (optionnel)
    await Admin.deleteMany({});

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      email: "admin@test.com",
      password: hashedPassword,
    });

    await admin.save();
    console.log("✅ Admin sécurisé inséré avec succès !");
    mongoose.disconnect();
  })
  .catch((err) => console.error("❌ Erreur MongoDB :", err));
