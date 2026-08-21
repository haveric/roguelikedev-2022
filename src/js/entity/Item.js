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

        sceneState.drawTextAt(this.letter, drawXY.x, drawXY.y, 26, this.color);
    }
}