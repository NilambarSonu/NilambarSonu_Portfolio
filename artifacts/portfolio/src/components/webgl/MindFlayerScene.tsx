import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { displacementFrag } from "@/shaders/displacement.frag";
import { displacementVert } from "@/shaders/displacement.vert";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function MindFlayerPlane({ imagePath, tint }: { imagePath: string; tint: number }) {
  const texture = useTexture(imagePath);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_texture: { value: texture },
      u_depthMap: { value: texture }, // Fallback to main texture as pseudo depth map
      u_intensity: { value: 0.15 },
      u_tint: { value: tint }
    }),
    [texture, tint]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh>
      {/* High segment count for displacement vertices */}
      <planeGeometry args={[3, 3, 128, 128]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={displacementVert}
        fragmentShader={displacementFrag}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function LightningEffect() {
  const [intensity, setIntensity] = useState(1);
  
  useFrame(() => {
      // Stochastic lightning flash
      if (Math.random() > 0.99) {
          setIntensity(Math.random() * 3 + 2); // Sudden spike
      } else {
          setIntensity((v) => THREE.MathUtils.lerp(v, 1.0, 0.1)); // Fade back
      }
  });

  return (
    <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={intensity} />
    </EffectComposer>
  );
}

export default function MindFlayerScene({ imagePath, tint }: { imagePath: string; tint: number }) {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full absolute inset-0">
      <Suspense fallback={null}>
        <MindFlayerPlane imagePath={imagePath} tint={tint} />
      </Suspense>
      <LightningEffect />
    </Canvas>
  );
}

// Ensure Suspense export is available above
import { Suspense } from "react";
