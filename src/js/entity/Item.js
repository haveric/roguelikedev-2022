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

    draw(qOffset, rOffset) {
        const hex = this.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(hex, qOffset, rOffset);

        super.draw(drawXY.x, drawXY.y);

        sceneState.ctx.fillStyle = this.color || "white";
        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "bold " + (sceneState.scale * 26) + "px serif";
        sceneState.ctx.fillText(this.letter, drawXY.x, drawXY.y);
    }
}