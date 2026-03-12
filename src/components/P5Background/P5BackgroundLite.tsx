'use client';

import { useEffect, useRef } from 'react';

const p5Promise = import('p5');

// CONSTANTS
const CELL_SIZE = 22;
const COLOR_R = 40;
const COLOR_G = 40;
const COLOR_B = 40;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 255;
const PROB_OF_NEIGHBOR = 0.3;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;
const RANDOM_RADIUS = 17;
const CIRCLE_RADIUS = 1;
const GRID_DOT_ALPHA = 110;

export function P5BackgroundLite() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<any>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const loadP5 = async () => {
            const p5Module = await p5Promise;
            const p5 = p5Module.default;

            const sketch = (p: any) => {
                let numRows: number;
                let numCols: number;
                let currentRow = -1;
                let currentCol = -1;
                let allNeighbors: Array<{ row: number; col: number; opacity: number }> = [];

                p.setup = () => {
                    const cnv = p.createCanvas(window.innerWidth, window.innerHeight);
                    cnv.style('position', 'absolute');
                    cnv.style('inset', '0');
                    cnv.style('z-index', '-1');

                    p.noFill();
                    p.strokeWeight(STROKE_WEIGHT);

                    numRows = Math.ceil(window.innerHeight / CELL_SIZE);
                    numCols = Math.ceil(window.innerWidth / CELL_SIZE);
                };

                p.draw = () => {
                    p.background(BACKGROUND_COLOR);

                    // Draw the default grid of dots
                    p.stroke(COLOR_R, COLOR_G, COLOR_B, GRID_DOT_ALPHA);
                    for (let col = 0; col <= numCols; col++) {
                        for (let row = 0; row <= numRows; row++) {
                            p.circle(col * CELL_SIZE, row * CELL_SIZE, CIRCLE_RADIUS);
                        }
                    }

                    // Calculate the row and column of the cell that the mouse is over
                    const row = Math.floor(p.mouseY / CELL_SIZE);
                    const col = Math.floor(p.mouseX / CELL_SIZE);

                    // Check if mouse has moved to a different cell
                    if (row !== currentRow || col !== currentCol) {
                        currentRow = row;
                        currentCol = col;

                        // Add the current cell to neighbors with full opacity
                        allNeighbors.push({
                            row,
                            col,
                            opacity: STARTING_ALPHA,
                        });

                        allNeighbors.push(...getRandomNeighbors(row, col));
                    }

                    // Draw and update all neighbors
                    for (let neighbor of allNeighbors) {
                        neighbor.opacity = Math.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
                        p.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
                        p.circle(neighbor.col * CELL_SIZE, neighbor.row * CELL_SIZE, CIRCLE_RADIUS);
                    }

                    // Remove neighbors with zero opacity
                    allNeighbors = allNeighbors.filter((n) => n.opacity > 0);
                };

                const getRandomNeighbors = (row: number, col: number) => {
                    const neighbors: Array<{ row: number; col: number; opacity: number }> = [];

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

                            if (isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
                                const alphaFactor = getDistFromXY(neighborRow, neighborCol, row, col);
                                neighbors.push({
                                    row: neighborRow,
                                    col: neighborCol,
                                    opacity: STARTING_ALPHA * alphaFactor,
                                });
                            }
                        }
                    }

                    return neighbors;
                };

                const getDistFromXY = (x1: number, y1: number, x2: number, y2: number) => {
                    const d = p.dist(x1, y1, x2, y2);
                    return p.map(d, 0, RANDOM_RADIUS, 1, 0);
                };

                p.windowResized = () => {
                    p.resizeCanvas(window.innerWidth, window.innerHeight);
                    numRows = Math.ceil(window.innerHeight / CELL_SIZE);
                    numCols = Math.ceil(window.innerWidth / CELL_SIZE);
                };
            };

            sketchRef.current = new p5(sketch, containerRef.current ?? undefined);
        };

        loadP5();

        return () => {
            sketchRef.current?.remove();
        };
    }, []);

    return <div ref={containerRef} className="p5-background" />;
}
