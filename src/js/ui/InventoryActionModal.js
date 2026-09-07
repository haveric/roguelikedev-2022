import sceneState from "../SceneState";

class InventoryActionModal {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 140;
        this.buttons = [
            {
                text: "Use",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            },{
                text: "Drop",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            },{
                text: "Cancel",
                hover: false,
                position: {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            }
        ];
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    draw() {
        if (this.visible) {
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
}


const inventoryActionModal = new InventoryActionModal();
export default inventoryActionModal;