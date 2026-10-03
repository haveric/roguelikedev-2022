import sceneState from "../../SceneState";
import Hex from "../../components/Hex";
import HexUtil from "../../util/HexUtil";
import engine from "../../Engine";
import DefaultPlayerEventHandler from "../../event/DefaultPlayerEventHandler";
import saveManager from "../../SaveManager";
import DateUtil from "../../util/DateUtil";
import Button from "../controls/Button";

class SaveGameMenu {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 700;
        this.height = 100;
    }

    setButtons() {
        this.height = 100;
        const self = this;
        this.buttons = [
            new Button("Return to Game", this.returnToGame.bind(this)),
            new Button("Create New Save", this.createNewSave.bind(this)),
        ];

        const saves = saveManager.getSavesAsList();
        for (const save of saves) {
            this.buttons.push(new Button("Overwrite: " + save.name + "-" + DateUtil.formatDate(save.date) + " " + DateUtil.formatTime(save.date), () => {
                self.save(save.name);
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
            const title = "SAVE GAME";
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

    createNewSave() {
        saveManager.saveName = this.generateId(8);
        saveManager.save();

        this.setButtons();
        engine.needsRenderUpdate = true;
    }

    generateId(length) {
        let randomString = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return randomString;
    }

    save(name) {
        saveManager.saveName = name;
        saveManager.save();

        this.setButtons();
        engine.needsRenderUpdate = true;
    }
}


const saveGame = new SaveGameMenu();
export default saveGame;