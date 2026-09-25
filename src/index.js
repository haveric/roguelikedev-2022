import "./styles/style.css";

import engine from "./js/Engine";
import sceneState from "./js/SceneState";
import viewInfo from "./js/ui/ViewInfo";
import playerInfo from "./js/ui/PlayerInfo";
import messageConsole from "./js/ui/MessageConsole";
import inventoryView from "./js/ui/InventoryView";
import inventoryHoverModal from "./js/ui/InventoryHoverModal";
import inventoryActionModal from "./js/ui/InventoryActionModal";
import MainMenuEventHandler from "./js/event/MainMenuEventHandler";
import mainMenu from "./js/ui/MainMenu";
import gameOver from "./js/ui/GameOver";
import saveManager from "./js/SaveManager";
import loadGame from "./js/ui/LoadGame";
import saveGame from "./js/ui/SaveGame";

(function () {
    function init() {
        engine.state = "start";
        showMainMenuStart();

        window.requestAnimationFrame(update);
    }

    function showMainMenuStart() {
        mainMenu.setPosition(sceneState.center.x - 100, sceneState.center.y * .7);
        mainMenu.show();

        engine.setEventHandler(new MainMenuEventHandler());
    }

    function update() {
        if (engine.handleEvents()) {
            viewInfo.updatePlayerDetails();

            saveManager.autosave();
        }

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
        if (engine.state === "game") {
            playerInfo.draw();
            viewInfo.draw();
            inventoryView.draw();
            inventoryHoverModal.draw();
            inventoryActionModal.draw();
            messageConsole.draw();
        }
        mainMenu.draw();
        gameOver.draw();
        loadGame.draw();
        saveGame.draw();
    }

    init();
}());