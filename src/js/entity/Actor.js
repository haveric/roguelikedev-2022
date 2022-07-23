import _Entity from "./_Entity";
import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";
import SimpleHexFov from "../map/fov/SimpleHexFov";

export default class Actor extends _Entity {
    constructor(args = {}) {
        args.type = "actor";
        super(args);

        this.fov = new SimpleHexFov();
    }

    clone() {
        return new Actor(this.save());
    }

    draw() {
        // TODO: Replace arbitrary 1.15
        const hex = this.getComponent("hex");
        const drawX = HexUtil.HEX_RADIUS + (HexUtil.HEX_RADIUS * (1 + Math.cos(HexUtil.HEX_A))) * hex.getDisplayY();
        const drawY = 1.15 * HexUtil.HEX_RADIUS + (2 * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A)) * hex.getDisplayX();

        super.draw(drawX, drawY);
        HexUtil.drawHex(sceneState.ctx, drawX, drawY);
        if (this.color) {
            sceneState.ctx.fillStyle = this.color;
            sceneState.ctx.fill();
        }
        sceneState.ctx.stroke();

        sceneState.ctx.fillStyle="white";
        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "26px serif";
        sceneState.ctx.fillText("@", drawX, drawY);
    }
}