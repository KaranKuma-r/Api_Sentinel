import Navbar from "../components/navbar";
import Sentinel3D from "../components/Sentinel3D";

export default function Landing() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white overflow-hidden">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-2 h-full -mt-16 ">
        <div className="flex flex-col justify-center px-12">
          <h2 className="text-5xl font-extrabold mb-4">
            Monitor. Detect. Protect.
          </h2>

          <p className="text-gray-300 mb-6 max-w-md">
            Real-time API and backend monitoring with AI insights.
          </p>

          {/* CTA Buttons (optional but recommended) */}
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-500 rounded-xl hover:bg-emerald-400 text-black font-semibold">
              Start Monitoring
            </button>
            <button className="px-6 py-3 border border-white/30 rounded-xl">
              Documentation
            </button>
          </div>
        </div>

        <Sentinel3D />
      </div>
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-8 py-4 text-white text-center">
        🚀 Trusted for real-time app & API health monitoring
      </div>

    </div>
  );
}
