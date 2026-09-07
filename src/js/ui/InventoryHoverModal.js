import sceneState from "../SceneState";
import TextUtil from "../util/TextUtil";

class InventoryHoverModal {
    constructor() {
        this.visible = false;
        this.x = 0;
        this.y = 0;
        this.title = "";
        this.description = "";
        this.width = 300;
        this.height = 200;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setItem(item) {
        this.title = item.name;
        this.description = item.description;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    draw() {
        if (this.visible) {
            const horizontalPadding = 15 * sceneState.scale;
            const verticalPadding = 25 * sceneState.scale;
            const textWidth = this.width * sceneState.scale;

            sceneState.ctx.font = "bold " + (sceneState.scale * 26) + "px serif";
            const titleLines = TextUtil.getLines(this.title, textWidth);
            const titleLineHeight = 26 * sceneState.scale;
            const titleHeight = (titleLines.length + .5) * titleLineHeight;
            sceneState.ctx.font = "bold " + (sceneState.scale * 20) + "px serif";
            const descriptionLines = TextUtil.getLines(this.description, textWidth);
            const descriptionLineHeight = 20 * sceneState.scale;
            const descriptionHeight = descriptionLines.length * descriptionLineHeight;
            this.height = titleHeight + descriptionHeight;

            sceneState.ctx.fillStyle = "rgba(150, 150, 150, 1)";

            sceneState.ctx.fillRect(this.x + horizontalPadding, this.y, textWidth + 2 * horizontalPadding, this.height + verticalPadding);

            let y = this.y + verticalPadding;
            for (let i = 0; i < titleLines.length; i++) {
                sceneState.drawTextAt(titleLines[i], this.x + (30 * sceneState.scale), y, 26, "black", "left");
                y += titleLineHeight;
            }
            y += .5 * titleLineHeight;
            for (let i = 0; i < descriptionLines.length; i++) {
                sceneState.drawTextAt(descriptionLines[i], this.x + (30 * sceneState.scale), y, 20, "black", "left");
                y += descriptionLineHeight;
            }
        }
    }
}


const inventoryHoverModal = new InventoryHoverModal();
export default inventoryHoverModal;