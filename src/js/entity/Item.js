import _Entity from "./_Entity";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";

export default class Item extends _Entity {
    constructor(args = {}) {
        args.type = "item";
        super(args);
    }

    save() {
        return super.save();
    }

    clone() {
        return new Item(this.save());
    }

    draw() {
        // TODO: Replace arbitrary 1.15
        const hex = this.getComponent("hex");
        const drawX = HexUtil.HEX_RADIUS_H + (HexUtil.HEX_RADIUS_H * (1 + Math.cos(HexUtil.HEX_A))) * hex.getDisplayX();
        const drawY = 1.15 * HexUtil.HEX_RADIUS_V + (2 * HexUtil.HEX_RADIUS_V * Math.sin(HexUtil.HEX_A)) * hex.getDisplayY();

        super.draw(drawX, drawY);

        sceneState.ctx.fillStyle = this.color || "white";
        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "bold 26px serif";
        sceneState.ctx.fillText(this.letter, drawX, drawY);
    }
}