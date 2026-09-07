// Inlined GLSL — copied from src/shaders/*.glsl.
// Kept as plain JS string exports (instead of the vite-plugin-glsl `?raw`
// style import used in this demo) so the component drops into any bundler
// (Next.js/Webpack, CRA, plain Vite, etc.) with zero extra config.

export const vertexShader = /* glsl */ `
out vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`

export const fragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uTexture;
uniform sampler2D uAtlas;
uniform sampler2D uTrailMap;
uniform vec2      uResolution;
uniform vec2      uTexRatio;
uniform bool      uHasImage;
uniform vec3      uBgColor;

in  vec2 vUv;
out vec4 fragColor;

const float TILE = 16.0;  // fixed halftone grid size
const vec3  INK_COLOR  = vec3(0.95, 0.95, 0.95); // #f2f2f2— solid ink, independent of video colour
const vec3  DARK_COLOR = vec3(0.850, 0.850, 0.850); // #a1a1a1 — target color for darkened ink
const float RARITY     = 0.85; // scales down selection odds so fewer cells darken overall

// Cheap 2D hash -> pseudo-random 0..1, stable per grid cell.
float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

// Self-contained halftone at a single, consistent tile size.
// No per-fragment size variation -> no warping.
// Alpha channel carries the ink mask (0 = background, 1 = solid ink) so the
// caller can tell ink from background apart.
vec4 halftone(vec2 screenPx, float tileSize) {
  vec2 idx        = floor(screenPx / tileSize);
  vec2 tileUv     = fract(screenPx / tileSize);
  vec2 centreUv   = (idx + 0.5) / (uResolution / tileSize);
  vec2 texUv      = (centreUv - 0.5) * uTexRatio + 0.5;

  if (texUv.x < 0.0 || texUv.x > 1.0 || texUv.y < 0.0 || texUv.y > 1.0)
    return vec4(uBgColor, 0.0);

  vec4  c        = textureLod(uTexture, texUv, 0.0);
  // Boost saturation to widen the luminance range, giving more variation
  // between small and large halftone shapes.
  const float SAT = 2.5;
  float gray     = dot(c.rgb, vec3(0.299, 0.587, 0.114));
  vec3  boosted  = mix(vec3(gray), c.rgb, SAT);
  float lum      = dot(clamp(boosted, 0.0, 1.0), vec3(0.299, 0.587, 0.114));
  float shapeIdx = clamp(floor((1.0 - lum) * 6.0), 0.0, 5.0);
  vec2  atlasUv  = vec2((shapeIdx + tileUv.x) / 6.0, tileUv.y);
  float inkMask  = 1.0 - smoothstep(0.85, 0.96, texture(uAtlas, atlasUv).r);

  return vec4(mix(uBgColor, INK_COLOR, inkMask), inkMask);
}

void main() {
  if (!uHasImage) {
    fragColor = vec4(1.0, 1.0, 1.0, 1.0);
    return;
  }

  vec2 px   = vUv * uResolution;
  vec4 base = halftone(px, TILE);

  // Sample the cursor-trail map once per halftone cell (using the same grid
  // as the halftone itself) instead of per-fragment. That collapses the
  // smooth radial falloff baked into the trail buffer down to one flat value
  // per cell, so the darkening reads as a chunky, pixel-grid-bound circle
  // rather than a smooth/HD circle — same trick as the halftone dithering.
  vec2  cellIdx   = floor(px / TILE);
  vec2  cellUv    = (cellIdx + 0.5) / (uResolution / TILE);
  float influence = texture(uTrailMap, cellUv).r;

  // Only a random subset of cells within the influence radius actually get
  // darkened — not every one — so the trail reads as scattered darkened
  // pixels rather than a uniform tint. Each cell rolls a stable pseudo-random
  // number against influence*RARITY, so selection gets rarer the further a
  // cell is from the cursor (and rarer overall thanks to RARITY). Only the
  // ink (base.a) is ever darkened, never the background.
  float roll       = hash21(cellIdx);
  float darkenMask = step(roll, influence * RARITY) * base.a;

  // Selected cells mix towards DARK_COLOR by influence itself, so cells at
  // the cursor's centre (influence ~1) land on the full target color while
  // cells nearer the outer edge of the circle (influence -> 0) fade back
  // towards the original ink — a real edge -> circle -> centre gradient on
  // top of the sparser random selection further out.
  fragColor = vec4(mix(base.rgb, DARK_COLOR, influence * darkenMask), 1.0);
}
`

export const trailFragmentShader = /* glsl */ `
precision highp float;

uniform sampler2D uPrev;
uniform vec2      uMousePos;      // canvas CSS pixels, Y-up (flipped)
uniform vec2      uResolution;    // canvas CSS pixel size
uniform float     uDeltaTime;
uniform float     uRadius;        // px — shrinks in stepped increments as the cursor idles
uniform bool      uMouseOnCanvas;

in  vec2 vUv;
out vec4 fragColor;

const float TRAIL_DURATION = 1.5;

void main() {
  float prev = texture(uPrev, vUv).r;

  // Linear decay over TRAIL_DURATION seconds — always runs, even while the
  // cursor sits still on the canvas, so a stationary cursor fades away.
  float decayed = max(0.0, prev - uDeltaTime / TRAIL_DURATION);

  // Radial splash — a circle centred on the cursor, full intensity at the
  // centre fading out to 0 at uRadius. The fragment shader re-samples this
  // once per halftone cell, so the smooth falloff computed here ends up
  // quantized into a chunky, grid-bound pixel circle rather than a smooth
  // HD circle. Radius shrinks in stepped increments as the cursor idles,
  // hitting 0 (no splash) once fully idle.
  float splash = 0.0;
  if (uMouseOnCanvas && uRadius > 0.0) {
    vec2 screenPos = vUv * uResolution;
    float dist = length(screenPos - uMousePos);
    splash = 1.0 - smoothstep(0.0, uRadius, dist);
  }

  fragColor = vec4(max(decayed, splash), 0.0, 0.0, 1.0);
}
`
