import Canvas from "./canvas";

const DIRS: number[][] = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
]

export default class Game {
    private state: number[][];
    private canvas: Canvas;
    private rows: number;
    private cols: number;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
        this.rows = this.canvas.rows;
        this.cols = this.canvas.cols;
        this.state = this.createState(this.rows, this.cols);
    }

    private createState(rows: number, cols: number) {
        const grid: number[][] = [[]];
        const probability = 0.2;
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = Math.random() < probability ? 1 : 0;
            }
        }
        return grid;
    }

    private getNeighborCount(x: number, y: number): number {
        let dir: number[] = [];
        let count = 0;
        for (let i = 0; i < DIRS.length; i++) {
            dir = DIRS[i];
            const row: number = x + dir[0];
            const col: number = y + dir[1];

            if (row < 0 || row >= this.rows) {
                continue;
            }
            if (col < 0 || col >= this.cols) {
                continue;
            }
            if (this.state[row][col] == 1) {
                count++;
            }
        }

        return count;
    }

    // RULES:
    // Birth: A dead cell becomes alive if it has exactly three live neighbors
    // Death by isolation: A live cell dies if it has one or fewer live neighbors
    // Death by overcrowding: A live cell dies if it has four or more live neighbors
    // Survival: A live cell survives if it has two or three live neighbors
    public updateState() {
        const nextState = this.state.map(rows => [ ...rows ]);
        for (let i = 0; i < nextState.length; i++) {
            const rows = nextState[i];
            for (let j = 0; j < rows.length; j++) {
                const neighborCount = this.getNeighborCount(i, j);
                if (neighborCount <= 1) {
                    nextState[i][j] = 0;
                }
                if (neighborCount >= 4) {
                    nextState[i][j] = 0;
                }
                if (neighborCount == 3) {
                    nextState[i][j] = 1;
                }
            }
        }
        this.state = nextState;
    }

    public drawAndCalculatePopuation() {
        let population = 0;
        this.state.forEach((rows, i) => {
            rows.forEach((_, j) => {
                if (this.state[i][j] == 1) {
                    population++;
                }
                this.canvas.drawCell(j * this.canvas.cellSize, i * this.canvas.cellSize, this.state[i][j] == 1 ? "white" : "#111");
            })
        })

        return population;
    }

    public handleResize() {
        this.canvas.resizeCanvas();
        this.rows = this.canvas.rows;
        this.cols = this.canvas.cols;
        this.state = this.createState(this.rows, this.cols);
        this.updateState();
        this.drawAndCalculatePopuation();
    }
}
