import _Consumable from "./_Consumable";
import engine from "../../Engine";
import ItemAction from "../../actions/itemAction/ItemAction";
import UnableToPerformAction from "../../actions/UnableToPerformAction";
import messageManager from "../../message/MessageManager";
import AreaRangedEventHandler from "../../event/AreaRangedEventHandler";
import inventoryView from "../../ui/InventoryView";

export default class FireballConsumable extends _Consumable {
    constructor(args = {}) {
        super(args, "fireballConsumable");

        this.damage = 12;
        this.radius = 3;

        if (this.hasComponent()) {
            this.damage = this.loadArg("damage", 12);
            this.radius = this.loadArg("radius", 3);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            fireballConsumable: {}
        };

        saveJson.fireballConsumable.damage = this.damage;
        saveJson.fireballConsumable.radius = this.radius;

        this.cachedSave = saveJson;
        return saveJson;
    }

    getAction() {
        const self = this;

        engine.setEventHandler(new AreaRangedEventHandler(
            (hex) => {
                return new ItemAction(self.getConsumer(), self.parentEntity, {"hex": hex});
            },
            this.radius
        ));

        return null;
    }

    activate(action) {
        const consumer = this.getConsumer();
        const hex = action.args.hex;
        if (!hex) {
            return new UnableToPerformAction(consumer, "No tile selected.");
        }

        const targetTile = engine.gameMap.getTileFromArrayCoords(hex.row, hex.col);
        if (!targetTile) {
            return new UnableToPerformAction(consumer, "No tile at that location");
        }

        const targetTileFov = targetTile.getComponent("fov");
        if (!targetTileFov || !targetTileFov.explored) {
            return new UnableToPerformAction(consumer, "You can't see that tile");
        }

        let anyTargetsHit = false;
        for (const actor of engine.gameMap.actors) {
            if (!actor.isAlive()) {
                continue;
            }
            const actorHex = actor.getComponent("hex");
            const distance = hex.distanceTo(actorHex);
            if (distance <= this.radius) {
                messageManager.text("The " + actor.name + " is engulfed in a fiery explosion, taking " + this.damage + " damage!").build();
                actor.getComponent("fighter").takeDamage(this.damage);
                anyTargetsHit = true;
            }
        }

        if (!anyTargetsHit) {
            return new UnableToPerformAction(consumer, "There are no targets in the radius.");
        }

        this.consume();
        inventoryView.update();
        engine.needsRenderUpdate = true;

        return this;
    }
}