import sceneState from "../SceneState";
import Hex from "../components/Hex";
import HexUtil from "../util/HexUtil";
import engine from "../Engine";
import mainMenu from "./MainMenu";
import MainMenuEventHandler from "../event/MainMenuEventHandler";

class ControlsMenu {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 700;
        this.height = 55;
    }

    setButtons() {
        this.buttons = [
            {
                text: "Return to Menu",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                },
                callback: this.returnToMenu.bind(this)
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
            const rStart = hex.r - 1;
            let rOffset = 0;
            const title = "CONTROLS";
            let i = 0;
            for (let q = qStart + 7; q >= qStart; q --) {
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

                sceneState.ctx.fillStyle = "rgba(150, 150, 150, 1)";
                sceneState.ctx.fillRect(this.x,y, this.width * sceneState.scale, 250 * sceneState.scale);
                y += 1.4 * (26 * sceneState.scale);

                sceneState.drawTextAt("Movement: Numpad 789/123 or qwe/zxc", this.x + (30 * sceneState.scale), y, 20, "black", "left");
                y += 1.2 * (26 * sceneState.scale);
                sceneState.drawTextAt("Wait a turn: Numpad 5 or s", this.x + (30 * sceneState.scale), y, 20, "black", "left");
                y += 1.2 * (26 * sceneState.scale);
                sceneState.drawTextAt("Pickup: g", this.x + (30 * sceneState.scale), y, 20, "black", "left");
                y += 1.2 * (26 * sceneState.scale);
                sceneState.drawTextAt("Take stairs: >", this.x + (30 * sceneState.scale), y, 20, "black", "left");
                y += 1.2 * (26 * sceneState.scale);
                sceneState.drawTextAt("Pause: p or ESC", this.x + (30 * sceneState.scale), y, 20, "black", "left");

                y += 1.2 * (26 * sceneState.scale);
                sceneState.drawTextAt("Interact with inventory: Mouse Left/Right Click", this.x + (30 * sceneState.scale), y, 20, "black", "left");

                y += 1.2 * (26 * sceneState.scale);
                sceneState.drawTextAt("Debug explore map: F9", this.x + (30 * sceneState.scale), y, 20, "black", "left");

            }
        }
    }

    returnToMenu() {
        mainMenu.show();
        engine.setEventHandler(new MainMenuEventHandler());
        engine.needsRenderUpdate = true;
    }
}


const controlsMenu = new ControlsMenu();
export default controlsMenu;