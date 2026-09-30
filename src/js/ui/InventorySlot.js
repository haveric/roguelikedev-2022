import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";

export default class InventorySlot {
    constructor(index) {
        this.index = index;
        this.q = 0;
        this.r = 0;
        this.item = null;
    }

    setPosition(q, r) {
        this.q = q;
        this.r = r;
    }

    draw(drawXY, scale = 1, offsetX = 0) {
        HexUtil.drawHex(sceneState.ctx, drawXY.x + offsetX, drawXY.y, scale);

        sceneState.ctx.fillStyle = "rgba(200, 200, 200, 1)";
        sceneState.ctx.fill();

        if (this.highlighted) {
            HexUtil.drawHex(sceneState.ctx, drawXY.x + offsetX, drawXY.y, scale);
            sceneState.ctx.fillStyle = "rgba(0,0,255,0.3)";
            sceneState.ctx.fill();
        }

        sceneState.ctx.strokeStyle = "rgba(50, 50, 50, 1)";
        sceneState.ctx.stroke();

        const item = this.item;
        if (item) {
            if (item.spriteImage) {
                if (item.canvas) {
                    sceneState.ctx.drawImage(item.canvas, 0, 0, item.canvas.width, item.canvas.height, drawXY.x + offsetX - (.5 * item.canvas.width * sceneState.scale * scale), drawXY.y - (.5 * item.canvas.height * sceneState.scale * scale), item.canvas.width * sceneState.scale * scale, item.canvas.height * sceneState.scale * scale);

                }
            } else {
                sceneState.drawTextAt(item.letter, drawXY.x + offsetX, drawXY.y, 39, item.color);
            }
        }
    }
}