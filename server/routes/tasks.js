// ─── Task Routes ──────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const { protect } = require("../middleware/authMiddleware");


// ── GET /api/tasks ─────────────────────────────────────────────────────────────
// Merr vetëm task-et e user-it të loguar
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});


// ── POST /api/tasks ────────────────────────────────────────────────────────────
// Krijon task për user-in e loguar
router.post("/", protect, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = new Task({
      title: title.trim(),
      user: req.user._id,   // 🔥 lidhja me user
    });

    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ── PUT /api/tasks/:id ─────────────────────────────────────────────────────────
// Përditëson vetëm task nëse i përket user-it
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, completed } = req.body;

    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,   // 🔥 siguri
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (title !== undefined) task.title = title.trim();
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();

    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// ── DELETE /api/tasks/:id ──────────────────────────────────────────────────────
// Fshin vetëm task nëse i përket user-it
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,   // 🔥 siguri
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
