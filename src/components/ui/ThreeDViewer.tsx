import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { Mesh } from "three";
import { RotateCcw, ZoomIn, ZoomOut, Move3D, Eye } from "lucide-react";

// Sample 3D model component
function RotatingBox() {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={hovered ? "#667eea" : "#764ba2"}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Product component for demonstration
function ProductModel() {
  const groupRef = useRef<any>(null!);

  return (
    <group ref={groupRef}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1.2, 3, 8]} />
        <meshStandardMaterial color="#667eea" transparent opacity={0.9} />
      </mesh>

      {/* Top component */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#764ba2" transparent opacity={0.8} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.5, 12]} />
        <meshStandardMaterial color="#4facfe" transparent opacity={0.7} />
      </mesh>

      {/* Detachable components */}
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos(i * Math.PI * 0.5) * 1.8,
            0,
            Math.sin(i * Math.PI * 0.5) * 1.8,
          ]}
        >
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#43e97b" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

interface ThreeDViewerProps {
  modelType?: "sample" | "product" | "uploaded";
  controls?: boolean;
}

export const ThreeDViewer: React.FC<ThreeDViewerProps> = ({
  modelType = "product",
  controls = true,
}) => {
  const [viewMode, setViewMode] = useState<"orbit" | "pan" | "zoom">("orbit");
  const [showWireframe, setShowWireframe] = useState(false);

  const renderModel = () => {
    switch (modelType) {
      case "sample":
        return <RotatingBox />;
      case "product":
        return <ProductModel />;
      default:
        return <ProductModel />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] glass-panel overflow-hidden">
      {/* 3D Canvas */}
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 5, 5]} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* Environment */}
        <Environment preset="studio" />

        {/* Controls */}
        {controls && (
          <OrbitControls
            enablePan={viewMode === "pan"}
            enableZoom={viewMode === "zoom"}
            enableRotate={viewMode === "orbit"}
            maxDistance={20}
            minDistance={2}
          />
        )}

        {/* 3D Model */}
        <Suspense fallback={null}>{renderModel()}</Suspense>

        {/* Grid */}
        <gridHelper args={[10, 10, "#667eea", "#764ba2"]} />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute top-4 right-4 space-y-2">
        <div className="glass-dark rounded-lg p-2 space-y-2">
          <button
            className={`p-2 rounded-md transition-all ${
              viewMode === "orbit"
                ? "bg-white/30 text-white"
                : "text-white/70 hover:text-white"
            }`}
            onClick={() => setViewMode("orbit")}
            title="دوران"
          >
            <RotateCcw className="h-4 w-4" />
          </button>

          <button
            className={`p-2 rounded-md transition-all ${
              viewMode === "pan"
                ? "bg-white/30 text-white"
                : "text-white/70 hover:text-white"
            }`}
            onClick={() => setViewMode("pan")}
            title="تحريك"
          >
            <Move3D className="h-4 w-4" />
          </button>

          <button
            className={`p-2 rounded-md transition-all ${
              viewMode === "zoom"
                ? "bg-white/30 text-white"
                : "text-white/70 hover:text-white"
            }`}
            onClick={() => setViewMode("zoom")}
            title="تكبير"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          <button
            className={`p-2 rounded-md transition-all ${
              showWireframe
                ? "bg-white/30 text-white"
                : "text-white/70 hover:text-white"
            }`}
            onClick={() => setShowWireframe(!showWireframe)}
            title="عرض الإطار السلكي"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div className="absolute bottom-4 right-4 glass-dark rounded-lg p-3">
        <div className="text-white/80 text-sm space-y-1">
          <div>العقد: 1,247</div>
          <div>المضلعات: 2,394</div>
          <div>المواد: 5</div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="glass-dark rounded-lg p-4 text-white text-sm">
          جاري تحميل النموذج ثلاثي الأبعاد...
        </div>
      </div>
    </div>
  );
};
