import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Tooth } from './Tooth';

export default function TeethViewer() {
  const controlsRef = useRef();
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null);

  const handleToothClick = (toothNumber: number) => {
    setSelectedTooth(toothNumber === selectedTooth ? null : toothNumber);
  };

  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        <OrbitControls
          ref={controlsRef}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          enableZoom={true}
          enablePan={true}
          maxDistance={10}
          minDistance={2}
        />
        
        <Environment preset="studio" />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          castShadow
          intensity={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[-5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Upper Arch */}
        <group position={[0, 1, 0]} rotation={[0.1, 0, 0]}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (Math.PI / 3) * ((i - 7.5) / 7.5);
            const radius = 2;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius * 0.5;
            
            return (
              <Tooth
                key={`upper-${i}`}
                position={[x, 0, z]}
                rotation={[0, -angle, Math.PI]}
                toothNumber={i + 1}
                isSelected={selectedTooth === i + 1}
                onClick={() => handleToothClick(i + 1)}
              />
            );
          })}
        </group>

        {/* Lower Arch */}
        <group position={[0, -1, 0]} rotation={[-0.1, 0, 0]}>
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (Math.PI / 3) * ((i - 7.5) / 7.5);
            const radius = 2;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius * 0.5;
            
            return (
              <Tooth
                key={`lower-${i}`}
                position={[x, 0, z]}
                rotation={[0, -angle, 0]}
                toothNumber={i + 17}
                isSelected={selectedTooth === i + 17}
                onClick={() => handleToothClick(i + 17)}
              />
            );
          })}
        </group>
      </Canvas>
    </div>
  );
}