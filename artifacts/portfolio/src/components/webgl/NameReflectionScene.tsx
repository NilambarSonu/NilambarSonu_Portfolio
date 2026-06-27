import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { nameReflectionFrag } from "@/shaders/nameReflection.frag";
import { nameReflectionVert } from "@/shaders/nameReflection.vert";

function ReflectionPlane() {
  const texture = useTexture("/Name.jpg");
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [aspectX, setAspectX] = useState(4);

  useEffect(() => {
      const handleResize = () => setAspectX(window.innerWidth > 768 ? 4 : 2);
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_texture: { value: texture },
    }),
    [texture]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      <planeGeometry args={[aspectX, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nameReflectionVert}
        fragmentShader={nameReflectionFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function NameReflectionScene() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full absolute inset-0">
      <Suspense fallback={null}>
        <ReflectionPlane />
      </Suspense>
    </Canvas>
  );
}
