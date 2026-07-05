import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MicProps {
  scrollProgress: number;
}

export function StudioMic({ scrollProgress }: MicProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetX = 2.5 - scrollProgress * 4;
      const targetRot = scrollProgress * Math.PI * 0.5;
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.08
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRot,
        0.08
      );
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, 0, 0]} scale={0.7}>
      {/* Mic grille (sphere) */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#1c1917" roughness={0.4} metalness={0.8} wireframe />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.48, 32, 32]} />
        <meshStandardMaterial color="#44403c" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Mic body */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 1.1, 32]} />
        <meshStandardMaterial color="#292524" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Ring detail */}
      <mesh position={[0, 0.95, 0]}>
        <torusGeometry args={[0.3, 0.04, 16, 32]} />
        <meshStandardMaterial color="#fae500" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <torusGeometry args={[0.31, 0.03, 16, 32]} />
        <meshStandardMaterial color="#78716c" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Mic stand neck */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
        <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Stand bar */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[0.6, 0.06, 0.06]} />
        <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Stand legs */}
      <mesh position={[-0.25, -0.85, 0]} rotation={[0, 0, Math.PI / 8]}>
        <cylinderGeometry args={[0.03, 0.03, 0.7, 12]} />
        <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, -0.85, 0]} rotation={[0, 0, -Math.PI / 8]}>
        <cylinderGeometry args={[0.03, 0.03, 0.7, 12]} />
        <meshStandardMaterial color="#1c1917" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}
