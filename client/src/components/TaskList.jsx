// ─── TaskList Component ───────────────────────────────────────────────────────
// Renders the full list of tasks.
// Handles empty state and the three possible UI states: loading, error, results.

import TaskItem from './TaskItem';
import styles from './TaskList.module.css';

export default function TaskList({ tasks, loading, error, onToggle, onEdit, onDelete }) {
  // Show a skeleton loader while the initial fetch is in progress
  if (loading) {
    return (
      <div className={styles.skeletonWrap}>
        {[1, 2, 3].map((n) => (
          <div key={n} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  // Show error message if the fetch failed
  if (error) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>⚠️</span>
        <p className={styles.emptyText}>{error}</p>
        <p className={styles.emptyHint}>Make sure the server is running on port 5000.</p>
      </div>
    );
  }

  // Empty state when there are no tasks yet
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>📋</span>
        <p className={styles.emptyText}>No tasks yet!</p>
        <p className={styles.emptyHint}>Add your first task above to get started.</p>
      </div>
    );
  }

  // Render each task using the TaskItem component
  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
