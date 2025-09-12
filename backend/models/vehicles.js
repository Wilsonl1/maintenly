const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
 