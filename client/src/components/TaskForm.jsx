// ─── TaskForm Component ───────────────────────────────────────────────────────
// Renders the input field and button to add a new task.
// Calls onAdd(title) when the form is submitted.

import { useState } from 'react';
import styles from './TaskForm.module.css';

export default function TaskForm({ onAdd, loading }) {
  // Local state for the controlled input
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload
    const trimmed = title.trim();
    if (!trimmed) return; // Don't submit empty tasks
    onAdd(trimmed);
    setTitle(''); // Reset input after submission
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        disabled={loading}
        maxLength={200}
        autoFocus
      />
      <button
        className={styles.button}
        type="submit"
        disabled={loading || !title.trim()}
      >
        {loading ? (
          <span className={styles.spinner} />
        ) : (
          '+ Add Task'
        )}
      </button>
    </form>
  );
}
