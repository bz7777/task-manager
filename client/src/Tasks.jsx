import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = "https://task-manager-l13n.onrender.com/api/tasks";

function Tasks() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else {
      fetchTasks();
    }
  }, [user]);

  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(API, config);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(API, { title }, config);
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Toggle done
  const toggleDone = async (id, completed) => {
    try {
      await axios.put(`${API}/${id}`, { completed: !completed }, config);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, config);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <div className="flex justify-between mb-5">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <button
          onClick={() => {
            logout();
            navigate("/auth");
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1"
          placeholder="New task"
        />

        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`flex justify-between items-center p-3 rounded transition duration-300 ${
              task.completed
                ? "bg-green-300 text-green-900"
                : "bg-gray-200"
            }`}
          >
            <span
              onClick={() => toggleDone(task._id, task.completed)}
              className={`cursor-pointer ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
