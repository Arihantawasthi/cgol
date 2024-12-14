const canvas = document.querySelector("#game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const CELL_SIZE = 10;

function initializeCanvas() {
    canvas.width = Math.floor(window.innerWidth - 300);
    canvas.height = Math.floor(window.innerHeight - 300);

    const { rows, cols } = calculateRowsAndCols();
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            drawCell(i*10, j*10);
        }
    }
}

function calculateRowsAndCols() {
    const rows = Math.floor(canvas.width / CELL_SIZE);
    const cols =  Math.floor(canvas.height / CELL_SIZE);

    return { rows, cols }
}

function drawCell(x: number, y: number) {
    if (ctx == null) return

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 10, 10);
}

initializeCanvas();
