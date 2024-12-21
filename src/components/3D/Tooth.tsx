import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ToothProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  toothNumber: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export function Tooth({ 
  position, 
  rotation = [0, 0, 0], 
  toothNumber,
  isSelected = false,
  onClick,
}: ToothProps) {
  const meshRef = useRef<THREE.Mesh>();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current && (hovered || isSelected)) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  const getToothColor = () => {
    if (isSelected) return '#3b82f6';
    if (hovered) return '#93c5fd';
    return '#ffffff';
  };

  // Create anatomically accurate tooth geometry
  const createToothGeometry = () => {
    const crownHeight = 0.3;
    const rootHeight = 0.4;
    const maxWidth = 0.2;
    
    const points = [];
    
    // Crown top (slightly curved)
    points.push(new THREE.Vector2(0, crownHeight));
    points.push(new THREE.Vector2(maxWidth * 0.7, crownHeight * 0.95));
    points.push(new THREE.Vector2(maxWidth, crownHeight * 0.85));
    
    // Crown body
    points.push(new THREE.Vector2(maxWidth * 1.1, crownHeight * 0.7));
    points.push(new THREE.Vector2(maxWidth * 1.15, crownHeight * 0.5));
    points.push(new THREE.Vector2(maxWidth * 1.1, crownHeight * 0.3));
    points.push(new THREE.Vector2(maxWidth, crownHeight * 0.1));
    
    // Crown-root junction (cervical line)
    points.push(new THREE.Vector2(maxWidth * 0.9, 0));
    
    // Root structure
    points.push(new THREE.Vector2(maxWidth * 0.8, -rootHeight * 0.2));
    points.push(new THREE.Vector2(maxWidth * 0.7, -rootHeight * 0.4));
    points.push(new THREE.Vector2(maxWidth * 0.5, -rootHeight * 0.6));
    points.push(new THREE.Vector2(maxWidth * 0.3, -rootHeight * 0.8));
    points.push(new THREE.Vector2(maxWidth * 0.1, -rootHeight));
    points.push(new THREE.Vector2(0, -rootHeight)); // Root tip

    // Create lathe geometry with more segments for smoother surface
    const geometry = new THREE.LatheGeometry(points, 32);
    
    // Add surface details
    const positionAttribute = geometry.getAttribute('position');
    const vertex = new THREE.Vector3();
    
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      
      // Add subtle surface irregularities
      const noise = (Math.random() - 0.5) * 0.01;
      vertex.x += noise;
      vertex.y += noise;
      vertex.z += noise;
      
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    
    geometry.computeVertexNormals();
    return geometry;
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={onClick}
      scale={isSelected ? 1.2 : hovered ? 1.1 : 1}
      geometry={createToothGeometry()}
    >
      <meshPhysicalMaterial
        color={getToothColor()}
        metalness={0.1}
        roughness={0.3}
        clearcoat={0.5}
        clearcoatRoughness={0.3}
        reflectivity={0.5}
      />
    </mesh>
  );
}