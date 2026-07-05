import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TAGS = ['RAW', 'LOUD', 'CYPHER', 'BOOM BAP', 'BARS', 'FRESH', 'WAX', 'FLAVA'];

interface TagProps {
  position: [number, number, number];
  color: string;
  speed: number;
  index: number;
}

function GraffitiTag({ position, color, speed, index }: TagProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + index;
      ref.current.position.y = position[1] + Math.sin(t) * 0.4;
      ref.current.rotation.z = Math.sin(t * 0.5) * 0.15;
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[0, 0, index % 2 === 0 ? 0.1 : -0.1]}>
        <planeGeometry args={[1.4, 0.5]} />
        <meshStandardMaterial
          color={color}
          roughness={0.6}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

interface GraffitiProps {
  scrollProgress: number;
}

export function GraffitiTags({ scrollProgress }: GraffitiProps) {
  const groupRef = useRef<THREE.Group>(null);

  const tags = useMemo(
    () =>
      TAGS.map((_, i) => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3 - 1,
        ] as [number, number, number],
        color: i % 3 === 0 ? '#fae500' : i % 3 === 1 ? '#e10600' : '#f5f5f4',
        speed: 0.3 + Math.random() * 0.4,
        index: i,
      })),
    []
  );

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollProgress * Math.PI * 0.3,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      {tags.map((tag, i) => (
        <GraffitiTag key={i} {...tag} />
      ))}
    </group>
  );
}
