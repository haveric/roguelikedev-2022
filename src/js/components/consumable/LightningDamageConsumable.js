import _Consumable from "./_Consumable";
import engine from "../../Engine";
import messageManager from "../../message/MessageManager";
import inventoryView from "../../ui/InventoryView";
import UnableToPerformAction from "../../actions/UnableToPerformAction";

export default class LightningDamageConsumable extends _Consumable {
    constructor(args = {}) {
        super(args, "lightningDamageConsumable");

        this.damage = 0;
        this.maxRange = 1;

        if (this.hasComponent()) {
            this.damage = this.loadArg("damage", 0);
            this.maxRange = this.loadArg("maxRange", 1);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            lightningDamageConsumable: {}
        };

        saveJson.lightningDamageConsumable.damage = this.damage;
        saveJson.lightningDamageConsumable.maxRange = this.maxRange;

        this.cachedSave = saveJson;
        return saveJson;
    }

    activate(action) {
        const consumer = action.entity;
        const consumerHex = consumer.getComponent("hex");
        let closest_distance = -1;
        let target = null;

        for (const actor of engine.gameMap.actors) {
            if (consumer === actor) {
                continue;
            }

            if (!actor.isAlive()) {
                continue;
            }

            const actorHex = actor.getComponent("hex");
            const distance = consumerHex.distanceTo(actorHex);
            if (closest_distance === -1 || distance < closest_distance) {
                closest_distance = distance;
                target = actor;
            }
        }

        if (target) {
            messageManager.text("A lightning bolt strikes the " + target.name + " with a loud thunder, for " + this.damage + " damage!").build();
            target.getComponent("fighter").takeDamage(this.damage);
            this.consume();

            inventoryView.update();
            engine.needsRenderUpdate = true;
            return this;
        } else {
            return new UnableToPerformAction(action.entity, "No enemy is close enough to strike!");
        }
    }
}