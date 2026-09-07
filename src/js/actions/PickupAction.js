import _Action from "./_Action";
import engine from "../Engine";
import UnableToPerformAction from "./UnableToPerformAction";
import inventoryView from "../ui/InventoryView";

export default class PickupAction extends _Action {
    constructor(entity) {
        super(entity);
    }

    perform() {
        const entityHex = this.entity.getComponent("hex");
        const entityInventory = this.entity.getComponent("inventory");
        for (let i = engine.gameMap.items.length - 1; i >= 0; i--) {
            const item = engine.gameMap.items[i];
            const itemHex = item.getComponent("hex");
            if (entityHex.equals(itemHex)) {
                const success = entityInventory.add(item);
                if (success) {
                    engine.gameMap.items.splice(i, 1);
                    inventoryView.update();
                } else {
                    return new UnableToPerformAction(this.entity, "Inventory is full!");
                }
            }
        }

        return this;
    }
}