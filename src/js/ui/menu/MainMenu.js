import sceneState from "../../SceneState";
import Hex from "../../components/Hex";
import HexUtil from "../../util/HexUtil";
import engine from "../../Engine";
import viewInfo from "../ViewInfo";
import inventoryView from "../InventoryView";
import entityLoader from "../../entity/EntityLoader";
import CellularAutomataMap from "../../map/CellularAutomataMap";
import DefaultPlayerEventHandler from "../../event/DefaultPlayerEventHandler";
import messageManager from "../../message/MessageManager";
import loadGame from "./LoadGameMenu";
import saveGame from "./SaveGameMenu";
import LoadGameEventHandler from "../../event/LoadGameEventHandler";
import SaveGameEventHandler from "../../event/SaveGameEventHandler";
import gameWorld from "../../GameWorld";
import equipmentView from "../EquipmentView";
import controlsMenu from "./ControlsMenu";
import creditsMenu from "./CreditsMenu";
import ControlsMenuEventHandler from "../../event/ControlsMenuEventHandler";
import CreditsMenuEventHandler from "../../event/CreditsMenuEventHandler";
import Button from "../controls/Button";

class MainMenu {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 95;
    }

    setButtons() {
        this.height = 95;
        this.buttons = [
            new Button("New Game", this.startNewGame.bind(this)),
            new Button("Load Game", this.openLoadGame.bind(this))
        ];

        if (engine.state === "game") {
            this.buttons.push(
                new Button("Save Game", this.openSaveGame.bind(this))
            );
            this.height += 45;
        }

        this.buttons.push(
            new Button("Controls", this.openControls.bind(this))
        );
        this.height += 45;

        this.buttons.push(
            new Button("Credits", this.openCredits.bind(this))
        );
        this.height += 45;

        this.setButtonPositions();
    }

    setButtonPositions() {
        this.padding = 15 * sceneState.scale;
        const lineHeight = 26 * sceneState.scale;
        let y = this.y + (25 * sceneState.scale);
        for (const button of this.buttons) {
            button.setPosition(this.x + this.padding, y - (.6 * lineHeight), this.width * sceneState.scale - (2 * this.padding), 1.2 * lineHeight);
            y += lineHeight + (.7 * (26 * sceneState.scale));
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        if (engine.state === "start") {
            this.startFakeGame();
        }
        this.setButtons();
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    drawHex(drawXY, scale, letter) {
        HexUtil.drawHex(sceneState.ctx, drawXY.x - 75, drawXY.y, scale);

        sceneState.ctx.fillStyle = "rgba(200, 200, 200, 1)";
        sceneState.ctx.fill();

        sceneState.ctx.strokeStyle = "rgba(50, 50, 50, 1)";
        sceneState.ctx.stroke();

        sceneState.drawTextAt(letter, drawXY.x - 75, drawXY.y, 60, "#000");
    }

    draw() {
        if (this.visible) {
            sceneState.ctx.fillStyle = "rgba(0, 0, 0, .8)";
            sceneState.ctx.fillRect(0, 0, sceneState.canvas.width, sceneState.canvas.height);

            const scale = 2.5;
            const hex = new Hex();

            const qStart = hex.q - 4;
            const rStart = hex.r - 1;
            let rOffset = 0;
            const title = "HEXAGON";
            let i = 0;
            for (let q = qStart + 6; q >= qStart; q --) {
                if (q % 2 === 0) {
                    rOffset += 1;
                }

                const drawXY = HexUtil.getHexDrawCoords(hex, q, rStart + 4 + rOffset, scale);

                this.drawHex(drawXY, scale, title.charAt(i));
                i += 1;

            }
            sceneState.ctx.fillStyle = "rgba(150, 150, 150, 1)";
            sceneState.ctx.fillRect(this.x,this.y, this.width * sceneState.scale, this.height * sceneState.scale);

            for (const button of this.buttons) {
                button.draw();
            }
        }
    }

    startFakeGame() {
        engine.gameMap = new CellularAutomataMap(80, 80, 1);

        engine.player = entityLoader.createFromTemplate("player", {components: {hex: {row: 0, col: 0}}});
        const playerHex = engine.player.getComponent("hex");
        let foundPlace = false;
        while(!foundPlace) {
            const playerRow = Math.floor(Math.random() * (engine.gameMap.rows * .5)) + Math.round(.25 * engine.gameMap.rows);
            const playerCol = Math.floor(Math.random() * (engine.gameMap.cols * .5)) + Math.round(.25 * engine.gameMap.cols);

            const tile = engine.gameMap.tiles[playerRow][playerCol];
            if (!tile.isWall()) {
                playerHex.moveTo(playerRow, playerCol);
                foundPlace = true;
            }
        }
        engine.gameMap.actors.push(engine.player);
        engine.gameMap.placeEntities("cave", 1, .03, 5);
        engine.gameMap.placeItems("cave", 1, .03, 5);

        sceneState.debugRenderMap = true;
        engine.needsRenderUpdate = true;
        const lightRadius = engine.player.getComponent("fighter").lightRadius;
        engine.player.fov.compute(engine.player, lightRadius);
        engine.player.fov.updateMap();

        viewInfo.updatePlayerDetails();
    }

    startNewGame() {
        engine.state = "game";
        sceneState.debugRenderMap = false;
        messageManager.clear();

        engine.gameMap = null; // Reset gameMap to start on level 1
        engine.player = null; // Reset player to create a new one
        gameWorld.generateFloor();

        engine.setEventHandler(new DefaultPlayerEventHandler());

        const playerFighter = engine.player.getComponent("fighter");
        playerFighter.calculateStats();
        inventoryView.update();
        equipmentView.update();

        viewInfo.updatePlayerDetails();

        engine.needsRenderUpdate = true;
    }

    openLoadGame() {
        loadGame.setPosition(sceneState.center.x - 350, sceneState.center.y * .7);
        loadGame.show();

        engine.setEventHandler(new LoadGameEventHandler());
    }

    openSaveGame() {
        saveGame.setPosition(sceneState.center.x - 350, sceneState.center.y * .7);
        saveGame.show();

        engine.setEventHandler(new SaveGameEventHandler());
    }

    openControls() {
        controlsMenu.setPosition(sceneState.center.x - 350, sceneState.center.y * .7);
        controlsMenu.show();

        engine.setEventHandler(new ControlsMenuEventHandler());
    }

    openCredits() {
        creditsMenu.setPosition(sceneState.center.x - 350, sceneState.center.y * .7);
        creditsMenu.show();

        engine.setEventHandler(new CreditsMenuEventHandler());
    }
}


const mainMenu = new MainMenu();
export default mainMenu;