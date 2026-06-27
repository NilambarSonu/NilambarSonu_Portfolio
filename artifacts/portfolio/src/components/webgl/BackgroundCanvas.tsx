import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Particles() {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 15 - 5;
      const speed = 0.1 + Math.random() * 0.5;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((p, i) => {
      p.y += 0.01 * p.speed;
      p.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.005;
      if (p.y > 10) p.y = -10;
      
      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#e50914" transparent opacity={0.3} depthWrite={false} blending={THREE.AdditiveBlending} />
    </instancedMesh>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="absolute inset-0" style={{ zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
        <Particles />
      </Canvas>
    </div>
  );
}
