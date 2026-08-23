import _Entity from "./_Entity";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";

export default class Tile extends _Entity {
    constructor(args = {}) {
        args.type = "tile";
        super(args);

        this.borderColor = args.borderColor || "#000";
    }

    clone() {
        return new Tile(this.save());
    }

    save() {
        const saveJson = super.save();

        saveJson.borderColor = this.borderColor;

        return saveJson;
    }

    isWall() {
        return this.getComponent("blocksMovement")?.blocksMovement;
    }

    draw(qOffset, rOffset) {
        const hex = this.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(hex, qOffset, rOffset);
        const x = drawXY.x;
        const y = drawXY.y;

        const fov = this.getComponent("fov");
        if (sceneState.debugRenderMap || (fov && fov.explored)) {
            HexUtil.drawHex(sceneState.ctx, x, y);

            if (this.color) {
                sceneState.ctx.fillStyle = this.color;
                sceneState.ctx.fill();
            }

            sceneState.ctx.strokeStyle = this.borderColor;
            sceneState.ctx.stroke();

            if (sceneState.debugRenderMap || !fov.visible) {
                HexUtil.drawHex(sceneState.ctx, x, y);
                sceneState.ctx.fillStyle = "rgba(0, 0, 0, .25)";
                sceneState.ctx.fill();
                sceneState.ctx.color = "rgba(0, 0, 0, .25)";
                sceneState.ctx.stroke();
            }
        }

        // Debug show all tiles
        if (sceneState.debugRenderMap) {
            HexUtil.drawHex(sceneState.ctx, x, y);
            sceneState.ctx.fillStyle = this.color;
            sceneState.ctx.fill();
        }

        if (this.highlighted) {
            HexUtil.drawHex(sceneState.ctx, x, y);
            sceneState.ctx.fillStyle = "rgba(0,0,255,0.3)";
            sceneState.ctx.fill();
        }

        // Debug show coordinates
        // sceneState.drawTextAt(hex.q + ", " + hex.r, x, y, 12, "black");

        // sceneState.drawTextAt(hex.q + ", " + hex.r, x, y-5, 12, "black");
        // sceneState.drawTextAt(hex.row + ", " + hex.col, x, y+5, 12, "black");
    }
}
