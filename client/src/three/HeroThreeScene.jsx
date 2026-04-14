import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

function Road() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[14, 4]} />
        <meshStandardMaterial color="#101a2a" roughness={0.98} metalness={0.03} />
      </mesh>

      <mesh position={[0, 0.01, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[13, 0.12]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.75} />
      </mesh>

      {[-2.2, 0, 2.2].map((x) => (
        <mesh key={x} position={[x, 0.012, 0]} rotation-x={-Math.PI / 2}>
          <planeGeometry args={[0.85, 0.06]} />
          <meshStandardMaterial color="#f6c165" roughness={0.7} />
        </mesh>
      ))}

      <mesh position={[0, -0.02, -2.25]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[14, 0.3]} />
        <meshStandardMaterial color="#2c405a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Backdrop() {
  return (
    <>
      <mesh position={[-4.8, 2.2, -10]}>
        <sphereGeometry args={[2.2, 24, 24]} />
        <meshBasicMaterial color="#7f9abc" transparent opacity={0.18} depthWrite={false} depthTest={false} />
      </mesh>

      <mesh position={[4.6, 3.8, -12]}>
        <sphereGeometry args={[3.6, 24, 24]} />
        <meshBasicMaterial color="#f6c165" transparent opacity={0.12} depthWrite={false} depthTest={false} />
      </mesh>
    </>
  );
}

export function CarModel() {
  const carRef = useRef();
  const wheelRefs = useRef([]);
  const headlightRefs = useRef([]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();

    if (carRef.current) {
      carRef.current.position.x = Math.sin(elapsed * 0.9) * 0.2;
      carRef.current.position.y = 0.28 + Math.sin(elapsed * 2.2) * 0.05;
      carRef.current.rotation.y = Math.sin(elapsed * 0.8) * 0.18;
      carRef.current.rotation.z = Math.sin(elapsed * 2.6) * 0.015;
    }

    wheelRefs.current.forEach((wheel) => {
      if (wheel) {
        wheel.rotation.x -= delta * 8;
      }
    });

    headlightRefs.current.forEach((light, index) => {
      if (light) {
        light.material.emissiveIntensity = 1.1 + Math.sin(elapsed * 4 + index) * 0.16;
      }
    });
  });

  return (
    <group ref={carRef} position={[0, 0.28, 0]} scale={1.3}>
      <mesh castShadow receiveShadow position={[0, 0.26, 0]}>
        <boxGeometry args={[2.2, 0.5, 1.1]} />
        <meshStandardMaterial color="#dce8f7" roughness={0.26} metalness={0.08} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.08, 0.7, 0]}>
        <boxGeometry args={[1.14, 0.38, 0.84]} />
        <meshStandardMaterial color="#7f9abc" roughness={0.22} metalness={0.12} />
      </mesh>

      <mesh castShadow receiveShadow position={[0.86, 0.3, 0]}>
        <boxGeometry args={[0.32, 0.18, 0.94]} />
        <meshStandardMaterial color="#f6c165" roughness={0.32} metalness={0.1} />
      </mesh>

      <mesh castShadow receiveShadow position={[1.12, 0.18, 0.3]}>
        <boxGeometry args={[0.14, 0.1, 0.18]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff5d8" emissiveIntensity={0.75} />
      </mesh>

      <mesh castShadow receiveShadow position={[1.12, 0.18, -0.3]}>
        <boxGeometry args={[0.14, 0.1, 0.18]} />
        <meshStandardMaterial color="#ffffff" emissive="#fff5d8" emissiveIntensity={0.75} />
      </mesh>

      {[
        [-0.72, 0, 0.48],
        [-0.72, 0, -0.48],
        [0.66, 0, 0.48],
        [0.66, 0, -0.48],
      ].map((position, index) => (
        <mesh
          key={`${position.join('-')}`}
          ref={(node) => {
            wheelRefs.current[index] = node;
          }}
          castShadow
          receiveShadow
          position={position}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.18, 0.18, 0.14, 20]} />
          <meshStandardMaterial color="#0f1724" roughness={0.75} metalness={0.05} />
        </mesh>
      ))}

      <mesh position={[1.22, 0.32, 0]}>
        <sphereGeometry args={[0.08, 18, 18]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={1.8} />
      </mesh>

      <mesh ref={(node) => { headlightRefs.current[0] = node; }} position={[1.16, 0.2, 0.26]} rotation={[0, -Math.PI / 2, 0]}>
        <coneGeometry args={[0.12, 1.1, 16, 1, true]} />
        <meshStandardMaterial color="#fff4cc" emissive="#f6c165" emissiveIntensity={1.35} transparent opacity={0.6} side={2} />
      </mesh>

      <mesh ref={(node) => { headlightRefs.current[1] = node; }} position={[1.16, 0.2, -0.26]} rotation={[0, -Math.PI / 2, 0]}>
        <coneGeometry args={[0.12, 1.1, 16, 1, true]} />
        <meshStandardMaterial color="#fff4cc" emissive="#f6c165" emissiveIntensity={1.35} transparent opacity={0.6} side={2} />
      </mesh>
    </group>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();

  useFrame((state) => {
    const targetX = mouse.x * 0.4;
    const targetY = 1.75 + mouse.y * 0.14;

    camera.position.x += (targetX - camera.position.x) * 0.045;
    camera.position.y += (targetY - camera.position.y) * 0.045;
    camera.lookAt(0, 0.5, 0);

    if (state.clock.elapsedTime > 0) {
      camera.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.01;
    }
  });

  return null;
}

function HeroSceneContent() {
  return (
    <>
      <color attach="background" args={['#dfe9f7']} />
      <ambientLight intensity={1.75} />
      <directionalLight position={[4, 7, 5]} intensity={2.6} castShadow />
      <directionalLight position={[-4, 2, -2]} intensity={1.05} color="#7f9abc" />
      <hemisphereLight intensity={0.85} groundColor="#1b2a3d" color="#f8fafc" />
      <pointLight position={[0, 2.4, 2.2]} intensity={1.5} color="#f6c165" />
      <pointLight position={[-1.6, 1.6, 1.3]} intensity={1.1} color="#ffffff" />

      <Backdrop />

      <group position={[0, -0.95, 0]}>
        <Road />
      </group>

      <CarModel />

      <mesh position={[0, -1.1, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[14, 9]} />
        <meshStandardMaterial color="#dbe6f5" roughness={1} metalness={0} />
      </mesh>

      <mesh position={[0, 0.72, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.45, 0.18, 20, 72]} />
        <meshBasicMaterial color="#f6c165" transparent opacity={0.92} />
      </mesh>

      <mesh position={[0, 0.72, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.65, 0.08, 16, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.55} />
      </mesh>

      <mesh position={[0, 1.12, 0.1]}>
        <sphereGeometry args={[0.14, 18, 18]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>

      {[
        [2.55, 0.88, 0.1, '#f6c165'],
        [-2.55, 0.88, 0.1, '#7f9abc'],
        [0, 0.88, 2.55, '#ffffff'],
        [0, 0.88, -2.55, '#f6c165'],
      ].map(([x, y, z, color]) => (
        <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.95} />
        </mesh>
      ))}

      <CameraRig />
    </>
  );
}

export default function HeroThreeScene() {
  return <HeroSceneContent />;
}
