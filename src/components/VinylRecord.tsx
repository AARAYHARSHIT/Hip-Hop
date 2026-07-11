import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import vinylLabel from '../assets/YoursTruly2.jpg';

export default function VinylRecord() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  
  const texture = useLoader(THREE.TextureLoader, vinylLabel);
  texture.anisotropy = 16;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  // Store target coordinates in a ref to bypass React re-renders for maximum performance
  const target = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to +1)
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    
    const handleScroll = () => {
      target.current.scroll = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current || !meshRef.current) return;

    // 1. Dynamic Mouse Tilt Physics
    const targetRotY = target.current.x * 0.4;
    const targetRotX = (Math.PI / 6) - (target.current.y * 0.4);
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    
    // 2. Scroll Transformation Physics
    // Calculate how far down the page the user has scrolled relative to the first section
    const scrollProgress = Math.min(target.current.scroll / window.innerHeight, 1);
    
    // Move X: Center (0) -> Right side of the screen (3.5)
    // Move Z: Forward (0) -> Push deeper into the background (-2.5)
    const targetPosX = scrollProgress * 3.5;
    const targetPosZ = scrollProgress * -2.5;
    
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.05);

    // Continuous turntable spin
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <group ref={meshRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.5, 2.5, 0.06, 64]} />
          <meshStandardMaterial 
            color="#090a0f" 
            roughness={0.15} 
            metalness={0.9}
          />
        </mesh>
        <mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 64]} />
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