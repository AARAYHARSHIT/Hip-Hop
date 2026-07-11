import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import vinylLabel from '../assets/YoursTruly2.jpg';

export default function VinylRecord() {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);
  
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
    if (!groupRef.current || !spinRef.current) return;

    // 1. Mouse Tracking Tilt (Subtle look-around effect)
    const mouseTiltX = -(target.current.y * 0.15);
    const mouseTiltY = target.current.x * 0.15;
    
    // 2. Scroll Transformation Physics
    const scrollY = target.current.scroll;
    const vh = window.innerHeight;

    // Phase A: Hero to Audio Stack (0 to 1)
    const transitionProgress = Math.min(scrollY / vh, 1);
    
    // Phase B: Audio Stack to Merch (Starts after 1.2vh)
    const exitProgress = Math.max(0, (scrollY - vh * 1.2) / vh);
    
    // --- THE POSITION MATH ---
    // Start at center (0), move right to peek out of album cover (3.5)
    const targetPosX = transitionProgress * 3.5; 
    // Push back in Z-space so it goes strictly behind the HTML UI
    const targetPosZ = transitionProgress * -3.0; 
    // Float slightly in hero, lock vertically in album, then scroll up to exit
    const targetPosY = (Math.sin(state.clock.elapsedTime) * 0.15 * (1 - transitionProgress)) + (exitProgress * 8);

    // --- THE ROTATION MATH ---
    // Hero: Tilted back like a turntable (-Math.PI / 3)
    // Album: Standing up perfectly flat facing the camera (0)
    const baseRotX = THREE.MathUtils.lerp(-Math.PI / 3, 0, transitionProgress);

    // Apply linear interpolation for smooth snapping
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetPosX, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetPosZ, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetPosY, 0.08);

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, baseRotX + mouseTiltX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseTiltY, 0.05);

    // Continuous spin on the Z-axis (since the mesh is now built facing Z)
    spinRef.current.rotation.z -= 0.005;
  });

  return (
    <group ref={groupRef}>
      <group ref={spinRef}>
        
        {/* The Black Vinyl Record - Rotated inherently to face the screen */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.4, 2.4, 0.04, 64]} />
          <meshStandardMaterial color="#090a0f" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* The Center Label - Pushed slightly forward on the Z-axis to sit on top of the vinyl */}
        <mesh position={[0, 0, 0.021]}>
          <circleGeometry args={[0.9, 64]} />
          <meshStandardMaterial map={texture} roughness={0.3} metalness={0.2} />
        </mesh>

      </group>
    </group>
  );
}