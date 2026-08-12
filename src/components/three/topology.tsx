"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  particlesFragmentShader,
  particlesVertexShader,
  topologyFragmentShader,
  topologyVertexShader,
} from "./topology-shader";

/** Grid extents in world units. */
const SPAN_X = 30;
const SPAN_Y = 22;

interface MeshProps {
  /** Grid resolution along X. Rows scale to keep cells roughly square. */
  cols: number;
  scrollRef: React.RefObject<number>;
}

function TopologyMesh({ cols, scrollRef }: MeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const particleMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const smoothed = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const rows = Math.max(4, Math.round(cols * (SPAN_Y / SPAN_X)));
    const at = (ix: number, iy: number): [number, number] => [
      (ix / (cols - 1) - 0.5) * SPAN_X,
      (iy / (rows - 1) - 0.5) * SPAN_Y,
    ];

    // Two segments per node (one right, one up), skipping the far edges. This
    // is the whole point of the rewrite: connected edges, not isolated points.
    const vertices: number[] = [];
    for (let iy = 0; iy < rows; iy += 1) {
      for (let ix = 0; ix < cols; ix += 1) {
        const [x, y] = at(ix, iy);
        if (ix < cols - 1) {
          const [x2, y2] = at(ix + 1, iy);
          vertices.push(x, y, 0, x2, y2, 0);
        }
        if (iy < rows - 1) {
          const [x3, y3] = at(ix, iy + 1);
          vertices.push(x, y, 0, x3, y3, 0);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3),
    );
    return geo;
  }, [cols]);

  // Dust scattered in plane coordinates and lifted just above the surface.
  // The vertex shader wraps their drift along the plane's receding axis, so
  // these positions are only ever seeds and are never touched again on the
  // CPU. The count scales down with the grid so the layers stay balanced.
  const particleGeometry = useMemo(() => {
    const count = cols >= 46 ? 140 : 90;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() * 2 - 1) * 14;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 7;
      positions[i * 3 + 2] = 2.5 + Math.random() * 6.5;
      seeds[i] = Math.random();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [cols]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uSpan: { value: SPAN_X * 0.5 },
      uOpacity: { value: 1 },
      uColorBase: { value: new THREE.Color("#33456e") },
      uColorSignal: { value: new THREE.Color("#67e8f9") },
    }),
    [],
  );

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: 1 },
      uOpacity: { value: 1 },
      uColorSignal: { value: new THREE.Color("#a78bfa") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    const particleMaterial = particleMaterialRef.current;
    const group = groupRef.current;
    if (!material || !particleMaterial || !group) return;

    // Clamp so a backgrounded tab does not resume with one huge time jump.
    const dt = Math.min(delta, 0.05);
    material.uniforms.uTime.value += dt;
    const t = material.uniforms.uTime.value;

    pointer.current.set(
      state.pointer.x * (SPAN_X * 0.45),
      state.pointer.y * (SPAN_Y * 0.45),
    );
    smoothed.current.lerp(pointer.current, 1 - Math.pow(0.002, dt));
    material.uniforms.uPointer.value.copy(smoothed.current);

    const progress = scrollRef.current ?? 0;
    material.uniforms.uScroll.value = progress;
    material.uniforms.uOpacity.value = 1 - progress * 0.9;

    // The group owns all rotation so the mesh and its dust tilt and parallax
    // as one instrument; rotating either layer alone would shear them apart.
    // The base X tilt keeps the mesh edge-on so it reads as a receding
    // surface, and it steepens with scroll, which makes the exit feel authored.
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      state.pointer.x * 0.16,
      3,
      dt,
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -0.92 - progress * 0.35 - state.pointer.y * 0.07,
      3,
      dt,
    );
    group.rotation.z = Math.sin(t * 0.05) * 0.06;

    // Dust shares the mesh clock so both layers stay in sync, and fades a
    // touch faster on scroll so the mesh remains the hero.
    particleMaterial.uniforms.uTime.value = t;
    particleMaterial.uniforms.uOpacity.value = (1 - progress * 0.9) * 0.8;
    particleMaterial.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
  });

  // Pull the mesh in on narrow canvases so it still fills the frame.
  const scale = viewport.width < 7 ? 0.72 : viewport.width < 10 ? 0.85 : 1;

  return (
    <group ref={groupRef} scale={scale}>
      <lineSegments geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={topologyVertexShader}
          fragmentShader={topologyFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points geometry={particleGeometry} frustumCulled={false}>
        <shaderMaterial
          ref={particleMaterialRef}
          uniforms={particleUniforms}
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

interface TopologyProps {
  scrollRef: React.RefObject<number>;
  cols?: number;
  className?: string;
}

/**
 * The hero's WebGL layer. Mounted only by `HeroVisual`, which decides whether
 * the device should get it at all.
 *
 * `dpr` is capped at 1.75 — line rendering benefits from some supersampling
 * (aliasing on 1px diagonals is very visible), but beyond that it is wasted.
 */
export default function Topology({
  scrollRef,
  cols = 46,
  className,
}: TopologyProps) {
  return (
    <Canvas
      className={className}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 1.5, 19], fov: 44, near: 0.1, far: 80 }}
    >
      <TopologyMesh cols={cols} scrollRef={scrollRef} />
    </Canvas>
  );
}
