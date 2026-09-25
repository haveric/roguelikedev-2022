import sceneState from "../SceneState";
import Hex from "../components/Hex";
import HexUtil from "../util/HexUtil";
import engine from "../Engine";
import viewInfo from "./ViewInfo";
import inventoryView from "./InventoryView";
import entityLoader from "../entity/EntityLoader";
import CellularAutomataMap from "../map/CellularAutomataMap";
import DefaultPlayerEventHandler from "../event/DefaultPlayerEventHandler";
import messageManager from "../message/MessageManager";
import loadGame from "./LoadGame";
import saveGame from "./SaveGame";
import LoadGameEventHandler from "../event/LoadGameEventHandler";
import SaveGameEventHandler from "../event/SaveGameEventHandler";

class MainMenu {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 100;
    }

    setButtons() {
        this.buttons = [
            {
                text: "New Game",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.startNewGame.bind(this)
            },{
                text: "Load Game",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.openLoadGame.bind(this)
            }
        ];

        if (engine.state === "game") {
            this.height = 140;
            this.buttons.push({
                text: "Save Game",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.openSaveGame.bind(this)
            });
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

            const lineHeight = 26 * sceneState.scale;
            let y = this.y + (25 * sceneState.scale);
            for (const button of this.buttons) {
                if (button.hover) {
                    sceneState.ctx.fillStyle = "rgba(120, 120, 120, 1)";
                } else {
                    sceneState.ctx.fillStyle = "rgba(100, 100, 100, 1)";
                }

                button.position.x = this.x + (15 * sceneState.scale);
                button.position.y = y - (.6 * lineHeight);
                button.position.width = this.width * sceneState.scale - (30 * sceneState.scale);
                button.position.height = 1.2 * lineHeight;

                sceneState.ctx.fillRect(button.position.x,button.position.y, button.position.width, button.position.height);
                sceneState.drawTextAt(button.text, this.x + (30 * sceneState.scale), y, 26, "black", "left");
                y += lineHeight;

                y += .7 * (26 * sceneState.scale);
            }
        }
    }

    startFakeGame() {
        engine.gameMap = new CellularAutomataMap(80, 80);

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
        engine.player.fov.compute(engine.player, 5);
        engine.player.fov.updateMap();

        viewInfo.updatePlayerDetails();
    }

    startNewGame() {
        engine.state = "game";
        sceneState.debugRenderMap = false;
        engine.gameMap = new CellularAutomataMap(80, 80);

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
        messageManager.clear();
        messageManager.text("Welcome to the dungeon.").build();
    }

    openLoadGame() {
        this.hide();
        loadGame.setPosition(sceneState.center.x - 350, sceneState.center.y * .7);
        loadGame.show();

        engine.setEventHandler(new LoadGameEventHandler());
        engine.needsRenderUpdate = true;
    }

    openSaveGame() {
        this.hide();
        saveGame.setPosition(sceneState.center.x - 350, sceneState.center.y * .7);
        saveGame.show();

        engine.setEventHandler(new SaveGameEventHandler());
        engine.needsRenderUpdate = true;
    }
}


const mainMenu = new MainMenu();
export default mainMenu;