/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ serviceName: "" });
  const [createdService, setCreatedService] = useState(null);
  const navigate = useNavigate()

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/agents/serviceName",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = services.some(
      (s) =>
        s.serviceName.toLowerCase().trim() ===
        form.serviceName.toLowerCase().trim()
    );

    if (isDuplicate) {
      alert("⚠️ Service already exists. Don't duplicate.");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/agents/create",
      form,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setCreatedService({
      serviceName: res.data.serviceName,
      agentKey: res.data.agentKey
    });

    setForm({ serviceName: "" });
    fetchServices();
  };

  const isFirstTimeUser = services.length === 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19] text-white font-[Inter]">

      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-600/20 blur-[180px] rounded-full pointer-events-none" />

      <div className="absolute bottom-[-200px] right-[-150px] w-[600px] h-[600px] bg-purple-600/20 blur-[160px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <Navbar />

      <div className="relative z-10 pt-28 px-4 flex justify-center">

        <div className="w-full max-w-3xl bg-white/[0.02] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">

          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </h1>

            {!isFirstTimeUser && (
              <button
                onClick={() => {
                  setShowForm(true);
                  setCreatedService(null);
                }}
                className="bg-indigo-500 hover:bg-indigo-600 px-5 py-2.5 rounded-lg text-sm font-medium shadow-lg transition"
              >
                + New
              </button>
            )}
          </div>

          {/* FIRST TIME */}
          {isFirstTimeUser && (
            <div className="text-center py-20 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl">
              <h2 className="text-2xl font-semibold mb-3">
                Start Monitoring
              </h2>
              <p className="text-gray-400 mb-6">
                Create your first service to begin observability
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-medium"
              >
                Create Service
              </button>
            </div>
          )}

          {/* SERVICE LIST */}
          {services.length > 0 && (
            <div className="h-[480px] overflow-y-auto pr-2">
              <div className="space-y-6">

                {services.map((s, i) => (
                  <div
                    key={s._id}
                    onClick={() => navigate(`/service/${s.agentKey}`)}
                    className="group cursor-pointer flex items-start justify-between px-6 py-5 rounded-xl
                      bg-white/[0.03] border border-white/10
                      hover:bg-white/[0.06] hover:scale-[1.01]
                      hover:border-indigo-500/30 transition"
                    >

                    <div className="flex gap-4">

                      <span className="text-indigo-400 text-sm w-6 mt-1">
                        {i + 1}
                      </span>

                      <div className="flex flex-col">

                        <span className="text-[15px] font-medium tracking-wide">
                          {s.serviceName}
                        </span>

                        <div className="h-2" />

                        <span className="text-[11px] uppercase tracking-wider text-gray-400">
                          Agent Key
                        </span>

                        <span className="text-xs font-mono text-indigo-400 break-all mt-1">
                          {s.agentKey}
                        </span>

                      </div>
                    </div>

                    <div className="w-2 h-2 mt-2 rounded-full bg-emerald-400"></div>

                  </div>
                ))}

              </div>
            </div>
          )}

        </div>
      </div>

      {/* MODAL — unchanged */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <div className="w-full max-w-md bg-[#0F172A] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">

            {!createdService ? (
              <>
                <h2 className="text-xl font-semibold text-center">
                  New Service
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                  <input
                    name="serviceName"
                    value={form.serviceName}
                    onChange={(e) =>
                      setForm({ serviceName: e.target.value })
                    }
                    placeholder="Service name"
                    className="w-full p-3 rounded-lg bg-black/30 border border-white/10 outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  <button className="w-full bg-indigo-500 py-3 rounded-lg font-medium">
                    Create Service
                  </button>

                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-center text-emerald-400">
                  ✅ Service Created
                </h2>

                <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-6">

                  <div>
                    <p className="text-xs text-gray-400">Service Name</p>
                    <p className="font-medium">
                      {createdService.serviceName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Agent Key</p>
                    <p className="font-mono text-indigo-400 break-all text-sm">
                      {createdService.agentKey}
                    </p>
                  </div>

                </div>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(createdService.agentKey)
                  }
                  className="w-full bg-indigo-500 py-2 rounded-lg text-sm"
                >
                  Copy Key
                </button>

                <button
                  onClick={() => {
                    setShowForm(false);
                    setCreatedService(null);
                  }}
                  className="w-full text-gray-400 text-sm"
                >
                  Close
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}