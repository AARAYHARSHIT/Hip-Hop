import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import VinylRecord from './VinylRecord';
import Particles from './particles';

export default function Scene() {
  return (
    <Canvas 
      shadows
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight 
        position={[-5, 8, 5]} 
        intensity={3.5} 
        color="#ffffff" 
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight position={[0, 5, 2]} intensity={2} angle={0.6} penumbra={1} color="#e11d48" />
      
      {/* 3D Elements */}
      <Particles count={600} />
      <VinylRecord />
      
      <Environment preset="night" />
    </Canvas>
  );
}