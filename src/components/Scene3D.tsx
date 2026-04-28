import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus, Float, useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

export const Basketball = forwardRef<THREE.Group, any>((props, ref) => {
  const { scene } = useGLTF('/nailpolish_colorfull.glb');
  const ballRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (ballRef.current) {
      ballRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={ref} {...props}>
      <group ref={ballRef}>
        <Center>
          <primitive object={scene} scale={2} castShadow receiveShadow />
        </Center>
      </group>
    </group>
  );
});
useGLTF.preload('/nailpolish_colorfull.glb');
export const Pedestal = forwardRef<THREE.Group, any>((props, ref) => {
  return (
    <group ref={ref} {...props}>
      <mesh receiveShadow>
        <cylinderGeometry args={[1.2, 1.4, 4, 32]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.2} />
      </mesh>
      <mesh position={[0, 2.01, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.05, 32]} />
        <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={5} />
        <pointLight color="#ec4899" intensity={5} distance={3} />
      </mesh>
    </group>
  );
});

export const FloatingGrid = forwardRef<THREE.Group, any>((props, ref) => {
    useFrame((state) => {
        if(ref && 'current' in ref && ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={ref} {...props}>
            {Array.from({ length: 20 }).map((_, i) => (
                <mesh 
                    key={i} 
                    position={[
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30,
                        (Math.random() - 0.5) * 30
                    ]}
                    rotation={[Math.random(), Math.random(), Math.random()]}
                >
                    <octahedronGeometry args={[Math.random() * 0.5, 0]} />
                    <meshStandardMaterial color="#ec4899" transparent opacity={0.15} wireframe />
                </mesh>
            ))}
        </group>
    );
});
