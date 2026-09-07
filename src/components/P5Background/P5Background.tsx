'use client';

import { useEffect, useRef } from 'react';

// Eagerly start loading p5 at module level so the fetch begins
// as soon as this chunk is parsed, not after React mounts.
const p5Promise = import('p5');

// ============================================================
// CONSTANTS
// ============================================================
const CELL_SIZE = 20;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 255;
const PROB_OF_NEIGHBOR = 0.3;
const AMT_FADE_PER_FRAME = 5;
const SQUARE_SIZE = 1.5;
const SQUARE_SIZE_HOVER = 1.5;
const HOVER_LERP_SPEED = 0.18;
const GRID_DOT_ALPHA = 110;
const MAX_VELOCITY = 100;
const RANDOM_RADIUS_MIN = 4;
const RANDOM_RADIUS_MAX = 10;
const MOMENTUM_DECAY = 0.9;
const MOMENTUM_GAIN = 1.2;
const MOMENTUM_THRESHOLD = 1;
const WAVE_ALPHA_SCALE = 0.6;
const WAVE_PROB_SCALE = 0.7;
const NEIGHBOR_BASE_SIZE = SQUARE_SIZE;
const NEIGHBOR_MAX_EXPANSION = 1.5;

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
                let allNeighbors = new Map<string, any>();
                let mouseVel = 0;
                let gridDots: Array<Array<{ size: number }>> = [];
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

                    p.noStroke();
                    p.rectMode(p.CENTER);

                    numRows = Math.ceil(window.innerHeight / CELL_SIZE);
                    numCols = Math.ceil(window.innerWidth / CELL_SIZE);

                    initGridDots();
                };

                p.draw = () => {
                    p.background(BACKGROUND_COLOR);

                    const rawVX = p.mouseX - p.pmouseX;
                    const rawVY = p.mouseY - p.pmouseY;
                    mouseVel = p.sqrt(rawVX * rawVX + rawVY * rawVY);

                    momentumX = momentumX * MOMENTUM_DECAY + rawVX * MOMENTUM_GAIN;
                    momentumY = momentumY * MOMENTUM_DECAY + rawVY * MOMENTUM_GAIN;
                    const momentumMag = p.sqrt(momentumX * momentumX + momentumY * momentumY);

                    // ── Grid dots with hover enlargement ──────────────────────
                    const nearestCol = p.round(p.mouseX / CELL_SIZE);
                    const nearestRow = p.round(p.mouseY / CELL_SIZE);

                    for (let col = 0; col <= numCols; col++) {
                        for (let row = 0; row <= numRows; row++) {
                            const dot = gridDots[col]?.[row];
                            if (!dot) continue;
                            const isNearest = col === nearestCol && row === nearestRow;
                            const targetSize = isNearest ? SQUARE_SIZE_HOVER : SQUARE_SIZE;
                            dot.size = p.lerp(dot.size, targetSize, HOVER_LERP_SPEED);

                            p.fill(185, 185, 185, GRID_DOT_ALPHA);
                            p.square(col * CELL_SIZE, row * CELL_SIZE, dot.size);
                        }
                    }

                    // ── Spawn neighbors when cell changes ─────────────────────
                    const row = Math.floor(p.mouseY / CELL_SIZE);
                    const col = Math.floor(p.mouseX / CELL_SIZE);

                    if (row !== currentRow || col !== currentCol) {
                        currentRow = row;
                        currentCol = col;

                        const centerOpacity = STARTING_ALPHA;
                        setNeighbor(row, col, {
                            row,
                            col,
                            opacity: centerOpacity,
                            startingOpacity: centerOpacity,
                            c: getSpeedColor(),
                            maxSize: NEIGHBOR_BASE_SIZE + NEIGHBOR_MAX_EXPANSION,
                        });

                        spawnNeighbors(row, col, radiusForVelocity(mouseVel));
                    }

                    // ── Momentum wave ──────────────────────────────────────────
                    if (momentumMag > MOMENTUM_THRESHOLD) {
                        const strength = p.constrain(momentumMag / (MAX_VELOCITY * MOMENTUM_GAIN), 0, 1);
                        spawnNeighbors(
                            currentRow,
                            currentCol,
                            radiusForVelocity(momentumMag),
                            strength * WAVE_ALPHA_SCALE,
                            WAVE_PROB_SCALE
                        );
                    }

                    // ── Draw & fade active neighbors ──────────────────────────
                    for (const [key, neighbor] of allNeighbors) {
                        neighbor.opacity = Math.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);

                        const fraction = neighbor.startingOpacity > 0
                            ? neighbor.opacity / neighbor.startingOpacity
                            : 0;
                        const size = p.lerp(NEIGHBOR_BASE_SIZE, neighbor.maxSize, fraction);

                        p.fill(p.red(neighbor.c), p.green(neighbor.c), p.blue(neighbor.c), neighbor.opacity);
                        p.square(neighbor.col * CELL_SIZE, neighbor.row * CELL_SIZE, size);

                        if (neighbor.opacity <= 0) allNeighbors.delete(key);
                    }
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
                            gridDots[col][row] = { size: SQUARE_SIZE };
                        }
                    }
                };

                // ============================================================
                // NEIGHBOR LOGIC
                // ============================================================
                const neighborKey = (row: number, col: number) => `${row},${col}`;

                const setNeighbor = (row: number, col: number, data: any) => {
                    allNeighbors.set(neighborKey(row, col), data);
                };

                const radiusForVelocity = (v: number) => {
                    const clamped = p.constrain(v, 0, MAX_VELOCITY);
                    return p.round(p.map(clamped, 0, MAX_VELOCITY, RANDOM_RADIUS_MIN, RANDOM_RADIUS_MAX));
                };

                const spawnNeighbors = (row: number, col: number, radius: number, alphaScale = 1.0, probScale = 1.0) => {
                    for (let dRow = -radius; dRow <= radius; dRow++) {
                        for (let dCol = -radius; dCol <= radius; dCol++) {
                            if (dRow === 0 && dCol === 0) continue;

                            const neighborRow = row + dRow;
                            const neighborCol = col + dCol;

                            const isInBounds =
                                neighborRow >= 0 &&
                                neighborRow < numRows &&
                                neighborCol >= 0 &&
                                neighborCol < numCols;

                            if (!isInBounds) continue;

                            if (Math.random() < PROB_OF_NEIGHBOR * probScale) {
                                const alphaFactor = getAlphaFactor(neighborRow, neighborCol, row, col, radius);
                                const opacity = STARTING_ALPHA * alphaFactor * alphaScale;
                                const maxSize = NEIGHBOR_BASE_SIZE + NEIGHBOR_MAX_EXPANSION * alphaFactor * alphaScale;

                                setNeighbor(neighborRow, neighborCol, {
                                    row: neighborRow,
                                    col: neighborCol,
                                    opacity,
                                    startingOpacity: opacity,
                                    c: getSpeedColor(),
                                    maxSize,
                                });
                            }
                        }
                    }
                };

                const getAlphaFactor = (x1: number, y1: number, x2: number, y2: number, radius: number) => {
                    const d = p.dist(x1, y1, x2, y2);
                    return p.map(d, 0, radius, 1, 0);
                };

                // ============================================================
                // COLOR — simple multi-stop velocity palette
                // ============================================================
                const getSpeedColor = () => {
                    const t = p.constrain(p.map(mouseVel, 0, MAX_VELOCITY, 0, 1), 0, 1);

                    const segments = PALETTE.length - 1;
                    const scaled = t * segments;
                    const idx = Math.min(Math.floor(scaled), segments - 1);
                    const segT = scaled - idx;

                    const c1 = PALETTE[idx];
                    const c2 = PALETTE[idx + 1];

                    const r = p.lerp(c1.r, c2.r, segT);
                    const g = p.lerp(c1.g, c2.g, segT);
                    const b = p.lerp(c1.b, c2.b, segT);

                    return p.color(r, g, b);
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

    return <div ref={containerRef} className="p5-background-canvas" />;
}
