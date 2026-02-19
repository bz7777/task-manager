import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5001";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (isLogin) {
        response = await axios.post(`${API}/api/auth/login`, {
          email,
          password,
        });
      } else {
        response = await axios.post(`${API}/api/auth/register`, {
          name,
          email,
          password,
        });
      }

      login(response.data);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">

      <div className="relative w-[800px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* FORM PANEL */}
        <div
          className={`absolute top-0 h-full w-1/2 transition-all duration-700 ${
            isLogin ? "left-0" : "left-1/2"
          }`}
        >
          <div className="flex flex-col justify-center items-center h-full p-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
            </h2>

            <form onSubmit={handleSubmit} className="w-full space-y-4">

              {!isLogin && (
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>

        {/* OVERLAY PANEL */}
        <div
          className={`absolute top-0 h-full w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white transition-all duration-700 ${
            isLogin ? "left-1/2" : "left-0"
          }`}
        >
          <div className="flex flex-col justify-center items-center h-full p-10 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {isLogin ? "New here?" : "Already have an account?"}
            </h2>

            <p className="mb-6 opacity-80">
              {isLogin
                ? "Sign up and start managing your tasks like a pro."
                : "Login to continue managing your tasks."}
            </p>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-indigo-600 transition"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
