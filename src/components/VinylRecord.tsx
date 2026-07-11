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

  const target = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current) return;

    // 1. Mouse Tracking Tilt
    const targetRotY = target.current.x * 0.4;
    const targetRotX = (Math.PI / 6) - (target.current.y * 0.4);
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    
    // 2. Multi-Phase Scroll Physics
    const scrollY = target.current.scroll;
    const vh = window.innerHeight;

    // Phase A: Calculate transition from Hero to Audio Stack (Caps at 1)
    const transitionProgress = Math.min(scrollY / vh, 1);
    
    // Phase B: Calculate exit transition from Audio Stack to Merch Hooks (Starts after 1.2vh)
    const exitProgress = Math.max(0, (scrollY - vh * 1.2) / vh);
    
    // Position targets based on phase
    const targetPosX = transitionProgress * 3.0; // Moves right to hide behind album
    const targetPosZ = transitionProgress * -3.5; // Pushes back in Z-space
    
    // Base Y is the floating animation. Add exitProgress to make it scroll up and away
    const targetPosY = (Math.sin(state.clock.elapsedTime) * 0.15) + (exitProgress * 8);

    // Apply linear interpolation
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);

    // Continuous spin
    meshRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      <group ref={meshRef}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.5, 2.5, 0.06, 64]} />
          <meshStandardMaterial color="#090a0f" roughness={0.15} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.032, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 64]} />
          <meshStandardMaterial map={texture} roughness={0.4} metalness={0.2} />
        </mesh>
      </group>
    </group>
  );
}