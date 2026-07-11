import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import vinylLabel from '../assets/YoursTruly2.jpg';

export default function VinylRecord() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  
  const texture = useLoader(THREE.TextureLoader, vinylLabel);
  texture.anisotropy = 16;

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // Capture cursor coordinates normalized between -1 and 1
    const { x, y } = state.pointer;

    // Smooth inertial damping (Lerp) for realistic physics physics
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.5, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (Math.PI / 6) - (y * 0.3), 0.05);
    
    // Continuous subtle turntable rotation
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <group ref={meshRef}>
        {/* Vinyl Base Vinyl Plate Geometry */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2, 2, 0.08, 128]} />
          <meshStandardMaterial 
            color="#090a0f" 
            roughness={0.15} 
            metalness={0.9}
            bumpScale={0.005}
          />
        </mesh>
        
        {/* Album Artwork Face Wrapper */}
        <mesh position={[0, 0.041, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.85, 64]} />
          <meshStandardMaterial 
            map={texture} 
            roughness={0.4} 
            metalness={0.2} 
          />
        </mesh>
      </group>
    </group>
  );
}