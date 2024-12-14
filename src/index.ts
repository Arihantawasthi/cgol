import Canvas from "./canvas";
import Game from "./game";

window.addEventListener("load", () => {
    const canvas = new Canvas("#game", 12);
    const game = new Game(canvas);
    game.draw();

    window.addEventListener("resize", () => {
        game.handleResize();
    });
})
