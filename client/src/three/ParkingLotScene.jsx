import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';

export function ParkingSlot3D({ id, available, position, onToggle }) {
  const slotRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!slotRef.current) {
      return;
    }

    const targetScale = hovered ? 1.12 : 1;
    const targetHeight = hovered ? 0.42 : 0.32;
    const targetRotation = hovered ? 0.06 : 0;

    slotRef.current.scale.x += (targetScale - slotRef.current.scale.x) * 0.12;
    slotRef.current.scale.y += (targetScale - slotRef.current.scale.y) * 0.12;
    slotRef.current.scale.z += (targetScale - slotRef.current.scale.z) * 0.12;
    slotRef.current.position.y += ((hovered ? 0.18 : targetHeight) - slotRef.current.position.y) * 0.12;
    slotRef.current.rotation.z += (targetRotation - slotRef.current.rotation.z) * 0.08;
    slotRef.current.rotation.y += (hovered ? 0.04 : 0) * delta;
  });

  return (
    <group ref={slotRef} position={position}>
      <mesh
        castShadow
        receiveShadow
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(event) => {
          event.stopPropagation();
          onToggle(id);
        }}
      >
        <boxGeometry args={[1.08, 0.32, 0.62]} />
        <meshStandardMaterial
          color={available ? '#36d399' : '#ef6a6a'}
          emissive={available ? '#1c7d57' : '#8d2626'}
          emissiveIntensity={hovered ? 0.9 : 0.3}
          roughness={0.3}
          metalness={0.08}
        />
      </mesh>

      <mesh position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={available ? '#36d399' : '#ef6a6a'}
          emissive={available ? '#36d399' : '#ef6a6a'}
          emissiveIntensity={hovered ? 1.1 : 0.45}
          transparent
          opacity={0.55}
        />
      </mesh>

      <mesh position={[0, 0.22, 0]}>
        <boxGeometry args={[0.78, 0.06, 0.4]} />
        <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={0.15} opacity={0.7} transparent />
      </mesh>
    </group>
  );
}

function ParkingGrid() {
  const initialSlots = useMemo(
    () => [
      { id: 'A1', available: true, position: [-2.7, 0.32, 1.6] },
      { id: 'A2', available: false, position: [-0.9, 0.32, 1.6] },
      { id: 'A3', available: true, position: [0.9, 0.32, 1.6] },
      { id: 'A4', available: true, position: [2.7, 0.32, 1.6] },
      { id: 'B1', available: false, position: [-2.7, 0.32, -0.1] },
      { id: 'B2', available: true, position: [-0.9, 0.32, -0.1] },
      { id: 'B3', available: true, position: [0.9, 0.32, -0.1] },
      { id: 'B4', available: false, position: [2.7, 0.32, -0.1] },
    ],
    [],
  );
  const [slots, setSlots] = useState(initialSlots);
  const canopyRef = useRef();

  useFrame((state) => {
    if (canopyRef.current) {
      canopyRef.current.position.y = 2.1 + Math.sin(state.clock.getElapsedTime() * 0.9) * 0.03;
    }
  });

  const toggleSlot = (slotId) => {
    setSlots((current) =>
      current.map((slot) => (slot.id === slotId ? { ...slot, available: !slot.available } : slot)),
    );
  };

  return (
    <>
      <fog attach="fog" args={['#101a2a', 8, 18]} />
      <ambientLight intensity={1.08} />
      <hemisphereLight skyColor="#dfe8f3" groundColor="#132033" intensity={0.9} />
      <directionalLight position={[5, 8, 4]} intensity={2} castShadow />
      <directionalLight position={[-4, 2, -3]} intensity={0.85} color="#7f9abc" />
      <pointLight position={[-3.8, 2.4, 1.8]} intensity={1.1} color="#36d399" />
      <pointLight position={[4.2, 1.8, -0.2]} intensity={0.95} color="#f6c165" />

      <mesh position={[0, -0.28, 0]} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[10.5, 6]} />
        <meshStandardMaterial color="#1c2a40" roughness={0.98} />
      </mesh>

      <mesh position={[0, -0.27, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[10.5, 0.05]} />
        <meshStandardMaterial color="#f6c165" roughness={0.32} emissive="#f6c165" emissiveIntensity={0.08} />
      </mesh>

      <mesh position={[0, -0.18, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[8.9, 4.7]} />
        <meshStandardMaterial color="#243753" roughness={0.95} transparent opacity={0.45} />
      </mesh>

      <mesh position={[0, 0.92, 0]}>
        <boxGeometry args={[8.9, 0.04, 4.7]} />
        <meshStandardMaterial color="#3a5275" roughness={0.9} transparent opacity={0.14} />
      </mesh>

      <mesh position={[-4.3, 0.2, 0]}>
        <boxGeometry args={[0.16, 1.55, 4.6]} />
        <meshStandardMaterial color="#162235" roughness={0.85} />
      </mesh>

      <mesh position={[4.3, 0.2, 0]}>
        <boxGeometry args={[0.16, 1.55, 4.6]} />
        <meshStandardMaterial color="#162235" roughness={0.85} />
      </mesh>

      {slots.map((slot) => (
        <ParkingSlot3D key={slot.id} {...slot} onToggle={toggleSlot} />
      ))}

      <group ref={canopyRef} position={[0, 2.05, -1.45]}>
        <mesh>
          <boxGeometry args={[3.1, 0.18, 0.34]} />
          <meshStandardMaterial color="#dfe8f3" emissive="#ffffff" emissiveIntensity={0.08} />
        </mesh>

        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[1.9, 0.6, 0.18]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.05} />
        </mesh>
      </group>

      <group position={[0, 1.15, 2.35]}>
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#f6c165" emissive="#f6c165" emissiveIntensity={0.9} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#fff6d6" emissive="#fff6d6" emissiveIntensity={0.8} transparent opacity={0.95} />
        </mesh>
      </group>

      <mesh position={[0, 1.9, -1.45]}>
        <boxGeometry args={[2.7, 0.24, 0.28]} />
        <meshStandardMaterial color="#dfe8f3" emissive="#ffffff" emissiveIntensity={0.06} />
      </mesh>

      <mesh position={[0, 2.15, -1.45]}>
        <boxGeometry args={[1.7, 0.8, 0.2]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.06} />
      </mesh>

      <mesh position={[0, 2.45, -1.45]}>
        <boxGeometry args={[2.2, 0.16, 0.18]} />
        <meshStandardMaterial color="#f6c165" emissive="#f6c165" emissiveIntensity={0.08} />
      </mesh>

    </>
  );
}

export default function ParkingLotScene() {
  return <ParkingGrid />;
}
