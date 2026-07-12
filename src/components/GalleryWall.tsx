import { useRef, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

import backupImg from '../assets/Backup.jpg';
import concertImg from '../assets/Concert.jpg';
import performanceImg from '../assets/Performance.jpg';
import stageImg from '../assets/Stage.jpg';

export default function GalleryWall() {
  const wallRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  // High-fidelity multi-texture processing
  const [tex1, texture2, tex3, tex4] = useLoader(THREE.TextureLoader, [
    backupImg,
    concertImg,
    performanceImg,
    stageImg
  ]);

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (!wallRef.current) return;

    const vh = window.innerHeight;
    const scrollY = scrollRef.current;

    // This component remains hidden until user scrolls into section 3
    const triggerZone = Math.max(0, (scrollY - vh * 1.5) / vh);

    // Smooth entry slide along the vertical Y layout coordinate
    const targetY = -12 + (triggerZone * 7.5);
    wallRef.current.position.y = THREE.MathUtils.lerp(wallRef.current.position.y, targetY, 0.05);

    // Subtle ambient rotation tracking cursor hover drift
    wallRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
  });

  return (
    <group ref={wallRef} position={[0, -12, -2]}>
      {/* Photo Sheet A */}
      <mesh position={[-3.5, 2, -1]} rotation={[0, 0.1, -0.05]}>
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial map={tex1} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Photo Sheet B */}
      <mesh position={[-1.2, -1, 0]} rotation={[0, -0.05, 0.05]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshStandardMaterial map={texture2} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>

      {/* Photo Sheet C */}
      <mesh position={[1.5, 2.2, -0.5]} rotation={[0, -0.1, 0.02]}>
        <planeGeometry args={[2, 2.5]} />
        <meshStandardMaterial map={tex3} roughness={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Photo Sheet D */}
      <mesh position={[3.8, -0.8, -1.2]} rotation={[0, 0.15, -0.08]}>
        <planeGeometry args={[1.8, 2.4]} />
        <meshStandardMaterial map={tex4} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}