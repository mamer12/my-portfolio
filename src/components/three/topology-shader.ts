/**
 * GLSL for the hero topology mesh.
 *
 * Drawn as `THREE.LineSegments`, not points. The previous point-cloud version
 * rendered as loose specks with no legible structure — it read as dust on the
 * screen rather than as a network. Connecting the grid nodes with edges is what
 * makes the shape readable: you can see the surface, the wave deforming it, and
 * the packet sweeping across it.
 *
 * WebGL caps line width at 1px on virtually every platform, which suits the
 * hairline vocabulary of the rest of the page.
 */

/** Ashima simplex noise — public domain, unchanged apart from formatting. */
const SIMPLEX_3D = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`;

export const topologyVertexShader = /* glsl */ `
${SIMPLEX_3D}

uniform float uTime;
uniform vec2  uPointer;
uniform float uScroll;
uniform float uSpan;    // half-width of the grid, for the packet sweep range

varying float vEnergy;
varying float vFade;
varying float vElev;

void main() {
  vec3 pos = position;

  // Slow structural swell plus a finer ridge, so the surface reads as a
  // deforming mesh rather than a single rolling sine.
  float swell = snoise(vec3(pos.xy * 0.13, uTime * 0.085));
  float ridge = snoise(vec3(pos.xy * 0.40 + 11.0, uTime * 0.19));
  float detail = snoise(vec3(pos.xy * 1.05 + 37.0, uTime * 0.30));
  float wave = swell * 2.5 + ridge * 0.65 + detail * 0.20;

  // Pointer lifts the surface locally, with a tight falloff and a slow ring
  // breathing outward from the cursor position.
  float pointerDist = distance(pos.xy, uPointer);
  float ripple = exp(-pointerDist * 0.30) * 2.2;
  float ring =
    sin(pointerDist * 1.5 - uTime * 2.6) * exp(-pointerDist * 0.26) * 0.4;

  pos.z += wave + ripple + ring;
  pos.z -= uScroll * 6.0;

  // A packet of light sweeping left to right — the event-pipeline read.
  float head = mod(uTime * 3.0, uSpan * 2.6) - uSpan * 1.3;
  float packet = exp(-pow(pos.x - head, 2.0) * 0.05);
  float headB = uSpan * 1.3 - mod(uTime * 1.6 + uSpan * 0.7, uSpan * 2.6);
  float packetB = exp(-pow(pos.x - headB, 2.0) * 0.09) * 0.5;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;

  vElev = wave * 0.24 + 0.5;
  vEnergy = clamp(
    smoothstep(0.35, 2.3, wave + ripple) * 0.85 + packet * 0.95 + packetB * 0.6 + ring * 0.6,
    0.0, 1.0);

  // Dissolve both the far edge and anything that comes too close to the lens,
  // so the mesh has no hard boundary in either direction.
  float depth = -mvPosition.z;
  vFade = (1.0 - smoothstep(13.0, 38.0, depth)) * smoothstep(1.5, 8.0, depth);
}
`;

export const topologyFragmentShader = /* glsl */ `
precision mediump float;

uniform vec3 uColorBase;
uniform vec3 uColorSignal;
uniform float uOpacity;

varying float vEnergy;
varying float vFade;
varying float vElev;

void main() {
  vec3 color = mix(uColorBase, uColorSignal, vEnergy);
  // Hottest edges blow toward white, which gives luminance without a bloom pass.
  color = mix(color, vec3(1.0), pow(vEnergy, 3.0) * 0.55);

  // Topographic banding: edges near an elevation crossing pick up a faint
  // signal tint, reading as contour lines drawn over the surface.
  float f = fract(vElev * 5.0);
  float band = smoothstep(0.10, 0.0, min(f, 1.0 - f));
  color = mix(color, uColorSignal, band * 0.30);

  float alpha = vFade * uOpacity * (0.13 + vEnergy * 0.85 + band * 0.16);
  if (alpha < 0.004) discard;

  gl_FragColor = vec4(color, alpha);
}
`;

/**
 * GLSL for the dust layer that floats above the topology mesh.
 *
 * The mesh alone reads as a surface, but the space above it felt empty. A
 * sparse field of soft, additively blended motes gives the camera something to
 * parallax against, which is what sells the scene as a volume rather than a
 * flat animated texture.
 *
 * Particles drift slowly along the plane's receding (Y) axis and wrap inside a
 * fixed band, so the field never thins out or needs respawning on the CPU.
 * Each mote carries a seed attribute that drives its size, drift speed, and
 * twinkle phase, keeping the motion decorrelated without any per-frame work
 * outside the vertex shader. The fragment stage is just a soft radial falloff;
 * point sprites have no geometry to shade, so the glow is faked in alpha.
 */
export const particlesVertexShader = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uOpacity;

attribute float aSeed;

varying float vAlpha;

void main() {
  vec3 pos = position;
  // Slow drift along the plane's receding axis, wrapped in a 14-unit band.
  float cycle = 14.0;
  pos.y = mod(position.y + uTime * (0.22 + aSeed * 0.5), cycle) - cycle * 0.5;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uPixelRatio * (1.4 + aSeed * 2.6) * (26.0 / -mvPosition.z);

  float twinkle = 0.55 + 0.45 * sin(uTime * (0.8 + aSeed * 2.2) + aSeed * 41.0);
  vAlpha = uOpacity * twinkle;
}
`;

export const particlesFragmentShader = /* glsl */ `
precision mediump float;

uniform vec3 uColorSignal;

varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.06, d);
  gl_FragColor = vec4(uColorSignal, soft * vAlpha * 0.45);
}
`;
