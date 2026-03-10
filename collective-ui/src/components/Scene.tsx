"use client";
/* eslint-disable */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

/**
 * THE MOON (AI Supervisor)
 */
function Moon() {
  const moonRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group position={[0, 14, -10]}>
      <mesh ref={moonRef}>
        <sphereGeometry args={[6, 64, 64]} />
        <meshStandardMaterial 
          color="#c8dcf0"
          emissive="#224488"
          emissiveIntensity={0.8}
          roughness={0.8} 
        />
      </mesh>
      {/* Intense core light for bloom */}
      <pointLight color="#99ddff" intensity={500} distance={150} />
      {/* Halo plane to enhance optical glow */}
      <mesh position={[0,0,-1]}>
        <planeGeometry args={[22, 22]} />
        <meshBasicMaterial color="#4dd9ff" transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/**
 * ECO-SPHERE (Human Council)
 * Uses MeshTransmissionMaterial for high-end glass refraction
 */
function EcoSphere({ position, color, index }: { position: [number, number, number], color: string, index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle floating and rotating
      const t = state.clock.elapsedTime;
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.4;
      groupRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Glass Shell */}
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <MeshTransmissionMaterial 
          backside
          samples={4}
          thickness={1.5}
          roughness={0.05}
          ior={1.5}
          chromaticAberration={0.03}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#ffffff"
        />
      </mesh>
      
      {/* Bio Core */}
      <mesh scale={0.75}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} roughness={0.4} />
      </mesh>
      <pointLight color={color} intensity={20} distance={10} />
    </group>
  );
}

/**
 * GLASS ARCHITECTURE & NETWORK
 * Floating shattered triangles mimicking Detroit UI
 */
function GlassFragments() {
  const count = 60;
  const fragments = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 40 + 5,
          (Math.random() - 0.5) * 60 - 10
        ] as [number, number, number],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [number, number, number],
        scale: 0.5 + Math.random() * 2.5,
        speed: 0.1 + Math.random() * 0.3
      });
    }
    return temp;
  }, []);

  return (
    <>
      {fragments.map((frag, i) => (
        <Float key={i} speed={frag.speed} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={frag.position} rotation={frag.rotation} scale={frag.scale}>
            <coneGeometry args={[1, 1.5, 3]} /> {/* Triangle shard */}
            <MeshTransmissionMaterial 
              thickness={0.2}
              roughness={0}
              ior={1.2}
              transmission={0.9}
              color="#4dd9ff"
            />
            {/* Edge glow */}
            <lineSegments>
              <edgesGeometry args={[new THREE.ConeGeometry(1, 1.5, 3)]} />
              <lineBasicMaterial color="#4dd9ff" transparent opacity={0.3} />
            </lineSegments>
          </mesh>
        </Float>
      ))}
    </>
  );
}

/**
 * THE MASSES (Infinite depth of field phantom spheres)
 */
function PhantomSpheres() {
  const count = 400;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 150,
        y: (Math.random() - 0.5) * 100 - 10,
        z: -Math.random() * 300 - 20, // push far back
        speed: 0.05 + Math.random() * 0.1
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      p.z += p.speed;
      if (p.z > 20) {
        p.z = -300; // loop back
        p.x = (Math.random() - 0.5) * 150;
      }
      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#4dd9ff" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

/**
 * CAMERA PARALLAX RIG
 */
function CameraRig() {
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Smooth mouse follow
    const targetX = (state.mouse.x * 5);
    const targetY = (state.mouse.y * 5);
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.lookAt(0, 5, -10);
  });
  return null;
}

export default function Scene() {
  const ecoColors = [
    "#39d68f", "#4dd9ff", "#a78bfa", 
    "#fbbf24", "#39d68f", "#4dd9ff", "#f472b6"
  ];
  const radius = 18;

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
        dpr={[1, 2]}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#02040a']} />
        <fogExp2 attach="fog" args={['#02040a', 0.015]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 10]} intensity={2} color="#4dd9ff" />

        <CameraRig />

        {/* Global Environment for Glass Reflections */}
        <Environment preset="night" />

        {/* Elements */}
        <Moon />
        
        {ecoColors.map((color, i) => {
          const angle = (i / 7) * Math.PI * 2;
          const x = Math.cos(angle) * (radius * 0.8);
          // Arc formation
          const y = -2 + Math.sin(angle * 1.5) * 2; 
          const z = Math.sin(angle) * (radius * 0.3);
          return <EcoSphere key={i} index={i} position={[x, y, z]} color={color} />;
        })}

        <GlassFragments />
        <PhantomSpheres />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} speed={1} />

        {/* Post Processing Pipline */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={1.5} // Only glow extremely bright things
            mipmapBlur 
            intensity={1.2} 
          />
          <DepthOfField 
            focusDistance={0.02} // distance to focal plane
            focalLength={0.15}   // focal length
            bokehScale={5}       // bokeh size
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={new THREE.Vector2(0.001, 0.001)} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
