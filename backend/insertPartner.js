const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Partner = require("./models/Partner");

// Connexion à MongoDB
mongoose.connect("mongodb://localhost:27017/sts", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connecté à MongoDB");

  const email = "partner@example.com";
  const entreprise = "TestCorp";
  const responsable = "Jean Test";
  const adresse = "1 rue du test";
  const phone = "123456789";
  const plainPassword = "test1234";

  const existing = await Partner.findOne({ email });
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  if (existing) {
    existing.password = hashedPassword;
    existing.entreprise = entreprise;
    existing.responsable = responsable;
    existing.adresse = adresse;
    existing.phone = phone;
    await existing.save();
    console.log("🔁 Partenaire mis à jour :", email);
  } else {
    const newPartner = new Partner({
      entreprise,
      responsable,
      adresse,
      email,
      phone,
      password: hashedPassword,
    });

    await newPartner.save();
    console.log("✅ Nouveau partenaire inséré :", email);
  }

  process.exit();
})
.catch((err) => {
  console.error("❌ Erreur MongoDB :", err);
  process.exit(1);
});
