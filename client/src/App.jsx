import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const API = "https://task-manager-l13n.onrender.com/tasks"

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [filter, setFilter] = useState("all")
  const [darkMode, setDarkMode] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState("")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API)
      setTasks(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const addTask = async () => {
    if (!title.trim()) return
    await axios.post(API, { title })
    setTitle("")
    fetchTasks()
  }

  const toggleTask = async (task) => {
    const res = await axios.put(`${API}/${task._id}`, {
      completed: !task.completed,
    })
    setTasks(tasks.map(t => t._id === task._id ? res.data : t))
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`)
    setTasks(tasks.filter(t => t._id !== id))
  }

  const startEdit = (task) => {
    setEditingId(task._id)
    setEditText(task.title)
  }

  const saveEdit = async (id) => {
    if (!editText.trim()) return
    const res = await axios.put(`${API}/${id}`, {
      title: editText,
    })
    setTasks(tasks.map(t => t._id === id ? res.data : t))
    setEditingId(null)
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === "active") return !task.completed
    if (filter === "done") return task.completed
    return true
  })

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen transition-all duration-500`}>
      <div className="max-w-xl mx-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager 🚀by 3n3ID</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 rounded bg-blue-500 text-white"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>

        {/* COUNTER */}
        <div className="mb-4 text-sm opacity-70">
          {tasks.length} total tasks
        </div>

        {/* ADD TASK */}
        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add new task..."
            className="flex-1 px-4 py-2 rounded border border-gray-400 text-black"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
          >
            Add
          </button>
        </div>

        {/* FILTER */}
        <div className="flex gap-2 mb-6">
          {["all", "active", "done"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredTasks.length === 0 && (
          <div className="text-center opacity-60 mt-10">
            No tasks yet 👀
          </div>
        )}

        {/* TASK LIST */}
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <div
              key={task._id}
              className={`p-4 rounded shadow transition-all duration-300 ${
                task.completed
                  ? "bg-green-200 text-black"
                  : darkMode
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">

                {/* EDIT OR TITLE */}
                {editingId === task._id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => saveEdit(task._id)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(task._id)}
                    className="flex-1 px-2 py-1 rounded border text-black"
                    autoFocus
                  />
                ) : (
                  <div
                    onClick={() => toggleTask(task)}
                    onDoubleClick={() => startEdit(task)}
                    className={`flex-1 cursor-pointer ${
                      task.completed ? "line-through opacity-60" : ""
                    }`}
                  >
                    {task.title}
                  </div>
                )}

                {/* DELETE */}
                <button
                  onClick={() => deleteTask(task._id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App
