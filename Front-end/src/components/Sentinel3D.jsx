import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

function Orb() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.005;
    ref.current.rotation.x += 0.003;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#34f5c5" metalness={0.6} roughness={0.2} />
    </mesh>
  );
}

export default function Sentinel3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4] }}
      style={{
        pointerEvents: "none",   // 🔥 THIS IS THE REAL FIX
        position: "relative",
        zIndex: 0
      }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 2]} />
      <Orb />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
