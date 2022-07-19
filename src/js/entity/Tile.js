import _Entity from "./_Entity";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";

export default class Tile extends _Entity {
    constructor(args = {}) {
        args.type = "tile";
        super(args);
    }

    clone() {
        return new Tile(this.save());
    }

    isWall() {
        return this.getComponent("blocksMovement") && this.getComponent("blocksMovement").blocksMovement;
    }

    draw(x, y) {
        HexUtil.drawHex(sceneState.ctx, x, y);
        if (this.color) {
            sceneState.ctx.fillStyle = this.color;
            sceneState.ctx.fill();
        }
        sceneState.ctx.stroke();

        // sceneState.ctx.textAlign = "center";
        // sceneState.ctx.textBaseline = "middle";
        //
        // sceneState.ctx.font = "10px serif";
        // sceneState.ctx.fillStyle = "black";
        // const hex = this.getComponent("hex");
        // sceneState.ctx.fillText("(" + hex.q + ", " + hex.r + ")", x, y-5);
        // sceneState.ctx.fillText("(" + hex.row + ", " + hex.col + ")", x, y+5);
    }
}
