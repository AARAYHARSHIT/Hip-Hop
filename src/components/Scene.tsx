import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VinylRecord } from './VinylRecord';
import { StudioMic } from './StudioMic';
import { GraffitiTags } from './GraffitiTags';

interface SceneProps {
  scrollProgress: number;
}

function Rig({ scrollProgress }: SceneProps) {
  useFrame((state) => {
    const targetZ = 6 + scrollProgress * 3;
    const targetY = -scrollProgress * 0.5;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 0, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function StreetLamp({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <pointLight
      position={position}
      color={color}
      intensity={40}
      distance={12}
      decay={2}
    />
  );
}

export function Scene({ scrollProgress }: SceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} color="#44403c" />
        <hemisphereLight args={['#44403c', '#0c0a09', 0.3]} />

        {/* Harsh streetlamp lighting */}
        <StreetLamp position={[-4, 4, 3]} color="#fae500" />
        <StreetLamp position={[4, -2, 3]} color="#e10600" />
        <StreetLamp position={[0, 3, -2]} color="#f5f5f4" />

        {/* Camera flash effect */}
        <directionalLight position={[0, 5, 5]} intensity={1.5} color="#ffffff" />

        <VinylRecord scrollProgress={scrollProgress} />
        <StudioMic scrollProgress={scrollProgress} />
        <GraffitiTags scrollProgress={scrollProgress} />
      </Suspense>
      <Rig scrollProgress={scrollProgress} />
    </Canvas>
  );
}
