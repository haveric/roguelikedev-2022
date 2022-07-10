import _Entity from "./_Entity";
import sceneState from "../SceneState";
import Hex from "../map/Hex";
import HexUtil from "../util/HexUtil";

export default class Actor extends _Entity {
    constructor() {
        super();

        this.hex = new Hex(0, 10);
    }

    draw() {
        // TODO: Replace arbitrary 1.15
        const drawX = HexUtil.HEX_RADIUS + (HexUtil.HEX_RADIUS * (1 + Math.cos(HexUtil.HEX_A))) * this.hex.getY();
        const drawY = 1.15 * HexUtil.HEX_RADIUS + (2 * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A)) * this.hex.getDisplayX();

        HexUtil.drawHex(sceneState.ctx, drawX, drawY);
        sceneState.ctx.fillStyle="blue";
        sceneState.ctx.fill();

        sceneState.ctx.fillStyle="white";
        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "26px serif";
        sceneState.ctx.fillText("@", drawX, drawY);
    }
}