import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ theme }) {
  const ref = useRef();
  
  const [positions] = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const count = isMobile ? 1000 : 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  const isDark = theme === 'dark';

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={true}>
        <PointMaterial
          transparent
          color={isDark ? "#14B8A6" : "#0D9488"}
          size={isDark ? 0.05 : 0.08}
          sizeAttenuation={true}
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          opacity={isDark ? 0.6 : 0.3}
        />
      </Points>
    </group>
  );
}

export default function Hero3D({ theme }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        zIndex: 0, 
        pointerEvents: 'none',
        opacity: theme === 'dark' ? 1 : 0.8
      }}
    >
      {ready && (
        <Canvas 
          frameloop={isVisible ? 'always' : 'never'}
          dpr={[1, Math.min(window.devicePixelRatio || 1, 1.5)]} 
          gl={{ powerPreference: 'high-performance', antialias: false, alpha: true }} 
          camera={{ position: [0, 0, 6] }}
          style={{ display: isVisible ? 'block' : 'none' }}
          onCreated={({ gl }) => {
            const canvasEl = gl.domElement;
            const handleContextLost = (event) => {
              event.preventDefault();
            };
            const handleContextRestored = () => {
              gl.resetState();
            };
            canvasEl.addEventListener('webglcontextlost', handleContextLost, false);
            canvasEl.addEventListener('webglcontextrestored', handleContextRestored, false);
          }}
        >
          <Particles theme={theme} />
        </Canvas>
      )}
    </div>
  );
}


