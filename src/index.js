import "./styles/style.css";

import engine from "./js/Engine";
import sceneState from "./js/SceneState";
import viewInfo from "./js/ui/ViewInfo";
import playerInfo from "./js/ui/PlayerInfo";
import messageConsole from "./js/ui/MessageConsole";
import inventoryView from "./js/ui/InventoryView";
import inventoryHoverModal from "./js/ui/InventoryHoverModal";
import inventoryActionModal from "./js/ui/menu/InventoryActionModal";
import MainMenuEventHandler from "./js/event/MainMenuEventHandler";
import mainMenu from "./js/ui/menu/MainMenu";
import gameOver from "./js/ui/menu/GameOverMenu";
import saveManager from "./js/SaveManager";
import loadGame from "./js/ui/menu/LoadGameMenu";
import saveGame from "./js/ui/menu/SaveGameMenu";
import levelUp from "./js/ui/menu/LevelUpMenu";
import equipmentView from "./js/ui/EquipmentView";
import controlsMenu from "./js/ui/menu/ControlsMenu";
import creditsMenu from "./js/ui/menu/CreditsMenu";

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
            equipmentView.draw();
            inventoryView.draw();
            inventoryHoverModal.draw();
            inventoryActionModal.draw();
            messageConsole.draw();
            levelUp.draw();
        }
        mainMenu.draw();
        gameOver.draw();
        loadGame.draw();
        saveGame.draw();
        controlsMenu.draw();
        creditsMenu.draw();
    }

    init();
}());