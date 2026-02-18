import { useEffect, useRef } from 'react';
import p5 from 'p5';

// CONSTANTS
const CELL_SIZE = 24;
const COLOR_R = 75;
const COLOR_G = 75;
const COLOR_B = 75;
const STARTING_ALPHA = 255;
const BACKGROUND_COLOR = 255;
const PROB_OF_NEIGHBOR = 0.3;
const AMT_FADE_PER_FRAME = 5;
const STROKE_WEIGHT = 1;
const RANDOM_RADIUS = 14;
const CIRCLE_RADIUS = 0.9;
const GRID_DOT_COLOR = 208;

export function P5Background() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sketchRef = useRef<p5 | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const sketch = (p: p5) => {
            let colorWithAlpha: p5.Color;
            let numRows: number;
            let numCols: number;
            let currentRow = -1;
            let currentCol = -1;
            let allNeighbors: Array<{ row: number; col: number; opacity: number }> = [];

            p.setup = () => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                p.createCanvas(width, height);
                colorWithAlpha = p.color(COLOR_R, COLOR_G, COLOR_B, STARTING_ALPHA);
                p.noFill();
                p.stroke(colorWithAlpha);
                p.strokeWeight(STROKE_WEIGHT);
                numRows = Math.floor(height / CELL_SIZE);
                numCols = Math.floor(width / CELL_SIZE) - 1;
            };

            p.draw = () => {
                p.background(BACKGROUND_COLOR);

                // Draw the default grid of dots
                p.stroke(GRID_DOT_COLOR, GRID_DOT_COLOR, GRID_DOT_COLOR, 255);
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
                        row: row,
                        col: col,
                        opacity: STARTING_ALPHA,
                    });

                    allNeighbors.push(...getRandomNeighbors(row, col));
                }

                // Draw and update all neighbors
                for (let neighbor of allNeighbors) {
                    const neighborX = neighbor.col * CELL_SIZE;
                    const neighborY = neighbor.row * CELL_SIZE;

                    // Decrease opacity of neighbor each frame
                    neighbor.opacity = Math.max(0, neighbor.opacity - AMT_FADE_PER_FRAME);
                    p.stroke(COLOR_R, COLOR_G, COLOR_B, neighbor.opacity);
                    p.circle(neighborX, neighborY, CIRCLE_RADIUS);
                }

                // Remove neighbors with zero opacity
                allNeighbors = allNeighbors.filter((neighbor) => neighbor.opacity > 0);
            };

            const getRandomNeighbors = (row: number, col: number) => {
                const neighbors: Array<{ row: number; col: number; opacity: number }> = [];

                for (let dRow = -1 * RANDOM_RADIUS; dRow <= RANDOM_RADIUS; dRow++) {
                    for (let dCol = -1 * RANDOM_RADIUS; dCol <= RANDOM_RADIUS; dCol++) {
                        // Skip center cell
                        if (dRow === 0 && dCol === 0) continue;

                        const neighborRow = row + dRow;
                        const neighborCol = col + dCol;

                        // Check if the cell is within boundaries
                        const isInBounds =
                            neighborRow >= 0 &&
                            neighborRow < numRows &&
                            neighborCol >= 0 &&
                            neighborCol < numCols;

                        // Add cell to neighbors array randomly
                        if (isInBounds && Math.random() < PROB_OF_NEIGHBOR) {
                            const alphaFactor = getDistFromXY(
                                neighborRow,
                                neighborCol,
                                row,
                                col
                            );
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

            const getDistFromXY = (
                x1: number,
                y1: number,
                x2: number,
                y2: number
            ) => {
                const d = p.dist(x1, y1, x2, y2);
                const alphaFactor = p.map(d, 0, RANDOM_RADIUS, 1, 0);
                return alphaFactor;
            };

            p.windowResized = () => {
                if (containerRef.current) {
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    p.resizeCanvas(width, height);
                    numRows = Math.floor(height / CELL_SIZE);
                    numCols = Math.floor(width / CELL_SIZE) - 1;
                }
            };
        };

        sketchRef.current = new p5(sketch, containerRef.current);

        return () => {
            sketchRef.current?.remove();
        };
    }, []);

    return <div ref={containerRef} className="p5-background" />;
}
