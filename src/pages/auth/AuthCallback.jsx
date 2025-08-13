// src/pages/auth/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        navigate("/");
        return;
      }

      localStorage.setItem("token", token);

      try {
        const res = await api.get("/user");
        localStorage.setItem("user", JSON.stringify(res.data));
        // ⬇️ role-aware landing
        navigate(res.data?.role === "admin" ? "/admin" : "/app", { replace: true });
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/");
      }
    };

    handleAuth();
  }, [location, navigate]);

  return <p className="p-6">Authorizing...</p>;
}
