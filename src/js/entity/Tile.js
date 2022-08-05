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

    draw(x, y) {
        const fov = this.getComponent("fov");
        if (fov) {
            if (fov.explored) {
                HexUtil.drawHex(sceneState.ctx, x, y);

                if (this.color) {
                    sceneState.ctx.fillStyle = this.color;
                    sceneState.ctx.fill();
                }

                sceneState.ctx.strokeStyle = this.borderColor;
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

        // Debug show all tiles
        // HexUtil.drawHex(sceneState.ctx, x, y);
        // sceneState.ctx.fillStyle = this.color;
        // sceneState.ctx.fill();

        if (this.highlighted) {
            HexUtil.drawHex(sceneState.ctx, x, y);
            sceneState.ctx.fillStyle = "rgba(0,0,255,0.3)";
            sceneState.ctx.fill();
        }

        // Debug show coordinates
        // sceneState.ctx.textAlign = "center";
        // sceneState.ctx.textBaseline = "middle";
        //
        // sceneState.ctx.font = "12px serif";
        // sceneState.ctx.fillStyle = "black";
        //
        // const hex = this.getComponent("hex");
        // sceneState.ctx.fillText(hex.q + ", " + hex.r, x, y);
    }
}
