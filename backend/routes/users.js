const express = require("express"); 
const router = express.Router();
const User = require("../models/users");
const Vehicle = require("../models/vehicles");
const bcrypt = require("bcrypt");


// We will not get all users because that is for the owner of the app to do, not the users of the app? 

//Create vehicle for a specific user
router.post("/:userId/vehicles", async (req, res) => {
    try{
        //make sure user exists first
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message:"User not found"});

        const vehicle = new vehicle({
            year: req.body.year,
            make: req.body.make,
            model: req.body.model,
            user: req.body.userId,
        });

        const newVehicle = await vehicle.save();
        res.status(201).json(newVehicle);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "vehicle not added.", error: err.message });
    }
});

//Create a new user
router.post("/", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword
    });
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({message: "Account could not be created."});
    }
});

// Get all users
// I migh comment this out becasue I need to add authentication and authorization to this app.
router.get("/", async (req, res) => {
    try { const users = await User.find();
        res.json(users);
    } catch (err){
        res.status(500).json({ message: "could not get users."});
    }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user." });
  }
});

//update existing user
router.put("/:id", async (req, res) => {
    try {
    const updateUser = await User.findByIdAndUpdate (
        req.params.id,
        req.body,{ new: true }
    );
    res.json(updateUser);
    } catch (err) {
        res.status(400).json({message: " Profile could not be updated "});
    }
});


//Delete existing user
router.delete("/:id", async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Account successfully deleted." });
    } catch (err) {
        res.status(500).json({ message: "Account couldn't be deleted." });
    }
});

module.exports = router;