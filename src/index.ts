import Canvas from "./canvas";
import Game from "./game";

window.addEventListener("load", () => {
    const canvas = new Canvas("#game", 10);
    const game = new Game(canvas);
    let generations = 1;

    setInterval(() => {
        game.updateState();
        const population = game.drawAndCalculatePopuation();
        const populationDiv = document.querySelector("#population");
        if (populationDiv) populationDiv.textContent = population.toString();
        const generationDiv = document.querySelector("#generationCount");
        if (generationDiv) generationDiv.textContent = generations.toString();
        generations++;
    }, 100);

    window.addEventListener("resize", () => {
        game.handleResize();
    });
})
