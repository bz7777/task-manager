// ─── API Helpers ──────────────────────────────────────────────────────────────
// Centralizes all fetch() calls to the backend API.
// The base URL is empty so Vite's proxy routes /tasks → http://localhost:5000/tasks

const BASE_URL = '/tasks';

// Helper: throws an error if the response is not OK (e.g. 400, 404, 500)
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

// Fetch all tasks
export async function fetchTasks() {
  const res = await fetch(BASE_URL);
  return handleResponse(res);
}

// Create a new task with the given title
export async function createTask(title) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  return handleResponse(res);
}

// Update a task by ID — pass an object with fields to change
export async function updateTask(id, updates) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  return handleResponse(res);
}

// Delete a task by ID
export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(res);
}
