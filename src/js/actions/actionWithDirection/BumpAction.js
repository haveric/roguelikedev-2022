import _ActionWithDirection from "./_ActionWithDirection";
import engine from "../../Engine";
import HexUtil from "../../util/HexUtil";
import MeleeAction from "./MeleeAction";
import MovementAction from "./MovementAction";

export default class BumpAction extends _ActionWithDirection {
    constructor(entity, dq, dr) {
        super(entity, dq, dr);
    }

    perform() {
        const hex = this.entity.getComponent("hex");
        if (hex) {
            const destXY = HexUtil.hexToArray(hex.q + this.dq, hex.r + this.dr);
            const blockingActor = engine.gameMap.getBlockingActorAtArrayLocation(destXY.x, destXY.y);
            if (blockingActor) {
                return new MeleeAction(this.entity, this.dq, this.dr).perform();
            } else {
                return new MovementAction(this.entity, this.dq, this.dr).perform();
            }
        }

        return this;
    }
}