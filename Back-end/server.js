const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require('./Database_Connection/db');  // DATABASE CONNECTION
const { connect } = require("mongoose");
dotenv.config(); 
const PORT = process.env.PORT;
const app = express();
app.use(cors({
  origin: "http://localhost:5173",   // frontend URL
  credentials: true
}));

// Middleware
app.use(express.json()); 


// Auth Routes
const authRoutes = require("./routes/auth.routes")
app.use('/api/auth',authRoutes)

// Agent Routes 
const agent = require("./routes/agent.routes")
app.use('/api/agents/',agent)

// Metrics Routes

const metrics = require("./routes/metrics.routes")
app.use('/api/metrics',metrics)


// Dashboard Routs
const dashboardRoutes = require('./routes/dashboard.routes')

app.use('/dashboard', dashboardRoutes)



app.get("/", (req, res) => {
  res.send("Server running 🚀");
});





app.listen(PORT, async() => {
  await connectDB()
  console.log("Server started on port " + PORT);
});
