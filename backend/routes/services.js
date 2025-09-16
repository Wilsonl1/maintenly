const express = require("express");
const router = express.Router();
const Service = require("../models/services");
const Vehicle = require("../models/vehicles"); // import vehicle model

// Create a new service for a specific vehicle
// This works
router.post("/:vehicleId/services", async (req, res) => {
  const vehicleId = req.params.vehicleId;

  try {
    // Make sure vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found." });

    const service = new Service({
    vehicle: vehicleId, // This is the game changer. 
    service: req.body.service,
    date: req.body.date,
    mileage: req.body.mileage,
    description: req.body.description,
    company: req.body.company,
    cost: req.body.cost,
    notes: req.body.notes,
    });

    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error("Error adding servcie:", err.message);
    res.status(400).json({ message: "Service could not be added.", error: err.message });
  }
});

//Get all services for that vehicle 
//This works
router.get("/:vehicleId/services", async (req, res) => {
  try {
    const services = await Service.find({ vehicle: req.params.vehicleId });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not get services", error: err.message });
  }
});

// Get 1 service by service_id and show the vehicle it belongs to. 
// This works
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("vehicle", "year make model");
    if(!service) return res.status(404).json({ message: "Vehicle service not found." });
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching service." });
  }
});


// Update a vehicle 
// This works
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: "Service not updated." });
  }
});

// Delete a vehicle
// This works
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Service could not be deleted." });
  }
});

 module.exports = router;