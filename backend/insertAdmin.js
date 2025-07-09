require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    await Admin.deleteMany({});
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Admin.create({ email: "admin@test.com", password: hashedPassword });
    console.log("✅ Admin créé !");
    mongoose.disconnect();
  })
  .catch(console.error);
