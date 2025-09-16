const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    vehicle: {type:mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
    date:{ type: Date, default: Date.now },
    mileage: { type: Number, required: false },
    description: { type: String, required: true },
    company: { type: String, required: false },
    cost: { type: Number, default: 0 },
    notes: { type: String, required: false }
});

module.exports = mongoose.model("Service", serviceSchema);