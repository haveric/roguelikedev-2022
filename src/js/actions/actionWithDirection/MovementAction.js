import _ActionWithDirection from "./_ActionWithDirection";
import Hex from "../../map/Hex";
import engine from "../../Engine";
import UnableToPerformAction from "../UnableToPerformAction";

export default class MovementAction extends _ActionWithDirection {
    constructor(entity, dq, dr) {
        super(entity, dq, dr);
    }

    perform() {
        if (this.entity.hex) {
            const destHex = Hex.add(this.entity.hex, new Hex(this.dq, this.dr));
            if (!engine.gameMap.isInBounds(destHex.getX(), destHex.getY())) {
                return new UnableToPerformAction(this.entity, "Location is outside of the map!");
            }

            this.entity.hex.q += this.dq;
            this.entity.hex.r += this.dr;
        }

        return this;
    }
}