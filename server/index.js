require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const taskRoutes = require("./routes/tasks");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API running 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
