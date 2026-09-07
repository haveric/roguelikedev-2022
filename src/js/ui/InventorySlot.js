import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";

export default class InventorySlot {
    constructor(index) {
        this.index = index;
        this.q = 0;
        this.r = 0;
        this.item = null;
    }

    draw(drawXY, scale = 1) {
        HexUtil.drawHex(sceneState.ctx, drawXY.x, drawXY.y, scale);

        sceneState.ctx.fillStyle = "rgba(200, 200, 200, 1)";
        sceneState.ctx.fill();

        if (this.highlighted) {
            HexUtil.drawHex(sceneState.ctx, drawXY.x, drawXY.y, scale);
            sceneState.ctx.fillStyle = "rgba(0,0,255,0.3)";
            sceneState.ctx.fill();
        }

        sceneState.ctx.strokeStyle = "rgba(50, 50, 50, 1)";
        sceneState.ctx.stroke();

        if (this.item) {
            sceneState.drawTextAt(this.item.letter, drawXY.x, drawXY.y, 39, this.item.color);
        }
    }
}