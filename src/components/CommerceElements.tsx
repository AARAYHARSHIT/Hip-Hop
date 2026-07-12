import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function TicketStub() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      // Rotate for interaction
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      // Position: Starts at -5 (base), moves up by scrollY / 100
      ref.current.position.y = -5 + (window.scrollY / 100);
    }
  });
  return (
    <mesh ref={ref} position={[-2, -5, 0]}>
      <boxGeometry args={[1.5, 0.7, 0.05]} />
      <meshStandardMaterial color="#e11d48" roughness={0.3} />
    </mesh>
  );
}

export function MerchBox() {
  const ref = useRef<THREE.Mesh>(null);
useFrame((state) => {
    if (ref.current) {
      // Rotate for interaction
      ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.2;
      // Position: Starts at -5 (base), moves up by scrollY / 100
      ref.current.position.y = -5 + (window.scrollY / 100);
    }
  });
  return (
    <mesh ref={ref} position={[2, -5, 0]}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <meshStandardMaterial color="#ffffff" roughness={0.8} />
    </mesh>
  );
}