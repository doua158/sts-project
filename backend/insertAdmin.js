const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

// 🔗 Remplace par ton URI Atlas
const uri = "mongodb+srv://omranidoua:14707902doua@cluster0.26xvhmp.mongodb.net/sts?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const exists = await Admin.findOne({ email: "admin@test.com" });

  if (exists) {
    console.log("⚠️ L'admin existe déjà.");
    return mongoose.disconnect();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10); // mot de passe chiffré

  const admin = new Admin({
    email: "admin@test.com",
    password: hashedPassword,
  });

  await admin.save();
  console.log("✅ Admin sécurisé inséré avec succès !");
  mongoose.disconnect();
})
.catch((err) => console.error("❌ Erreur MongoDB :", err));
