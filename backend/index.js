const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Import Vehicle model
const Vehicle = require("./models/vehicles");

// Get all vehicles
app.get("/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Vehicles not found." });
  }
});

// Add a new vehicle
app.post("/vehicle", async (req, res) => {
  const vehicle = new Vehicle({
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
  });

  try {
    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    res.status(400).json({ message: "Vehicle not added." });
  }
});

// Update a vehicle
app.put("/vehicle/:id", async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: "Vehicle not updated." });
  }
});

// Delete a vehicle
app.delete("/vehicle/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: "Vehicle could not be deleted." });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
