import "./styles/style.css";

import engine from "./js/Engine";
import sceneState from "./js/SceneState";
import Actor from "./js/entity/Actor";
import DefaultPlayerEventHandler from "./js/event/DefaultPlayerEventHandler";
import CellularAutomataMap from "./js/map/CellularAutomataMap";

(function () {
    function init() {
        engine.gameMap = new CellularAutomataMap(35, 80);

        engine.player = new Actor();
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