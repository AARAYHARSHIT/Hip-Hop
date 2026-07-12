import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface VinylProps {
  activeTexture: string;
}

export default function VinylRecord({ activeTexture }: VinylProps) {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  const labelMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  // Load the dynamic texture based on state
  const texture = useLoader(THREE.TextureLoader, activeTexture);
  
  useEffect(() => {
    if (texture) {
      texture.anisotropy = 16;
      texture.needsUpdate = true;
    }
  }, [texture]);

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
    if (!groupRef.current || !spinRef.current) return;

    const mouseTiltX = -(target.current.y * 0.12);
    const mouseTiltY = target.current.x * 0.12;
    
    const scrollY = target.current.scroll;
    const vh = window.innerHeight;

    const transitionProgress = Math.min(scrollY / vh, 1);
    const exitProgress = Math.max(0, (scrollY - vh * 1.2) / vh);
    
    // Smoothly position behind the active card viewport slot
    const targetPosX = transitionProgress * 3.3; 
    const targetPosZ = transitionProgress * -3.2; 
    const targetPosY = (Math.sin(state.clock.elapsedTime) * 0.1) - (exitProgress * 12); // Direct exit velocity on scroll down

    const baseRotX = THREE.MathUtils.lerp(-Math.PI / 3, 0, transitionProgress);

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX + mouseTiltX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseTiltY, 0.05);

    spinRef.current.rotation.z -= 0.008;
  });

  return (
    <group ref={groupRef}>
      <group ref={spinRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.3, 2.3, 0.04, 64]} />
          <meshStandardMaterial color="#070709" roughness={0.18} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <circleGeometry args={[0.95, 64]} />
          <meshStandardMaterial ref={labelMaterialRef} map={texture} roughness={0.4} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}