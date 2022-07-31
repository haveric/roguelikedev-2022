import _ActionWithDirection from "./_ActionWithDirection";
import engine from "../../Engine";
import HexUtil from "../../util/HexUtil";
import UnableToPerformAction from "../UnableToPerformAction";

export default class MeleeAction extends _ActionWithDirection {
    constructor(entity, dq, dr) {
        super(entity, dq, dr);
    }

    perform() {
        const hex = this.entity.getComponent("hex");
        if (hex) {
            const destXY = HexUtil.hexToArray(hex.q + this.dq, hex.r + this.dr);
            const blockingActor = engine.gameMap.getBlockingActorAtArrayLocation(destXY.x, destXY.y);
            if (blockingActor) {
                let name;
                let plural;
                if (this.isPlayer()) {
                    name = "You";
                    plural = "";
                } else {
                    name = this.entity.name;
                    plural = "s";
                }

                let blockingName;
                if (blockingActor === engine.player) {
                    blockingName = "You";
                } else {
                    blockingName = blockingActor.name;
                }

                const entityFighter = this.entity.getComponent("fighter");
                const actorFighter = blockingActor.getComponent("fighter");
                const damage = entityFighter.power - actorFighter.defense;

                let description = name + " attack" + plural + " " + blockingName;
                if (damage > 0) {
                    description += " for " + damage + " hit points.";

                    actorFighter.takeDamage(damage);
                } else {
                    description += ", but does no damage.";
                }

                console.log(description);
            } else {
                return new UnableToPerformAction(this.entity, "There's nothing to attack there!");
            }
        }

        return this;
    }
}