import Canvas from "./canvas";

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
        this.updateState();
    }

    private createState(rows: number, cols: number) {
        const grid: number[][] = [[]];
        for (let i = 0; i < rows; i++) {
            grid[i] = [];
            for (let j = 0; j < cols; j++) {
                grid[i][j] = 0;
            }
        }
        return grid;
    }

    private updateState() {
        this.state[0][1] = 1;
        this.state[2][1] = 1;
        this.state[5][1] = 1;
        this.state[5][5] = 1;
        this.state[10][10] = 1;
        this.state[9][11] = 1;
        this.state[8][12] = 1;
        this.state[14][20] = 1;
    }

    public draw() {
        this.state.forEach((row, i) => {
            row.forEach((_, j) => {
                this.canvas.drawCell(j * this.canvas.cellSize, i * this.canvas.cellSize, this.state[i][j]== 1 ? "white" : "#1b1b1b");
            })
        })
    }

    public handleResize() {
        this.canvas.resizeCanvas();
        this.rows = this.canvas.rows;
        this.cols = this.canvas.cols;
        this.state = this.createState(this.rows, this.cols);
        this.updateState();
        this.draw();
    }
}
