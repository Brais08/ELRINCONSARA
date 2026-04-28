import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, ContactShadows, Float } from '@react-three/drei';
import { Basketball, Pedestal, FloatingGrid } from './Scene3D';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

const Scene = () => {
  const ballRef = useRef<THREE.Group>(null);
  const pedestalRef = useRef<THREE.Group>(null);
  const gridRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.DirectionalLight>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialScale = isMobile ? 1.5 : 2.5;

  useGSAP(() => {
    // Delay slightly to ensure everything is mounted
    if (!ballRef.current || !pedestalRef.current || !gridRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      }
    });

    // 1. Banner -> Sobre Mi
    // Glide bottle to right
    tl.to(ballRef.current.position, { x: isMobile ? 1.2 : 3, y: -1, z: 0, duration: 2 })
      .to(ballRef.current.scale, { x: isMobile ? 1.2 : 2.0, y: isMobile ? 1.2 : 2.0, z: isMobile ? 1.2 : 2.0, duration: 2 }, '<');

    // 2. Sobre Mi -> Citas
    // Move bottle behind left calendar, raise pedestal
    tl.to(ballRef.current.position, { x: isMobile ? -1.2 : -3, y: 2, z: -3, duration: 2.5 }, '+=1')
      .to(ballRef.current.scale, { x: isMobile ? 0.8 : 1.2, y: isMobile ? 0.8 : 1.2, z: isMobile ? 0.8 : 1.2, duration: 2.5 }, '<')
      .to(pedestalRef.current.position, { y: -4, duration: 2.5 }, '<')
      .to(gridRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 2.5 }, '<');

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={45} />

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1500} castShadow />
      <directionalLight
        ref={lightRef}
        position={[5, 10, 5]}
        intensity={2}
        castShadow
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, -5, -5]} color="#ec4899" intensity={10} />

      {/* 3D Objects */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Basketball ref={ballRef} position={[0, 0, 0]} scale={initialScale} />
      </Float>

      <Pedestal ref={pedestalRef} position={[0, -10, 0]} />

      <group ref={gridRef} scale={0}>
        <FloatingGrid />
      </group>

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />

      <Environment preset="night" />
    </>
  );
};

export const ExperienceWrapper = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas shadows dpr={[1, 2]}>
        <Scene />
      </Canvas>
    </div>
  );
};
