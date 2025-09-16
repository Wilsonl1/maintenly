const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const vehiclesRouter = require("./routes/vehicles");
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Vehicles route 
 app.use("/vehicles", vehiclesRouter);

// Users route
app.use("/users", usersRouter);

// Services route
app.use("/services", servicesRouter);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))   
  .catch(err => console.log(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
