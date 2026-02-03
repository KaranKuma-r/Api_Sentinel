const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./Database_Connection/db');  // DATABASE CONNECTION
const { connect } = require("mongoose");
dotenv.config(); 
const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Server running 🚀");
});





app.listen(PORT, async() => {
  await connectDB()
  console.log("Server started on port " + PORT);
});
