import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function SentinelOrb() {
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.003;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#34f5c5" metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

export default function App() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 overflow-hidden">

      {/* NAVBAR */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-10 py-4 text-white z-10">
        <h1 className="text-2xl font-bold">🛡 App Sentinel</h1>
        <button className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-400">
          Login
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full text-white">

        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center px-12">
          <h2 className="text-5xl font-extrabold mb-4">
            Monitor. Detect. Protect.
          </h2>
          <p className="text-gray-300 max-w-md mb-6">
            App Sentinel continuously monitors your applications and APIs,
            detecting failures and performance issues before your users do.
          </p>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-emerald-500 rounded-xl hover:bg-emerald-400">
              Start Monitoring
            </button>
            <button className="px-6 py-3 border border-white/30 rounded-xl">
              Documentation
            </button>
          </div>
        </div>

        {/* RIGHT 3D */}
        <div className="h-full">
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 2]} />
            <SentinelOrb />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
      </div>

      {/* GLASS CARD */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-8 py-4 text-white">
        🚀 Trusted for real-time app & API health monitoring
      </div>
     </div>
  );
}
