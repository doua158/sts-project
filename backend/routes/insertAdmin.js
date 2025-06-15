const mongoose = require("mongoose");
const Admin = require("../models/Admin");

mongoose.connect("mongodb://localhost:27017/sts", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const exists = await Admin.findOne({ email: "admin@sts.qc.ca" });
  if (exists) {
    console.log("⚠️ Admin existe déjà");
    return mongoose.disconnect();
  }

  const admin = new Admin({
    email: "admin@sts.qc.ca",
    password: "admin123"
  });

  await admin.save();
  console.log("✅ Admin ajouté !");
  mongoose.disconnect();
}).catch((err) => console.error("❌ Erreur :", err));
