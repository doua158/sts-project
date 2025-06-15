const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://localhost:27017/sts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    console.log("✅ Connecté à MongoDB");

    const username = "admin";
    const password = "admin123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const existing = await User.findOne({ username });
    if (existing) {
      console.log("⚠️ Utilisateur déjà existant");
      mongoose.disconnect();
      return;
    }

    const user = new User({ username, password: hashedPassword });
    await user.save();

    console.log("🎉 Utilisateur créé avec succès !");
    console.log(`🧑 Nom d'utilisateur : ${username}`);
    console.log(`🔑 Mot de passe : ${password}`);
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MongoDB :", err);
  });
