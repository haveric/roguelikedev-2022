import sceneState from "../SceneState";
import Hex from "../components/Hex";
import HexUtil from "../util/HexUtil";
import engine from "../Engine";
import DefaultPlayerEventHandler from "../event/DefaultPlayerEventHandler";

class LevelUp {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 300;
        this.height = 140;
    }

    setButtons() {
        this.buttons = [
            {
                text: "Constitution (+10 HP)",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.increaseMaxHp.bind(this)
            },{
                text: "Strength (+1 Power)",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.increasePower.bind(this)
            },{
                text: "Agility (+1 Defense)",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.increaseDefense.bind(this)
            }
        ];
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
        engine.needsRenderUpdate = true;
    }
}


const levelUp = new LevelUp();
export default levelUp;