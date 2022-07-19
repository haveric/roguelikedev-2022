import _ActionWithDirection from "./_ActionWithDirection";
import engine from "../../Engine";
import UnableToPerformAction from "../UnableToPerformAction";

export default class MovementAction extends _ActionWithDirection {
    constructor(entity, dq, dr) {
        super(entity, dq, dr);
    }

    perform() {
        const hex = this.entity.getComponent("hex");
        if (hex) {
            const destXY = hex.hexToArray(hex.q + this.dq, hex.r + this.dr);

            if (!engine.gameMap.isInBounds(destXY.x, destXY.y)) {
                return new UnableToPerformAction(this.entity, "Location is outside of the map!");
            }

            hex.moveTo(destXY.x, destXY.y);
        }

        return this;
    }
}