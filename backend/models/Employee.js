const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  partenaireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partner",
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  carte: {
    type: String,
    required: true
  },
  rabais: {
    type: Number,
    default: 0
  },
  montant: {
    type: Number,
    default: 90
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
