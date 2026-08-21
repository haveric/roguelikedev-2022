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