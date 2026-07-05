import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface VinylProps {
  scrollProgress: number;
}

export function VinylRecord({ scrollProgress }: VinylProps) {
  const groupRef = useRef<THREE.Group>(null);
  const recordRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (recordRef.current) {
      recordRef.current.rotation.z -= delta * 1.5;
    }
    if (groupRef.current) {
      const targetY = -scrollProgress * 1.5;
      const targetRotX = scrollProgress * Math.PI * 0.4;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.1
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.1
      );
      const scale = 1 - scrollProgress * 0.3;
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, scale, 0.1)
      );
    }
  });

  const grooveTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#0c0a09';
    ctx.fillRect(0, 0, 512, 512);
    for (let r = 60; r < 250; r += 3) {
      ctx.strokeStyle = `rgba(40,40,40,${0.3 + Math.random() * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(256, 256, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Vinyl disc */}
      <mesh ref={recordRef} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.2, 2.2, 0.05, 128]} />
        <meshStandardMaterial color="#0c0a09" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Groove overlay */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.026, 0]}>
        <cylinderGeometry args={[2.19, 2.19, 0.001, 128]} />
        <meshStandardMaterial map={grooveTexture} transparent opacity={0.7} roughness={0.4} />
      </mesh>

      {/* Center label */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.01, 64]} />
        <meshStandardMaterial color="#e10600" roughness={0.5} />
      </mesh>

      {/* Spindle hole */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.08, 32]} />
        <meshStandardMaterial color="#050403" />
      </mesh>
    </group>
  );
}
