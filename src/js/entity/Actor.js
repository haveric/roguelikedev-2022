import _Entity from "./_Entity";
import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";
import CustomFov from "../map/fov/CustomFov";

export default class Actor extends _Entity {
    constructor(args = {}) {
        args.type = "actor";
        super(args);

        this.fov = new CustomFov();
    }

    clone() {
        return new Actor(this.save());
    }

    isAlive() {
        const fighter = this.getComponent("fighter");
        return fighter && fighter.hp > 0;
    }

    draw() {
        // TODO: Replace arbitrary 1.15
        const hex = this.getComponent("hex");
        const drawX = HexUtil.HEX_RADIUS + (HexUtil.HEX_RADIUS * (1 + Math.cos(HexUtil.HEX_A))) * hex.getDisplayY();
        const drawY = 1.15 * HexUtil.HEX_RADIUS + (2 * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A)) * hex.getDisplayX();

        super.draw(drawX, drawY);
        //HexUtil.drawHex(sceneState.ctx, drawX, drawY);
        // if (this.color) {
        //     sceneState.ctx.fillStyle = this.color;
        //     sceneState.ctx.fill();
        // }


        sceneState.ctx.fillStyle = this.color || "white";
        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "bold 26px serif";
        sceneState.ctx.fillText(this.letter, drawX, drawY);
    }


    setName(newName) {
        this.name = newName;
        this.clearSaveCache();
    }

    onEntityDeath() {
        // TODO: Handle these better
        this.letter = "%";
        this.color = "red";

        this.setName("Remains of " + this.name);
    }
}