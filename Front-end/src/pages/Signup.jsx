import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      setSuccess("Account created successfully. Please login.");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      setSuccess("");
    }
  };

  return (
    <div className="relative h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white overflow-hidden">
      <Navbar />

      <div className="absolute w-[300px] h-[200px] bg-indigo-500/20 
                    rounded-xl blur-3xl -top-32 -left-32 rotate-12"></div>

      <div className="absolute w-[300px] h-[200px] bg-cyan-500/20 
                    rounded-xl blur-3xl bottom-0 -right-32 -rotate-12"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-sm">

          <div className="text-center mb-8 -translate-y-10">
            <span className="text-6xl block mb-4">🛡</span>
            <h2 className="text-3xl font-bold tracking-tight">
              Create your <span className="text-indigo-400">Account</span>
            </h2>
            <p className="text-gray-400 mt-2">
              Start your free trial
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

            {success && (
              <p className="text-green-400 text-sm text-center">
                {success}
              </p>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md bg-white/5 px-3 py-2
                 text-white placeholder:text-gray-500
                 outline outline-1 outline-white/10
                 focus:outline-2 focus:outline-indigo-500"
              />
            </div>

            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Email address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md bg-white/5 px-3 py-2
                 text-white placeholder:text-gray-500
                 outline outline-1 outline-white/10
                 focus:outline-2 focus:outline-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-md bg-white/5 px-3 py-2
                 text-white placeholder:text-gray-500
                 outline outline-1 outline-white/10
                 focus:outline-2 focus:outline-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-indigo-500
               py-2.5 font-semibold
               hover:bg-indigo-400 transition"
            >
              Create Account
            </button>
          </form>


          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );

}
