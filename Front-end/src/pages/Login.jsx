import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      login(res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password", err);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white overflow-hidden">
      <Navbar />


      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-sm">

          <div className="text-center mb-8 -translate-y-10">
            <div className="text-center mb-6">
              <span className="text-6xl drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]">
                🛡
              </span>
            </div>


            <h2 className="text-3xl font-bold tracking-tight text-white">
              Welcome <span className="text-indigo-400">Developer</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Sign in to your account
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl
                   bg-white/10 backdrop-blur-xl
                   border border-white/20
                   p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)]"
          >
            {error && (
              <p className="text-red-400 text-sm text-center">
                {error}
              </p>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-200">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-md
                       bg-white/5 px-3 py-2
                       text-white placeholder:text-gray-500
                       outline outline-1 outline-white/10
                       focus:outline-2 focus:outline-indigo-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-200">
                  Password
                </label>
                <span className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-md
                       bg-white/5 px-3 py-2
                       text-white placeholder:text-gray-500
                       outline outline-1 outline-white/10
                       focus:outline-2 focus:outline-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-indigo-500"
              />
              <label className="text-sm text-gray-300">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500
                     py-2.5 font-semibold
                     hover:bg-indigo-400 transition"
            >
              Sign in
            </button>
            <p className="mt-8 text-center text-sm text-gray-400">New here? <span onClick={() => navigate("/signup")} className="ml-1 font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer">Create an account</span></p>
          </form>
        </div>
      </div>
    </div>

  );


}
