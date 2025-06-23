const mongoose = require("mongoose");
const Admin = require("../models/Admin"); // ✅ Supprimé l’espace inutile

mongoose.connect("mongodb://localhost:27017/sts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  const exists = await Admin.findOne({ email: "admin@test.com" }); // ✅ correspond à l'email qu'on veut insérer

  if (exists) {
    console.log("⚠️ L'admin existe déjà dans la base de données.");
    return mongoose.disconnect();
  }

  const admin = new Admin({
    email: "admin@test.com",
    password: "admin123", // ⚠️ Non chiffré : à sécuriser avec bcrypt si nécessaire
  });

  await admin.save();
  console.log("✅ Admin ajouté avec succès !");
  mongoose.disconnect();
})
.catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));
