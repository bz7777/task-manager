// ─── Task Model ───────────────────────────────────────────────────────────────
// Defines the shape of a Task document stored in MongoDB.

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  // Title is required — every task needs a description
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,            // Remove leading/trailing whitespace
  },

  // Tracks whether the task is done; defaults to false (incomplete)
  completed: {
    type: Boolean,
    default: false,
  },

  // Automatically set when the task is first created
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model so routes can use it
module.exports = mongoose.model('Task', taskSchema);
