// ─── TaskItem Component ───────────────────────────────────────────────────────
// Renders a single task row with options to complete, edit, and delete it.

import { useState } from 'react';
import styles from './TaskItem.module.css';

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  // Controls whether the task title is in "edit mode"
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  // Called when the user confirms the edit (Enter key or Save button)
  function handleEditSubmit() {
    const trimmed = editValue.trim();
    if (!trimmed || trimmed === task.title) {
      // No change — exit edit mode without saving
      setEditValue(task.title);
      setIsEditing(false);
      return;
    }
    onEdit(task._id, trimmed);
    setIsEditing(false);
  }

  // Cancel edit and restore original title
  function handleEditCancel() {
    setEditValue(task.title);
    setIsEditing(false);
  }

  // Allow Enter to save, Escape to cancel
  function handleKeyDown(e) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') handleEditCancel();
  }

  // Format the creation date nicely
  const date = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`${styles.item} ${task.completed ? styles.completed : ''}`}>
      {/* Checkbox to mark task as complete / incomplete */}
      <button
        className={styles.checkbox}
        onClick={() => onToggle(task._id, !task.completed)}
        aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {task.completed && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      {/* Task title — or edit input when in edit mode */}
      <div className={styles.content}>
        {isEditing ? (
          <input
            className={styles.editInput}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={200}
          />
        ) : (
          <span className={styles.title}>{task.title}</span>
        )}
        <span className={styles.date}>{date}</span>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        {isEditing ? (
          <>
            <button className={`${styles.btn} ${styles.save}`} onClick={handleEditSubmit} title="Save">
              Save
            </button>
            <button className={`${styles.btn} ${styles.cancel}`} onClick={handleEditCancel} title="Cancel">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className={`${styles.btn} ${styles.edit}`}
              onClick={() => setIsEditing(true)}
              title="Edit task"
              disabled={task.completed}
            >
              Edit
            </button>
            <button
              className={`${styles.btn} ${styles.delete}`}
              onClick={() => onDelete(task._id)}
              title="Delete task"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
