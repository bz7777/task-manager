// ─── App Component ────────────────────────────────────────────────────────────
// Root component that manages all task state and coordinates API calls.
// This is where useState and useEffect hooks live.

import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import styles from './App.module.css';

export default function App() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);           // All tasks from the server
  const [loading, setLoading] = useState(true);     // Initial load spinner
  const [adding, setAdding] = useState(false);      // Button spinner when adding
  const [error, setError] = useState(null);         // Error message to display

  // Derived counts for the stats bar
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const remaining = total - completed;

  // ── Load tasks on mount ────────────────────────────────────────────────────
  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setError(null);
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ── Add a new task ─────────────────────────────────────────────────────────
  async function handleAdd(title) {
    try {
      setAdding(true);
      const newTask = await createTask(title);
      // Prepend the new task to the top of the list
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      alert('Failed to add task: ' + err.message);
    } finally {
      setAdding(false);
    }
  }

  // ── Toggle task completion ─────────────────────────────────────────────────
  async function handleToggle(id, completed) {
    try {
      const updated = await updateTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      alert('Failed to update task: ' + err.message);
    }
  }

  // ── Edit task title ────────────────────────────────────────────────────────
  async function handleEdit(id, title) {
    try {
      const updated = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      alert('Failed to edit task: ' + err.message);
    }
  }

  // ── Delete a task ──────────────────────────────────────────────────────────
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert('Failed to delete task: ' + err.message);
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>✓</span>
          </div>
          <h1 className={styles.title}>Task Manager</h1>
          <p className={styles.subtitle}>Stay organised, stay focused.</p>
        </header>

        {/* Stats bar */}
        {total > 0 && (
          <div className={styles.stats}>
            <span className={styles.stat}>
              <strong>{total}</strong> total
            </span>
            <span className={styles.statDivider}>·</span>
            <span className={styles.stat}>
              <strong className={styles.statGreen}>{completed}</strong> done
            </span>
            <span className={styles.statDivider}>·</span>
            <span className={styles.stat}>
              <strong>{remaining}</strong> remaining
            </span>
            {/* Progress bar */}
            <div className={styles.progressWrap}>
              <div
                className={styles.progress}
                style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Add task form */}
        <TaskForm onAdd={handleAdd} loading={adding} />

        {/* Task list */}
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
