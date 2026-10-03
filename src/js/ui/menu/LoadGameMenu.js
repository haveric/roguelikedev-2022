import sceneState from "../../SceneState";
import Hex from "../../components/Hex";
import HexUtil from "../../util/HexUtil";
import engine from "../../Engine";
import DefaultPlayerEventHandler from "../../event/DefaultPlayerEventHandler";
import mainMenu from "./MainMenu";
import MainMenuEventHandler from "../../event/MainMenuEventHandler";
import saveManager from "../../SaveManager";
import DateUtil from "../../util/DateUtil";
import viewInfo from "../ViewInfo";
import inventoryView from "../InventoryView";
import messageManager from "../../message/MessageManager";
import equipmentView from "../EquipmentView";
import Button from "../controls/Button";

class LoadGameMenu {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 700;
        this.height = 55;
    }

    setButtons() {
        this.height = 55;
        const self = this;

        if (engine.state === "game") {
            this.buttons = [
                new Button("Return to Game", this.returnToGame.bind(this)),
            ];
        } else {
            this.buttons = [
                new Button("Return to Menu", this.returnToMenu.bind(this)),
            ];
        }

        const saves = saveManager.getSavesAsList();
        for (const save of saves) {
            this.buttons.push(new Button("Load: " + save.name + "-" + DateUtil.formatDate(save.date) + " " + DateUtil.formatTime(save.date), () => {
                self.load(save.name);
            }));

            this.height += 45;
        }

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
        this.setButtons();
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    drawHex(drawXY, scale, letter) {
        HexUtil.drawHex(sceneState.ctx, drawXY.x, drawXY.y, scale);

        sceneState.ctx.fillStyle = "rgba(200, 200, 200, 1)";
        sceneState.ctx.fill();

        sceneState.ctx.strokeStyle = "rgba(50, 50, 50, 1)";
        sceneState.ctx.stroke();

        sceneState.drawTextAt(letter, drawXY.x, drawXY.y, 60, "#000");
    }

    draw() {
        if (this.visible) {
            sceneState.ctx.fillStyle = "rgba(0, 0, 0, .8)";
            sceneState.ctx.fillRect(0, 0, sceneState.canvas.width, sceneState.canvas.height);

            const scale = 2.5;
            const hex = new Hex();

            const qStart = hex.q - 4;
            const rStart = hex.r - 3;
            let rOffset = 0;
            const title = "LOAD GAME";
            let i = 0;
            for (let q = qStart + 8; q >= qStart; q --) {
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

    returnToGame() {
        this.hide();

        engine.setEventHandler(new DefaultPlayerEventHandler());
    }

    returnToMenu() {
        engine.state = "start";
        mainMenu.show();
        engine.setEventHandler(new MainMenuEventHandler());
    }

    load(name) {
        saveManager.saveName = name;
        const saveJson = saveManager.getCurrentSave();

        engine.gameMap.load(saveJson.map);

        engine.setEventHandler(new DefaultPlayerEventHandler());

        const playerFighter = engine.player.getComponent("fighter");
        playerFighter.updateUI();
        inventoryView.update();
        equipmentView.update();

        engine.state = "game";
        sceneState.debugRenderMap = false;

        const lightRadius = engine.player.getComponent("fighter").lightRadius;
        engine.player.fov.compute(engine.player, lightRadius);
        engine.player.fov.updateMap();

        viewInfo.updatePlayerDetails();
        messageManager.clear();
        engine.needsRenderUpdate = true;
    }
}


const loadGame = new LoadGameMenu();
export default loadGame;