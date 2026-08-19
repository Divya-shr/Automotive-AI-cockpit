import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Float, Html } from '@react-three/drei';

function Interactive3DCarPlane({ telemetry }) {
  const meshRef = useRef();

  // Load image texture into Three.js texture pipeline
  const texture = useTexture('/car-xray.png');

  // Slow continuous 3D rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  const activeDtc = telemetry?.activeDtc || [];
  const tirePressure = telemetry?.tirePressurePsi || { fl: 32, fr: 32, rl: 32, rr: 32 };
  const coolantTemp = telemetry?.coolantTempC || 90;

  // Active Fault Triggers
  const isRLFault = tirePressure.rl < 29 || activeDtc.includes('C0035');
  const isEngineFault = coolantTemp > 105 || activeDtc.includes('P0300') || activeDtc.includes('P0217');

  return (
    <group ref={meshRef}>
      {/* 3D Textured Plane in Three.js Scene */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[5.2, 3.4]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>

      {/* Dynamic 3D HTML Fault Annotation - Engine Bay */}
      {isEngineFault && (
        <Html position={[-0.8, 0.4, 0.1]} center distanceFactor={5}>
          <div className="flex items-center space-x-2 bg-red-950/90 text-red-400 border border-red-500 font-mono text-[10px] px-2.5 py-1 rounded-md shadow-2xl animate-bounce backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold">ENGINE FAULT DETECTED</span>
          </div>
        </Html>
      )}

      {/* Dynamic 3D HTML Fault Annotation - Rear Left Wheel */}
      {isRLFault && (
        <Html position={[1.1, -0.6, 0.1]} center distanceFactor={5}>
          <div className="flex items-center space-x-2 bg-red-950/90 text-red-400 border border-red-500 font-mono text-[10px] px-2.5 py-1 rounded-md shadow-2xl animate-pulse backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold">RL (C0035) FAULT</span>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function CarCanvas({ telemetry }) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-6 bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* HUD Header */}
      <div className="flex justify-between items-center mb-3 px-2">
        <div>
          <h2 className="text-sm font-bold font-mono tracking-wider text-cyan-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            3D SDV CAN BUS DIAGNOSTIC TWIN
          </h2>
          <p className="text-xs text-slate-400">WebGL interactive 3D scene — Drag mouse to rotate, scroll to zoom</p>
        </div>
        <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-lg">
          Rotate: Drag | Zoom: Scroll
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="w-full h-[400px] bg-slate-950 rounded-xl relative border border-slate-800/80 cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
            <Suspense fallback={null}>
              <Interactive3DCarPlane telemetry={telemetry} />
            </Suspense>
          </Float>
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
}