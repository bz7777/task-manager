// ─── Entry Point ─────────────────────────────────────────────────────────────
// This file starts the Express server and connects to MongoDB.

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 // Load variables from .env file

const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());                   // Allow requests from the React frontend
app.use(express.json());           // Parse incoming JSON request bodies

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/tasks', taskRoutes);     // All /tasks routes are handled in routes/tasks.js

// ─── Root health check ────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

// ─── Connect to MongoDB and Start Server ──────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

  console.log(process.env.MONGO_URI);
