// ─── Task Routes ──────────────────────────────────────────────────────────────
// Defines all REST API endpoints for managing tasks.

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// ── GET /tasks ────────────────────────────────────────────────────────────────
// Returns all tasks, sorted by newest first.
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ── POST /tasks ───────────────────────────────────────────────────────────────
// Creates a new task. Expects { title } in the request body.
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const task = new Task({ title: title.trim() });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── PUT /tasks/:id ────────────────────────────────────────────────────────────
// Updates an existing task by its ID. Can update title and/or completed.
router.put('/:id', async (req, res) => {
  try {
    const { title, completed } = req.body;

    // Build the update object dynamically — only update provided fields
    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (completed !== undefined) updates.completed = completed;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true } // Return updated doc and validate
    );

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ── DELETE /tasks/:id ─────────────────────────────────────────────────────────
// Deletes a task by its ID.
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
