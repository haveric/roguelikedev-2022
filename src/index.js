import "./styles/style.css";

import engine from "./js/Engine";
import sceneState from "./js/SceneState";
import DefaultPlayerEventHandler from "./js/event/DefaultPlayerEventHandler";
import CellularAutomataMap from "./js/map/CellularAutomataMap";
import entityLoader from "./js/entity/EntityLoader";
import messageManager from "./js/message/MessageManager";
import viewInfo from "./js/ui/ViewInfo";
import playerInfo from "./js/ui/PlayerInfo";
import messageConsole from "./js/ui/MessageConsole";
import inventoryView from "./js/ui/InventoryView";
import inventoryHoverModal from "./js/ui/InventoryHoverModal";
import inventoryActionModal from "./js/ui/InventoryActionModal";

(function () {
    function init() {
        engine.gameMap = new CellularAutomataMap(35, 80);

        engine.player = entityLoader.createFromTemplate("player", {components: {hex: {row: 0, col: 0}}});
        const playerHex = engine.player.getComponent("hex");
        let foundPlace = false;
        while(!foundPlace) {
            const playerRow = Math.floor(Math.random() * (engine.gameMap.rows - 4)) + 2;
            const playerCol = Math.floor(Math.random() * (engine.gameMap.cols - 4)) + 2;

            const tile = engine.gameMap.tiles[playerRow][playerCol];
            if (!tile.isWall()) {
                playerHex.moveTo(playerRow, playerCol);
                foundPlace = true;
            }
        }
        engine.gameMap.actors.push(engine.player);
        engine.gameMap.placeEntities("cave", 1, .03, 5);
        engine.gameMap.placeItems("cave", 1, .03, 5);

        engine.setEventHandler(new DefaultPlayerEventHandler());

        const playerFighter = engine.player.getComponent("fighter");
        playerFighter.updateUI();
        inventoryView.update();

        engine.needsRenderUpdate = true;
        engine.player.fov.compute(engine.player, 5);
        engine.player.fov.updateMap();

        viewInfo.updatePlayerDetails();
        messageManager.text("Welcome to the dungeon.").build();

        window.requestAnimationFrame(update);
    }

    function update() {
        engine.handleEvents();
        viewInfo.updatePlayerDetails();

        if (engine.needsBackgroundUpdate) {
            engine.gameMap.savedBackground = null;
            engine.needsBackgroundUpdate = false;
        }

        if (engine.needsRenderUpdate) {
            render();
            engine.needsRenderUpdate = false;
        }

        window.requestAnimationFrame(update);
    }

    function render() {
        sceneState.clearAll();
        engine.gameMap.draw();
        playerInfo.draw();
        viewInfo.draw();
        inventoryView.draw();
        inventoryHoverModal.draw();
        inventoryActionModal.draw();
        messageConsole.draw();
    }

    init();
}());