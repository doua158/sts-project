const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  entreprise: String,
  responsable: String,
  adresse: String,
  email: { type: String, required: true, unique: true },
  phone: String,
  password: { type: String, required: true }
});

module.exports = mongoose.model("Partner", partnerSchema);
