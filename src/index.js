import "./styles/style.css";

import engine from "./js/Engine";
import sceneState from "./js/SceneState";
import DefaultPlayerEventHandler from "./js/event/DefaultPlayerEventHandler";
import CellularAutomataMap from "./js/map/CellularAutomataMap";
import entityLoader from "./js/entity/EntityLoader";

(function () {
    function init() {
        engine.gameMap = new CellularAutomataMap(35, 80);

        engine.player = entityLoader.createFromTemplate("player", {components: {hex: {row: 0, col: 0}}});
        const playerHex = engine.player.getComponent("hex");
        let foundPlace = false;
        while(!foundPlace) {
            const playerRow = Math.floor(Math.random() * (engine.gameMap.rows - 8)) + 4;
            const playerCol = Math.floor(Math.random() * (engine.gameMap.cols - 4)) + 2;

            const tile = engine.gameMap.tiles[playerRow][playerCol];
            if (!tile.isWall()) {
                playerHex.moveTo(playerRow, playerCol);
                foundPlace = true;
            }
        }
        engine.gameMap.actors.push(engine.player);

        engine.eventHandler = new DefaultPlayerEventHandler();

        engine.needsRenderUpdate = true;

        window.requestAnimationFrame(update);
    }

    function update() {
        engine.handleEvents();

        if (engine.needsRenderUpdate) {
            render();

            engine.needsRenderUpdate = false;
        }

        window.requestAnimationFrame(update);
    }

    function render() {
        sceneState.clearAll();
        engine.gameMap.draw();
    }

    init();
}());