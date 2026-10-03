import sceneState from "../../SceneState";
import Hex from "../../components/Hex";
import HexUtil from "../../util/HexUtil";
import engine from "../../Engine";
import DefaultPlayerEventHandler from "../../event/DefaultPlayerEventHandler";
import Button from "../controls/Button";

class LevelUpMenu {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 300;
        this.height = 140;

        this.buttons = [
            new Button("Constitution (+10 HP)", this.increaseMaxHp.bind(this)),
            new Button("Strength (+1 Power)", this.increasePower.bind(this)),
            new Button("Agility (+1 Defense)", this.increaseDefense.bind(this))
        ];
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

        this.setButtonPositions();
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    drawHex(drawXY, scale, letter) {
        HexUtil.drawHex(sceneState.ctx, drawXY.x + 25, drawXY.y, scale);

        sceneState.ctx.fillStyle = "rgba(200, 200, 200, 1)";
        sceneState.ctx.fill();

        sceneState.ctx.strokeStyle = "rgba(50, 50, 50, 1)";
        sceneState.ctx.stroke();

        sceneState.drawTextAt(letter, drawXY.x + 25, drawXY.y, 60, "#000");
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
            const title = "LEVEL UP!";
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

    increaseMaxHp() {
        const playerLevel = engine.player.getComponent("level");
        playerLevel.increaseMaxHp(10);

        this.afterClick();
    }

    increasePower() {
        const playerLevel = engine.player.getComponent("level");
        playerLevel.increasePower(1);

        this.afterClick();
    }

    increaseDefense() {
        const playerLevel = engine.player.getComponent("level");
        playerLevel.increaseDefense(1);

        this.afterClick();
    }

    afterClick() {
        this.hide();
        engine.setEventHandler(new DefaultPlayerEventHandler());
    }
}


const levelUp = new LevelUpMenu();
export default levelUp;