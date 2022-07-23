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


        // sceneState.ctx.textAlign = "center";
        // sceneState.ctx.textBaseline = "middle";
        //
        // sceneState.ctx.font = "16px serif";
        // sceneState.ctx.fillStyle = "black";

        const fov = this.getComponent("fov");
        if (fov) {
            if (fov.explored) {
                HexUtil.drawHex(sceneState.ctx, x, y);
                if (this.color) {
                    sceneState.ctx.fillStyle = this.color;
                    sceneState.ctx.fill();
                }
                sceneState.ctx.stroke();

                if (!fov.visible) {
                    HexUtil.drawHex(sceneState.ctx, x, y);
                    sceneState.ctx.fillStyle = "rgba(0, 0, 0, .25)";
                    sceneState.ctx.fill();
                    sceneState.ctx.color = "rgba(0, 0, 0, .25)";
                    sceneState.ctx.stroke();
                }
            }
        }

        // const hex = this.getComponent("hex");
        // const playerHex = engine.player.getComponent("hex");
        //
        // const radius = 5;
        //
        // const distRow = Math.abs(playerHex.row - hex.row);
        // const distCol = Math.abs(playerHex.col - hex.col);
        // if (distRow < radius && distCol < radius) {
        //     sceneState.ctx.fillText("(" + hex.row + ", " + hex.col + ")", x, y+10);
        // }
        //
        // const distQ = Math.abs(playerHex.q - hex.q);
        // const distR = Math.abs(playerHex.r - hex.r);
        // const distS = Math.abs(playerHex.s - hex.s);
        // if (distQ < radius && distR < radius && distS < radius) {
        //     //sceneState.ctx.fillText(playerHex.q - hex.q, x, y);
        //
        //     //sceneState.ctx.fillText("(" + hex.q + ", " + hex.r + ")", x, y-10);
        //     //sceneState.ctx.fillText("(" + hex.row + ", " + hex.col + ")", x, y+10);
        // }
    }
}
