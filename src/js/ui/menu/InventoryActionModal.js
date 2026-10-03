import sceneState from "../../SceneState";
import Button from "../controls/Button";

class InventoryActionModal {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 140;

        this.buttons = [
            new Button("Use", null),
            new Button("Drop", null),
            new Button("Cancel", null)
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

    draw() {
        if (this.visible) {
            sceneState.ctx.fillStyle = "rgba(150, 150, 150, 1)";
            sceneState.ctx.fillRect(this.x,this.y, this.width * sceneState.scale, this.height * sceneState.scale);

            for (const button of this.buttons) {
                button.draw();
            }
        }
    }
}


const inventoryActionModal = new InventoryActionModal();
export default inventoryActionModal;