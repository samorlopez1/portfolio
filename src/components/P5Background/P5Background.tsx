'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

// ============================================================
// CONSTANTS
// ============================================================
const CELL_SIZE = 24;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 255;
const PROB_OF_NEIGHBOR = 0.3;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1.2;
const RANDOM_RADIUS = 10;
const CIRCLE_RADIUS = 1;
const CIRCLE_RADIUS_HOVER = 1;  // enlarged size when nearest to cursor
const HOVER_LERP_SPEED = 0.1;  // 0–1: how snappily dots grow/shrink
const GRID_DOT_ALPHA = 110;
const MAX_VELOCITY = 150;        // px/frame at which color is fully red

// Momentum / wave constants
const MOMENTUM_DECAY = 0.92;    // how slowly the inertia fades (0–1, higher = longer wave)
const MOMENTUM_THRESHOLD = 0.8; // minimum momentum magnitude to still spawn neighbors
const WAVE_PROB_SCALE = 0.85;   // neighbor probability multiplier during momentum wave (softer)
const WAVE_ALPHA_SCALE = 0.75;  // opacity multiplier during momentum wave (dimmer)
const DIRECTIONAL_BIAS = 3.5;   // how strongly neighbors skew in the movement direction
const MOMENTUM_GAIN = 1.4;      // multiplier on raw velocity fed into momentum

// OKLab palette stops: dark grey → blue → pink
const PALETTE = [
    { r: 185, g: 185, b: 185 }, // lgrey (t = 0.00, slow)
    { r: 140, g: 140, b: 140 }, // dgrey (t = 0.00, slow)
    { r: 7, g: 0, b: 220 }, // blue (t = 0.50)
    { r: 255, g: 0, b: 178 }, // pink (t = 1.00, fast)
];

interface P5BackgroundProps {
    setSweepCallback?: (callback: (x: number, y: number) => void) => void;
}

export function P5Background({ setSweepCallback }: P5BackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<p5 | null>(null);
    const sweepPosRef = useRef<{ x: number; y: number } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (p: p5) => {
            // ============================================================
            // VARIABLES
            // ============================================================
            let numRows: number;
            let numCols: number;
            let currentRow = -1;
            let currentCol = -1;
            let allNeighbors: Array<{ row: number; col: number; opacity: number; c: p5.Color }> = [];
            let mouseVel = 0;
            let paletteOklab: Array<{ L: number; a: number; b: number }> = [];
            let gridDots: Array<Array<{ radius: number }>> = [];

            // Momentum vector — persists and decays after mouse stops
            let momentumX = 0;
            let momentumY = 0;
            // ============================================================
            // P5 LIFECYCLE
            // ============================================================
            p.setup = () => {
                const cnv = p.createCanvas(window.innerWidth, window.innerHeight);
                cnv.style('position', 'absolute');
                cnv.style('inset', '0');
                cnv.style('z-index', '-1');

                p.noFill();
                p.strokeWeight(STROKE_WEIGHT);

                numRows = Math.ceil(window.innerHeight / CELL_SIZE);
                numCols = Math.ceil(window.innerWidth / CELL_SIZE);

                // Pre-convert palette to OKLab once
                paletteOklab = PALETTE.map((c) => rgbToOklab(c.r, c.g, c.b));
                initGridDots();
            };

            p.draw = () => {
                p.background(BACKGROUND_COLOR);

                // Use sweep position if available, otherwise use real mouse
                const currentX = sweepPosRef.current?.x ?? p.mouseX;
                const currentY = sweepPosRef.current?.y ?? p.mouseY;
                const prevX = sweepPosRef.current ? (sweepPosRef.current.x - (p.deltaTime / 16.67) * 2) : p.pmouseX; // rough estimate for smooth sweep
                const prevY = sweepPosRef.current?.y ?? p.pmouseY;

                // Raw frame velocity vector
                const rawVX = currentX - prevX;
                const rawVY = currentY - prevY;
                mouseVel = Math.sqrt(rawVX * rawVX + rawVY * rawVY);

                // Accumulate momentum from real movement, always decay afterward
                momentumX = momentumX * MOMENTUM_DECAY + rawVX * MOMENTUM_GAIN;
                momentumY = momentumY * MOMENTUM_DECAY + rawVY * MOMENTUM_GAIN;

                const momentumMag = Math.sqrt(momentumX * momentumX + momentumY * momentumY);

                // Normalised direction (used for directional neighbor bias)
                const dirX = momentumMag > 0 ? momentumX / momentumMag : 0;
                const dirY = momentumMag > 0 ? momentumY / momentumMag : 0;

                // ── Grid dots with hover enlargement ──────────────────────
                const nearestCol = Math.round(currentX / CELL_SIZE);
                const nearestRow = Math.round(currentY / CELL_SIZE);

                for (let col = 0; col <= numCols; col++) {
                    for (let row = 0; row <= numRows; row++) {
                        const dot = gridDots[col][row];
                        const isNearest = col === nearestCol && row === nearestRow;
                        const targetRadius = isNearest ? CIRCLE_RADIUS_HOVER : CIRCLE_RADIUS;
                        dot.radius = p.lerp(dot.radius, targetRadius, HOVER_LERP_SPEED);

                        p.stroke(185, 185, 185, GRID_DOT_ALPHA);
                        p.circle(col * CELL_SIZE, row * CELL_SIZE, dot.radius);
                    }
                }

                // ── Spawn neighbors when cell changes ─────────────────────
                const row = Math.floor(currentY / CELL_SIZE);
                const col = Math.floor(currentX / CELL_SIZE);

                if (row !== currentRow || col !== currentCol) {
                    currentRow = row;
                    currentCol = col;

                    allNeighbors.push({
                        row,
                        col,
                        opacity: STARTING_ALPHA,
                        c: getSpeedColor(STARTING_ALPHA),
                    });

                    allNeighbors.push(...getDirectionalNeighbors(row, col, dirX, dirY, 1.0));
                }

                // ── Wave: always fire from ghost position while momentum lives ──
                // Runs every frame independently of cell changes so the afterglow
                // keeps travelling forward even after the cursor stops.
                if (momentumMag > MOMENTUM_THRESHOLD) {
                    const strength = p.constrain(momentumMag / (MAX_VELOCITY * MOMENTUM_GAIN), 0, 1);

                    // Ghost position: where the momentum would carry us
                    const ghostX = currentX + momentumX * 0.5;
                    const ghostY = currentY + momentumY * 0.5;
                    const ghostRow = Math.floor(ghostY / CELL_SIZE);
                    const ghostCol = Math.floor(ghostX / CELL_SIZE);

                    if (
                        ghostRow >= 0 && ghostRow < numRows &&
                        ghostCol >= 0 && ghostCol < numCols
                    ) {
                        allNeighbors.push(
                            ...getDirectionalNeighbors(
                                ghostRow,
                                ghostCol,
                                dirX,
                                dirY,
                                strength * WAVE_ALPHA_SCALE,
                                WAVE_PROB_SCALE
                            )
                        );
                    }
                }

                // ── Draw & fade active neighbors ──────────────────────────
                for (let neighbor of allNeighbors) {
                    neighbor.opacity = Math.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
                    p.stroke(p.red(neighbor.c), p.green(neighbor.c), p.blue(neighbor.c), neighbor.opacity);
                    p.circle(neighbor.col * CELL_SIZE, neighbor.row * CELL_SIZE, CIRCLE_RADIUS);
                }

                allNeighbors = allNeighbors.filter((n) => n.opacity > 0);
            };

            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
                numRows = Math.ceil(window.innerHeight / CELL_SIZE);
                numCols = Math.ceil(window.innerWidth / CELL_SIZE);
                initGridDots();
            };

            // ============================================================
            // GRID DOT STATE
            // ============================================================
            const initGridDots = () => {
                gridDots = [];
                for (let col = 0; col <= numCols; col++) {
                    gridDots[col] = [];
                    for (let row = 0; row <= numRows; row++) {
                        gridDots[col][row] = { radius: CIRCLE_RADIUS };
                    }
                }
            };

            // ============================================================
            // NEIGHBOR LOGIC
            // ============================================================
            // Spawns neighbors biased toward (dirX, dirY).
            // alphaScale and probScale let the wave effect be softer than real movement.
            const getDirectionalNeighbors = (
                row: number,
                col: number,
                dirX: number,
                dirY: number,
                alphaScale: number = 1.0,
                probScale: number = 1.0
            ) => {
                const neighbors: Array<{ row: number; col: number; opacity: number; c: p5.Color }> = [];

                for (let dRow = -RANDOM_RADIUS; dRow <= RANDOM_RADIUS; dRow++) {
                    for (let dCol = -RANDOM_RADIUS; dCol <= RANDOM_RADIUS; dCol++) {
                        if (dRow === 0 && dCol === 0) continue;

                        const neighborRow = row + dRow;
                        const neighborCol = col + dCol;

                        const isInBounds =
                            neighborRow >= 0 &&
                            neighborRow < numRows &&
                            neighborCol >= 0 &&
                            neighborCol < numCols;

                        if (!isInBounds) continue;

                        // Dot product of this neighbor's direction vs movement direction.
                        // Ranges -1 (dead opposite) to +1 (straight ahead).
                        const len = Math.sqrt(dCol * dCol + dRow * dRow);
                        const dot = len > 0 ? (dCol * dirX + dRow * dirY) / len : 0;

                        // Bias: ahead of movement direction gets full prob, behind gets much less.
                        // map dot [-1, 1] → [1/DIRECTIONAL_BIAS, DIRECTIONAL_BIAS], then normalise.
                        const biasFactor = p.map(dot, -1, 1, 1 / DIRECTIONAL_BIAS, DIRECTIONAL_BIAS);
                        const prob = PROB_OF_NEIGHBOR * biasFactor * probScale;

                        if (Math.random() < prob) {
                            const alphaFactor = getAlphaFactor(neighborRow, neighborCol, row, col);
                            const opacity = STARTING_ALPHA * alphaFactor * alphaScale;
                            neighbors.push({
                                row: neighborRow,
                                col: neighborCol,
                                opacity,
                                c: getSpeedColor(opacity),
                            });
                        }
                    }
                }

                return neighbors;
            };

            // Maps distance from center to an alpha factor [0, 1]
            const getAlphaFactor = (x1: number, y1: number, x2: number, y2: number) => {
                const d = p.dist(x1, y1, x2, y2);
                return p.map(d, 0, RANDOM_RADIUS, 1, 0);
            };

            // ============================================================
            // COLOR — OKLab multi-stop velocity palette
            // ============================================================

            // Returns a p5 color lerped across the palette based on mouse velocity
            const getSpeedColor = (opacity: number) => {
                let t = p.constrain(p.map(mouseVel, 0, MAX_VELOCITY, 0, 1), 0, 1);

                const segments = paletteOklab.length - 1;
                const scaled = t * segments;
                const idx = Math.min(Math.floor(scaled), segments - 1);
                const segT = scaled - idx;

                const lab = lerpOklab(paletteOklab[idx], paletteOklab[idx + 1], segT);
                const { r, g, b } = oklabToRgb(lab.L, lab.a, lab.b);
                return p.color(r, g, b, opacity);
            };

            // Linearly interpolate between two OKLab colors
            const lerpOklab = (c1: { L: number; a: number; b: number }, c2: { L: number; a: number; b: number }, t: number) => {
                return {
                    L: p.lerp(c1.L, c2.L, t),
                    a: p.lerp(c1.a, c2.a, t),
                    b: p.lerp(c1.b, c2.b, t),
                };
            };

            // Convert sRGB [0–255] to OKLab
            const rgbToOklab = (r: number, g: number, b: number) => {
                // Normalize and linearize (gamma decode)
                r = r / 255;
                g = g / 255;
                b = b / 255;
                r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
                g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
                b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

                // To LMS
                const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
                const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
                const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

                const l_cbrt = Math.cbrt(l);
                const m_cbrt = Math.cbrt(m);
                const s_cbrt = Math.cbrt(s);

                return {
                    L: 0.2104542553 * l_cbrt + 0.7936177850 * m_cbrt - 0.0040720468 * s_cbrt,
                    a: 1.9779984951 * l_cbrt - 2.4285922050 * m_cbrt + 0.4505937099 * s_cbrt,
                    b: 0.0259040371 * l_cbrt + 0.7827717662 * m_cbrt - 0.8086757660 * s_cbrt,
                };
            };

            // Convert OKLab back to sRGB [0–255]
            const oklabToRgb = (L: number, a: number, b: number) => {
                let l = L + 0.3963377774 * a + 0.2158037573 * b;
                let m = L - 0.1055613458 * a - 0.0638541728 * b;
                let s = L - 0.0894841775 * a - 1.2914855480 * b;

                l = l * l * l;
                m = m * m * m;
                s = s * s * s;

                const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
                const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
                const bv = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

                // Gamma encode and clamp to [0, 255]
                const encode = (x: number) => {
                    x = x > 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x;
                    return p.constrain(Math.round(x * 255), 0, 255);
                };

                return { r: encode(r), g: encode(g), b: encode(bv) };
            };
        };

        sketchRef.current = new p5(sketch, containerRef.current);

        // Register sweep callback
        if (setSweepCallback) {
            setSweepCallback((x: number, y: number) => {
                sweepPosRef.current = { x, y };
            });
        }

        return () => {
            sketchRef.current?.remove();
            sweepPosRef.current = null;
        };
    }, [setSweepCallback]);

    return <div ref={containerRef} className="p5-background" />;
}
