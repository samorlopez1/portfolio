'use client';

import { useEffect, useRef } from 'react';

// Eagerly start loading p5 at module level so the fetch begins
// as soon as this chunk is parsed, not after React mounts.
const p5Promise = import('p5');

// ============================================================
// CONSTANTS
// ============================================================
const CELL_SIZE = 25;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 255;
const PROB_OF_NEIGHBOR = 0.3;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;
const RANDOM_RADIUS = 6;
const CIRCLE_RADIUS = 1;
const CIRCLE_RADIUS_HOVER = 1;
const HOVER_LERP_SPEED = 0.18;
const GRID_DOT_ALPHA = 110;
const MAX_VELOCITY = 100;

// OKLab palette stops: grey → dark → blue → pink
const PALETTE = [
    { r: 228, g: 228, b: 228 },
    { r: 70, g: 70, b: 70 },
    { r: 7, g: 0, b: 220 },
    { r: 255, g: 0, b: 178 },
];

interface P5BackgroundProps {
    setSweepCallback?: (callback: (x: number, y: number) => void) => void;
}

export function P5Background({ setSweepCallback }: P5BackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const loadP5 = async () => {
            const p5Module = await p5Promise;
            const p5 = p5Module.default;

            const sketch = (p: any) => {
                // ============================================================
                // VARIABLES
                // ============================================================
                let numRows: number;
                let numCols: number;
                let currentRow = -1;
                let currentCol = -1;
                let allNeighbors: Array<{ row: number; col: number; opacity: number; c: any }> = [];
                let mouseVel = 0;
                let paletteOklab: Array<{ L: number; a: number; b: number }> = [];
                let gridDots: Array<Array<{ radius: number }>> = [];

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

                    paletteOklab = PALETTE.map((c) => rgbToOklab(c.r, c.g, c.b));
                    initGridDots();
                };

                p.draw = () => {
                    p.background(BACKGROUND_COLOR);

                    const rawVX = p.mouseX - p.pmouseX;
                    const rawVY = p.mouseY - p.pmouseY;
                    mouseVel = Math.sqrt(rawVX * rawVX + rawVY * rawVY);

                    // ── Grid dots with hover enlargement ──────────────────────
                    const nearestCol = Math.round(p.mouseX / CELL_SIZE);
                    const nearestRow = Math.round(p.mouseY / CELL_SIZE);

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
                    const row = Math.floor(p.mouseY / CELL_SIZE);
                    const col = Math.floor(p.mouseX / CELL_SIZE);

                    if (row !== currentRow || col !== currentCol) {
                        currentRow = row;
                        currentCol = col;

                        allNeighbors.push({
                            row,
                            col,
                            opacity: STARTING_ALPHA,
                            c: getSpeedColor(),
                        });

                        allNeighbors.push(...getNeighbors(row, col));
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
                const getNeighbors = (row: number, col: number) => {
                    const neighbors: Array<{ row: number; col: number; opacity: number; c: any }> = [];

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

                            if (Math.random() < PROB_OF_NEIGHBOR) {
                                const alphaFactor = getAlphaFactor(neighborRow, neighborCol, row, col);
                                const opacity = STARTING_ALPHA * alphaFactor;
                                neighbors.push({
                                    row: neighborRow,
                                    col: neighborCol,
                                    opacity,
                                    c: getSpeedColor(),
                                });
                            }
                        }
                    }

                    return neighbors;
                };

                const getAlphaFactor = (x1: number, y1: number, x2: number, y2: number) => {
                    const d = p.dist(x1, y1, x2, y2);
                    return p.map(d, 0, RANDOM_RADIUS, 1, 0);
                };

                // ============================================================
                // COLOR — OKLab multi-stop velocity palette
                // ============================================================

                const getSpeedColor = () => {
                    let t = p.constrain(p.map(mouseVel, 0, MAX_VELOCITY, 0, 1), 0, 1);

                    const segments = paletteOklab.length - 1;
                    const scaled = t * segments;
                    const idx = Math.min(Math.floor(scaled), segments - 1);
                    const segT = scaled - idx;

                    const lab = lerpOklab(paletteOklab[idx], paletteOklab[idx + 1], segT);
                    const { r, g, b } = oklabToRgb(lab.L, lab.a, lab.b);
                    return p.color(r, g, b);
                };

                const lerpOklab = (c1: { L: number; a: number; b: number }, c2: { L: number; a: number; b: number }, t: number) => {
                    return {
                        L: p.lerp(c1.L, c2.L, t),
                        a: p.lerp(c1.a, c2.a, t),
                        b: p.lerp(c1.b, c2.b, t),
                    };
                };

                const rgbToOklab = (r: number, g: number, b: number) => {
                    r = r / 255;
                    g = g / 255;
                    b = b / 255;
                    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
                    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
                    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

                    let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
                    let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
                    let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

                    l = Math.cbrt(l);
                    m = Math.cbrt(m);
                    s = Math.cbrt(s);

                    return {
                        L: 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
                        a: 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
                        b: 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
                    };
                };

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

                    const encode = (x: number) => {
                        x = x > 0.0031308 ? 1.055 * Math.pow(x, 1 / 2.4) - 0.055 : 12.92 * x;
                        return p.constrain(Math.round(x * 255), 0, 255);
                    };

                    return { r: encode(r), g: encode(g), b: encode(bv) };
                };
            };

            sketchRef.current = new p5(sketch, containerRef.current ?? undefined);

            if (setSweepCallback) {
                setSweepCallback(() => { });
            }
        };

        loadP5();

        return () => {
            sketchRef.current?.remove();
        };
    }, [setSweepCallback]);

    return <div ref={containerRef} className="p5-background" />;
}
