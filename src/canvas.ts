const DESKTOP_PADDING = 300;
const MOBILE_PADDING = 100;

export default class Canvas {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private canvasPadding: number;
    public cellSize: number;
    public rows: number;
    public cols: number;

    constructor(canvasId: string, cellSize = 20) {
        if (!canvasId.startsWith("#")) {
            throw new Error("Canvas Id should start with '#' symbol");
        }
        this.canvas = document.querySelector(canvasId) as HTMLCanvasElement;
        this.canvasPadding = DESKTOP_PADDING;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error("Couldn't get canvas context");
        }

        this.cellSize = cellSize;
        this.rows = this.getRows();
        this.cols = this.getCols();
        this.resizeCanvas();
    }

    private getRows() {
        const rows = Math.floor(this.canvas.height / this.cellSize);
        return rows;
    }

    private getCols() {
        const cols = Math.floor(this.canvas.width / this.cellSize);
        return cols;
    }

    public resizeCanvas() {
        this.canvasPadding = DESKTOP_PADDING;
        if (window.innerWidth <= 1000) {
            this.canvasPadding = MOBILE_PADDING;
        }
        this.canvas.width = window.innerWidth - this.canvasPadding;
        this.canvas.height = window.innerHeight - this.canvasPadding;
        this.rows = this.getRows();
        this.cols = this.getCols();
    }

    public drawCell(x: number, y: number, color: string) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }
}
