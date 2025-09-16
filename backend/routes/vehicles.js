const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicles");
const User = require("../models/users"); // import User model

// Create a new vehicle for a specific user
// This Works 
router.post("/:userId/vehicles", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Make sure user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const vehicle = new Vehicle({
      year: req.body.year,
      make: req.body.make,
      model: req.body.model,
      user: userId
    });

    const newVehicle = await vehicle.save();
    res.status(201).json(newVehicle);
  } catch (err) {
    console.error("Error adding vehicle:", err.message);
    res.status(400).json({ message: "Vehicle could not be added.", error: err.message });
  }
});

//Get all vehicles for that user 
// This works
router.get("/:userId/vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.params.userId });
    res.json(vehicles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not get  users vehicles", error: err.message });
  }
});

// Get 1 vehicle by vehicle id and show the user it belongs to. 
//This works
router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id).populate("user", "firstname lastname");
    if(!vehicle) return res.status(404).json({ message: "User vehicle not found." });
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching vehicle." });
  }
});


// Update a vehicle // This works too but you have to use the vehicle id not the users
router.put("/:id", async (req, res) => {
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
// This works
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: "Vehicle could not be deleted." });
  }
});

 module.exports = router;