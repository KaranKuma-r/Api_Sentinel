import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      logout();
      navigate("/", { replace: true });
      setLoading(false);
    }, 2000); 
  };

  return (
    <div className="relative z-50 w-full flex justify-between items-center px-10 py-4 text-white">
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => {
          if (isAuthenticated) {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }}
      >
        🛡 API Sentinel
      </h1>

      {!isAuthenticated ? (
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-400 text-black font-semibold"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-4 py-2 border border-white/30 rounded-lg hover:bg-white/10"
          >
            Sign Up
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          disabled={loading}
          className="
            px-4 py-2
            bg-emerald-500
            rounded-lg
            hover:bg-emerald-400
            text-black font-semibold
            flex items-center justify-center gap-2
            disabled:opacity-70
          "
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
          ) : (
            "Logout"
          )}
        </button>
      )}
    </div>
  );
}
