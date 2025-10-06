// src/pages/Auth/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { setToken } from "../../api";
import BrainStationImg from "../../assets/Brain-Station-23-1.jpg"; // নিশ্চিত path সঠিক

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { username, password });
      if (!res.data.token) throw new Error("Invalid login response: missing token");
      const token = res.data.token;
      setToken(token);
      localStorage.setItem("userToken", token);
      localStorage.setItem("role", res.data.role || "USER");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${BrainStationImg})` }}
    >
      {/* glass card - small, translucent so background visible */}
      <div className="w-full max-w-sm p-8 rounded-2xl
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-lg shadow-black/30
                      transform transition-all duration-300
                      hover:scale-[1.01]">
        <div className="text-center mb-6">
          {/* optional small logo or title */}
          <h1 className="text-2xl font-extrabold text-white">Professional Library</h1>
          <p className="text-sm text-white/80 mt-1">Brain Station 23 — Library Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-red-400 text-center">{error}</div>}

          <div>
            <label className="block text-sm text-white/90 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60
                         outline-none focus:ring-2 focus:ring-[#0072CE] focus:bg-white/25 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-white/90 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder:text-white/60
                         outline-none focus:ring-2 focus:ring-[#0072CE] focus:bg-white/25 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 py-3 rounded-lg bg-[#0072CE] text-white font-semibold hover:bg-[#005bb5] disabled:opacity-60 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-white/70">
          Professional Library Management System
        </p>
      </div>
    </div>
  );
}
