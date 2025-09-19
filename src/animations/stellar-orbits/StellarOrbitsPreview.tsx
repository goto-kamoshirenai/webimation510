"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { AnimationPreviewProps } from "../types";

// プレビューのサイズに合わせて高さクラスを切り替える
const VARIANT_HEIGHT: Record<NonNullable<AnimationPreviewProps["variant"]>, string> = {
  thumbnail: "h-44",
  modal: "h-80",
  detail: "h-[28rem]",
};

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  // 広がりのある粒子雲を一度だけ生成して保持
  const positions = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = 1.5 + Math.random() * 2.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.8;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  // 粒子全体をゆっくり回転させ、星雲のドリフト感を再現
  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.12;
    pointsRef.current.rotation.x += delta * 0.05;
  });

  return (
    <points ref={pointsRef} position={[0, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        toneMapped={false}
        transparent
        opacity={0.9}
        color={new THREE.Color("#94a3b8")}
        sizeAttenuation
      />
    </points>
  );
}

function OrbitalCluster() {
  const groupRef = useRef<THREE.Group>(null);

  // トーラスとコアモデルをまとめて回転させ、緩やかな上下動も追加
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x = Math.sin(performance.now() * 0.0002) * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* 内側リング */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.05, 32, 200]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.3} />
      </mesh>
      {/* 外側リング */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.06, 32, 200]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.35} />
      </mesh>
      {/* 上部のコア */}
      <mesh position={[0, 0.4, 0]}>
        <icosahedronGeometry args={[0.28, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#38bdf8"
          emissiveIntensity={0.8}
          metalness={0.2}
          roughness={0.35}
        />
      </mesh>
      {/* 下部のコア */}
      <mesh position={[0, -0.4, 0]}>
        <icosahedronGeometry args={[0.18, 0]} />
        <meshStandardMaterial
          color="#f472b6"
          emissive="#f472b6"
          emissiveIntensity={0.6}
          metalness={0.15}
          roughness={0.45}
        />
      </mesh>
    </group>
  );
}

export function StellarOrbitsPreview({ className = "", variant = "thumbnail" }: AnimationPreviewProps) {
  const accentClass = VARIANT_HEIGHT[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${accentClass} ${className}`}
    >
      <Canvas
        camera={{ position: [0, 1.6, 4], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* 背景色はCanvas全体に直接設定 */}
        <color attach="background" args={["#020617"]} />
        {/* 観察用に軌道制御を自動回転モードで有効化 */}
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        {/* ベースとなる環境光と、コアからの発光を強調する点光源 */}
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#f8fafc" />
        <pointLight position={[-3, -3, -3]} intensity={0.6} color="#38bdf8" />
        <ParticleField />
        <OrbitalCluster />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(148,163,184,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
    </div>
  );
}
