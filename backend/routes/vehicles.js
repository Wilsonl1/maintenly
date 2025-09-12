const express = require("express");
const Vehicle = require("../models/vehicles");
const router = express.Router();

// Create a new vehicle for a specific user
router.post("/users/:userId/vehicles", async (req, res) => {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const vehicle = new Vehicle({
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        user: userId,
    });

    try {
        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Vehicle not added", error: err.message });
    }
});

// Get all vehicles
// I migh comment this out becasue I need to add authentication and authorization to this app.
// router.get("/", async (req, res) => {
//     try { const vehicles = await Vehicle.find();
//         res.json(vehicles);
//     } catch (err){
//         res.status(500).json({ message: "could not get vehicles."});
//     }
// });

// Get all vehicles by user   //This works
router.get("/:userId", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ user: req.params.userId});
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Users vehicles not found." });
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
router.delete("/:id", async (req, res) => {
  try {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ message: "Vehicle could not be deleted." });
  }
});

module.exports = router;