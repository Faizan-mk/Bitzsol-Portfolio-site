"use client";

import { ContactShadows, Line, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";

const SKIN = "#f0b98f";
const NEON = "#d5ff27";
const VIOLET = "#7f3aed";
const DARK = "#2a2a33";
const R = 2.5;

type Parts = { head: THREE.Group; armL: THREE.Group; armR: THREE.Group; body: THREE.Group };
type Anim = (t: number, p: Parts) => void;

function Person({ shirt, hair, hairStyle, legs = true, animate, children }: {
  shirt: string; hair: string; hairStyle: "short" | "bun" | "long"; legs?: boolean; animate?: Anim; children?: ReactNode;
}) {
  const head = useRef<THREE.Group>(null!);
  const armL = useRef<THREE.Group>(null!);
  const armR = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    head.current.rotation.z = Math.sin(t * 1.3) * 0.05;
    body.current.position.y = Math.sin(t * 2) * 0.015;
    animate?.(t, { head: head.current, armL: armL.current, armR: armR.current, body: body.current });
  });

  return (
    <group ref={body}>
      {legs && [-0.13, 0.13].map((x) => (
        <group key={x}>
          <mesh position={[x, 0.32, 0]} castShadow><capsuleGeometry args={[0.1, 0.42, 6, 16]} /><meshStandardMaterial color={DARK} roughness={0.7} /></mesh>
          <mesh position={[x, 0.06, 0.06]} castShadow><sphereGeometry args={[0.12, 20, 16]} /><meshStandardMaterial color="#141418" /></mesh>
        </group>
      ))}
      <mesh position={[0, 0.92, 0]} castShadow><capsuleGeometry args={[0.3, 0.38, 8, 24]} /><meshStandardMaterial color={shirt} roughness={0.6} /></mesh>

      {([[-1, armL], [1, armR]] as const).map(([side, ref]) => (
        <group key={side} ref={ref} position={[side * 0.37, 1.18, 0]}>
          <mesh position={[0, -0.24, 0]} castShadow><capsuleGeometry args={[0.085, 0.36, 6, 12]} /><meshStandardMaterial color={shirt} roughness={0.6} /></mesh>
          <mesh position={[0, -0.5, 0]} castShadow><sphereGeometry args={[0.095, 16, 12]} /><meshStandardMaterial color={SKIN} roughness={0.5} /></mesh>
        </group>
      ))}

      <group ref={head} position={[0, 1.62, 0]}>
        <mesh position={[0, -0.24, 0]}><cylinderGeometry args={[0.08, 0.09, 0.14, 12]} /><meshStandardMaterial color="#dda07a" /></mesh>
        <mesh castShadow><sphereGeometry args={[0.32, 32, 24]} /><meshStandardMaterial color={SKIN} roughness={0.5} /></mesh>
        <mesh rotation={[-0.35, 0, 0]} castShadow><sphereGeometry args={[0.338, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.52]} /><meshStandardMaterial color={hair} roughness={0.8} /></mesh>
        {hairStyle === "bun" && <mesh position={[0, 0.3, -0.12]} castShadow><sphereGeometry args={[0.14, 20, 16]} /><meshStandardMaterial color={hair} roughness={0.8} /></mesh>}
        {hairStyle === "long" && <mesh position={[0, -0.22, -0.1]} castShadow><capsuleGeometry args={[0.28, 0.3, 6, 20]} /><meshStandardMaterial color={hair} roughness={0.8} /></mesh>}
        {[-0.11, 0.11].map((x) => (
          <mesh key={x} position={[x, 0.02, 0.29]} scale={[1, 1.25, 0.6]}><sphereGeometry args={[0.042, 12, 10]} /><meshStandardMaterial color="#141016" /></mesh>
        ))}
        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, -0.09, 0.25]} scale={[1, 0.7, 0.4]}><sphereGeometry args={[0.055, 12, 10]} /><meshStandardMaterial color="#f08a7a" transparent opacity={0.55} /></mesh>
        ))}
        <mesh position={[0, -0.1, 0.29]} rotation={[0.25, 0, Math.PI]}><torusGeometry args={[0.07, 0.016, 8, 20, Math.PI]} /><meshStandardMaterial color="#141016" /></mesh>
        {children}
      </group>
    </group>
  );
}

function Designer() {
  const shapes = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    shapes.current.children.forEach((m, i) => {
      m.position.y = [0.25, 0, -0.25][i] + Math.sin(t * 2 + i) * 0.04;
      m.rotation.y = t * (i + 1) * 0.6;
    });
  });
  return (
    <group>
      <group position={[-0.35, 0, 0]}>
        <Person
          shirt={VIOLET} hair="#3b2416" hairStyle="bun"
          animate={(t, p) => {
            p.armR.rotation.z = 1.25 + Math.sin(t * 3) * 0.25;
            p.armR.rotation.x = -0.4;
            p.armL.rotation.z = -0.15;
            p.head.rotation.y = 0.45;
          }}
        />
      </group>
      <group position={[0.75, 0, -0.1]} rotation={[0, -0.45, 0]}>
        {[-0.3, 0.3].map((x) => (
          <mesh key={x} position={[x, 0.7, 0]} rotation={[0, 0, x > 0 ? -0.12 : 0.12]} castShadow><cylinderGeometry args={[0.03, 0.03, 1.5, 8]} /><meshStandardMaterial color="#6b4f37" /></mesh>
        ))}
        <RoundedBox args={[0.95, 1.05, 0.06]} radius={0.03} position={[0, 1.35, 0.06]} castShadow><meshStandardMaterial color="#f5f2ea" roughness={0.9} /></RoundedBox>
        <group ref={shapes} position={[0, 1.35, 0.16]}>
          <mesh position={[-0.2, 0.25, 0]}><sphereGeometry args={[0.13, 24, 16]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.25} /></mesh>
          <mesh position={[0.2, 0, 0]}><boxGeometry args={[0.2, 0.2, 0.2]} /><meshStandardMaterial color={VIOLET} /></mesh>
          <mesh position={[-0.1, -0.25, 0]}><coneGeometry args={[0.13, 0.24, 24]} /><meshStandardMaterial color="#61dafb" /></mesh>
        </group>
      </group>
    </group>
  );
}

function Developer() {
  const panels = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    panels.current.children.forEach((m, i) => { m.position.y = [1.95, 1.65][i] + Math.sin(clock.elapsedTime * 1.4 + i * 2) * 0.08; });
  });
  return (
    <group>
      <group position={[0, 0, -0.45]}>
        <Person
          shirt={DARK} hair="#1d1410" hairStyle="short" legs={false}
          animate={(t, p) => {
            p.armL.rotation.x = -1.05 + Math.sin(t * 14) * 0.08;
            p.armR.rotation.x = -1.05 + Math.sin(t * 14 + 1.6) * 0.08;
            p.armL.rotation.z = 0.25; p.armR.rotation.z = -0.25;
            p.head.rotation.x = 0.18 + Math.sin(t * 4) * 0.04;
          }}
        >
          <mesh position={[0, 0.06, 0]}><torusGeometry args={[0.36, 0.035, 10, 32, Math.PI]} /><meshStandardMaterial color="#15151a" /></mesh>
          {[-0.34, 0.34].map((x) => (
            <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.11, 0.11, 0.1, 20]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.35} /></mesh>
          ))}
        </Person>
      </group>
      <RoundedBox args={[1.7, 0.08, 0.8]} radius={0.03} position={[0, 0.78, 0]} castShadow receiveShadow><meshStandardMaterial color="#2c2c35" /></RoundedBox>
      {[-0.75, 0.75].map((x) => (
        <mesh key={x} position={[x, 0.38, 0]} castShadow><boxGeometry args={[0.06, 0.76, 0.6]} /><meshStandardMaterial color="#202027" /></mesh>
      ))}
      <RoundedBox args={[0.62, 0.03, 0.42]} radius={0.01} position={[0, 0.84, 0.05]}><meshStandardMaterial color="#b9bcc4" metalness={0.6} roughness={0.3} /></RoundedBox>
      <group position={[0, 0.84, 0.26]} rotation={[0.35, 0, 0]}>
        <RoundedBox args={[0.62, 0.42, 0.025]} radius={0.01} position={[0, 0.21, 0]}><meshStandardMaterial color="#d4d6dc" metalness={0.6} roughness={0.25} /></RoundedBox>
        <mesh position={[0, 0.21, 0.015]}><circleGeometry args={[0.06, 24]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.2} /></mesh>
      </group>
      <mesh position={[0.6, 0.92, 0.15]} castShadow><cylinderGeometry args={[0.08, 0.07, 0.18, 20]} /><meshStandardMaterial color={VIOLET} /></mesh>
      <group ref={panels}>
        {[[0.95, 1.95, 0.1, -0.3], [-0.95, 1.65, 0.1, 0.3]].map(([x, y, z, ry], i) => (
          <group key={i} position={[x, y, z]} rotation={[0, ry, 0]}>
            <RoundedBox args={[0.7, 0.48, 0.03]} radius={0.04}><meshStandardMaterial color="#16161c" /></RoundedBox>
            {[0.12, 0.02, -0.08, -0.18].map((ly, k) => (
              <mesh key={k} position={[-0.27 + [0.32, 0.22, 0.4, 0.18][k] / 2 + (k % 2) * 0.06, ly, 0.02]}>
                <planeGeometry args={[[0.32, 0.22, 0.4, 0.18][k], 0.035]} />
                <meshStandardMaterial color={[NEON, "#61dafb", "#a78bfa", NEON][k]} emissive={[NEON, "#61dafb", "#a78bfa", NEON][k]} emissiveIntensity={0.8} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
    </group>
  );
}

function Robot() {
  const bot = useRef<THREE.Group>(null!);
  const armL = useRef<THREE.Group>(null!);
  const armR = useRef<THREE.Group>(null!);
  const eyes = useRef<THREE.Group>(null!);
  const gearA = useRef<THREE.Mesh>(null!);
  const gearB = useRef<THREE.Mesh>(null!);
  const nodes = useRef<THREE.Group>(null!);
  const chest = useRef<THREE.MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    bot.current.position.y = Math.sin(t * 2.2) * 0.05;
    bot.current.rotation.y = Math.sin(t * 0.8) * 0.2;
    armL.current.rotation.z = -0.3 - Math.abs(Math.sin(t * 3)) * 0.8;
    armR.current.rotation.x = -1.2 + Math.sin(t * 2) * 0.15;
    eyes.current.scale.y = t % 3.5 < 0.12 ? 0.1 : 1;
    gearA.current.rotation.z = t * 1.2;
    gearB.current.rotation.z = -t * 1.8;
    nodes.current.children.forEach((m, i) => m.scale.setScalar(1 + Math.max(0, Math.sin(t * 3 - i * 1.2)) * 0.3));
    chest.current.emissiveIntensity = 0.6 + Math.sin(t * 6) * 0.4;
  });
  const metal = <meshStandardMaterial color="#e3e5ec" metalness={0.35} roughness={0.35} />;
  const joint = <meshStandardMaterial color="#b6b9c4" metalness={0.5} roughness={0.35} />;
  const nodePos: [number, number, number][] = [[0.95, 1.9, 0.1], [1.25, 1.35, 0.1], [0.95, 0.8, 0.2]];

  return (
    <group>
      <group ref={bot}>
        {[-0.18, 0.18].map((x) => (
          <mesh key={x} position={[x, 0.28, 0]} castShadow><cylinderGeometry args={[0.1, 0.12, 0.5, 16]} />{joint}</mesh>
        ))}
        <RoundedBox args={[0.78, 0.72, 0.52]} radius={0.14} position={[0, 0.9, 0]} castShadow>{metal}</RoundedBox>
        <RoundedBox args={[0.38, 0.2, 0.05]} radius={0.04} position={[0, 0.95, 0.26]}>
          <meshStandardMaterial ref={chest} color={VIOLET} emissive={VIOLET} emissiveIntensity={0.8} />
        </RoundedBox>
        <group ref={armL} position={[-0.47, 1.12, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow><capsuleGeometry args={[0.08, 0.36, 6, 12]} />{joint}</mesh>
        </group>
        <group ref={armR} position={[0.47, 1.12, 0]}>
          <mesh position={[0, -0.25, 0]} castShadow><capsuleGeometry args={[0.08, 0.36, 6, 12]} />{joint}</mesh>
        </group>
        <mesh position={[0, 1.32, 0]}><cylinderGeometry args={[0.1, 0.12, 0.12, 16]} />{joint}</mesh>
        <RoundedBox args={[0.72, 0.52, 0.52]} radius={0.16} position={[0, 1.62, 0]} castShadow>{metal}</RoundedBox>
        <RoundedBox args={[0.54, 0.26, 0.05]} radius={0.11} position={[0, 1.62, 0.25]}><meshStandardMaterial color="#121216" roughness={0.2} /></RoundedBox>
        <group ref={eyes} position={[0, 1.62, 0.28]}>
          {[-0.12, 0.12].map((x) => (
            <mesh key={x} position={[x, 0, 0]}><sphereGeometry args={[0.055, 16, 12]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2} /></mesh>
          ))}
        </group>
        <mesh position={[0, 1.98, 0]}><cylinderGeometry args={[0.02, 0.02, 0.22, 8]} />{joint}</mesh>
        <mesh position={[0, 2.12, 0]}><sphereGeometry args={[0.07, 16, 12]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={2} /></mesh>
      </group>
      <mesh ref={gearA} position={[-0.95, 1.7, -0.1]}><torusGeometry args={[0.24, 0.08, 6, 12]} /><meshStandardMaterial color="#5a5a66" metalness={0.6} roughness={0.3} flatShading /></mesh>
      <mesh ref={gearB} position={[-0.68, 1.35, -0.1]}><torusGeometry args={[0.14, 0.06, 6, 9]} /><meshStandardMaterial color={VIOLET} metalness={0.4} roughness={0.3} flatShading /></mesh>
      <Line points={[[0.55, 1.0, 0.3], ...nodePos]} color={NEON} lineWidth={2} dashed dashSize={0.06} gapSize={0.05} transparent opacity={0.7} />
      <group ref={nodes}>
        {nodePos.map((p, i) => (
          <RoundedBox key={i} args={[0.2, 0.2, 0.2]} radius={0.05} position={p}>
            <meshStandardMaterial color={i === 2 ? NEON : "#1d1d24"} emissive={i === 2 ? NEON : "#a78bfa"} emissiveIntensity={i === 2 ? 0.8 : 0.25} />
          </RoundedBox>
        ))}
      </group>
    </group>
  );
}

function Marketer() {
  const bars = useRef<THREE.Group>(null!);
  const likes = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    bars.current.children.forEach((m, i) => {
      const h = [0.45, 0.75, 1.15][i] * (0.75 + Math.sin(t * 1.6 + i * 0.5) * 0.25);
      m.scale.y = h; m.position.y = h / 2;
    });
    likes.current.children.forEach((m, i) => {
      const k = (t * 0.5 + i / 3) % 1;
      m.position.set(0.55 + Math.sin(k * 6 + i) * 0.15, 2.0 + k * 1.1, 0.3);
      m.scale.setScalar(Math.sin(k * Math.PI) * 0.09);
    });
  });
  return (
    <group>
      <group position={[-0.3, 0, 0]}>
        <Person
          shirt="#f1ebdf" hair="#4a2c1d" hairStyle="long"
          animate={(t, p) => {
            p.armR.rotation.z = 2.3 + Math.sin(t * 2.4) * 0.12;
            p.armL.rotation.z = -0.2 + Math.sin(t * 1.5) * 0.08;
            p.head.rotation.y = 0.25;
          }}
        />
        <group position={[0.68, 1.68, 0]} rotation={[0, 0, -0.7]}>
          <mesh><coneGeometry args={[0.17, 0.42, 24, 1, true]} /><meshStandardMaterial color={VIOLET} side={THREE.DoubleSide} /></mesh>
          <mesh position={[0, 0.21, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.17, 0.02, 8, 24]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.6} /></mesh>
        </group>
      </group>
      <group ref={likes}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}><sphereGeometry args={[1, 16, 12]} /><meshStandardMaterial color={i === 1 ? NEON : "#f472b6"} emissive={i === 1 ? NEON : "#f472b6"} emissiveIntensity={0.6} /></mesh>
        ))}
      </group>
      <group ref={bars} position={[0.85, 0, 0]}>
        {["#a78bfa", VIOLET, NEON].map((c, i) => (
          <mesh key={c} position={[(i - 1) * 0.26, 0, 0]} castShadow>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={c === NEON ? 0.4 : 0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Bulb() {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ref.current.rotation.y = t * 0.6;
    ref.current.position.y = 3.1 + Math.sin(t * 1.4) * 0.12;
  });
  const glass = <meshPhysicalMaterial color="#7c3aed" emissive="#5b21b6" emissiveIntensity={0.55} roughness={0.08} metalness={0.1} clearcoat={1} clearcoatRoughness={0.05} />;
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, Math.PI * 1.7]}><torusGeometry args={[0.52, 0.15, 32, 80, Math.PI * 1.6]} />{glass}</mesh>
      <mesh position={[0, -0.76, 0]}><sphereGeometry args={[0.2, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={0.9} side={THREE.DoubleSide} /></mesh>
      <pointLight color="#9f7aea" intensity={6} distance={6} />
    </group>
  );
}

function Warmup() {
  const { gl, scene, camera, advance } = useThree();
  useEffect(() => {
    gl.compile(scene, camera);
    advance(performance.now());
  }, [gl, scene, camera, advance]);
  return null;
}

const STATIONS = [Designer, Developer, Robot, Marketer];

function Stage({ active, pointer }: { active: number; pointer: { current: { x: number; y: number } } }) {
  const turn = useRef<THREE.Group>(null!);
  const { camera, size } = useThree();
  const target = -active * (Math.PI / 2);
  const camGoal = useRef(new THREE.Vector3()).current;
  useFrame((_, dt) => {
    const goal = target + pointer.current.x * 0.35;
    let diff = goal - turn.current.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    turn.current.rotation.y += diff * Math.min(1, dt * 3);
    const far = size.width < 640 ? 11 : 9;
    camera.position.lerp(camGoal.set(pointer.current.x * 0.8, 3.1 - pointer.current.y * 0.6, far), Math.min(1, dt * 2));
    camera.lookAt(0, 1.45, 0);
  });

  return (
    <>
      <group ref={turn}>
        <mesh position={[0, -0.12, 0]} receiveShadow><cylinderGeometry args={[3.7, 3.5, 0.24, 64]} /><meshStandardMaterial color="#15151b" roughness={0.6} /></mesh>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}><torusGeometry args={[3.68, 0.025, 8, 96]} /><meshStandardMaterial color={NEON} emissive={NEON} emissiveIntensity={1.4} /></mesh>
        <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.6, 0.66, 64]} /><meshStandardMaterial color={VIOLET} emissive={VIOLET} emissiveIntensity={1} /></mesh>
        {STATIONS.map((S, i) => {
          const a = i * (Math.PI / 2);
          return (
            <group key={i} position={[Math.sin(a) * R, 0, Math.cos(a) * R]} rotation={[0, a, 0]}>
              <S />
            </group>
          );
        })}
        <ContactShadows frames={1} position={[0, 0.01, 0]} scale={8} blur={2.4} opacity={0.55} far={3} resolution={512} />
      </group>
      <Bulb />
    </>
  );
}

export default function Studio({ active, running, pointer }: { active: number; running: boolean; pointer: { current: { x: number; y: number } } }) {
  const compact = typeof window !== "undefined" && window.innerWidth < 768;
  return (
    <Canvas
      frameloop={running ? "always" : "never"}
      dpr={compact ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 3.1, 9], fov: 34 }}
      gl={{ antialias: !compact, alpha: true, powerPreference: compact ? "low-power" : "default" }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.ACESFilmicToneMapping; }}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ffffff", "#2a1858", 0.6]} />
      <directionalLight position={[3, 6, 5]} intensity={1.6} />
      <pointLight position={[-4, 2, 3]} color={VIOLET} intensity={18} distance={12} />
      <pointLight position={[4, 1.5, 3]} color={NEON} intensity={6} distance={10} />
      <Stage active={active} pointer={pointer} />
      <Warmup />
    </Canvas>
  );
}
