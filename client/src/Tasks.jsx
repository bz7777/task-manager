import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5001/api/tasks";

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

  const fetchTasks = async () => {
    const res = await axios.get(API, config);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post(API, { title }, config);
    setTitle("");
    fetchTasks();
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

      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task._id} className="p-3 bg-gray-200 rounded">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
