import Canvas from "./canvas";
import Game from "./game";

window.addEventListener("load", () => {
    const canvas = new Canvas("#game", 20);
    const game = new Game(canvas);

    setInterval(() => {
        game.updateState();
        game.draw();
    }, 100);

    window.addEventListener("resize", () => {
        game.handleResize();
    });
})
