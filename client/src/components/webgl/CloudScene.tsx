import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { cloudSwirlFrag } from "@/shaders/cloudSwirl.frag";
import { cloudSwirlVert } from "@/shaders/cloudSwirl.vert";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function CloudPlane() {
  const texture = useTexture("/Top.jpg");
  const materialRef = useRef<THREE.ShaderMaterial>(null);

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
      <planeGeometry args={[window.innerWidth > 768 ? 4 : 2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={cloudSwirlVert}
        fragmentShader={cloudSwirlFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function CloudScene() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full absolute inset-0">
      <CloudPlane />
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  );
}
