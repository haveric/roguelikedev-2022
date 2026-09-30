import _Action from "./_Action";
import engine from "../Engine";
import equipmentView from "../ui/EquipmentView";
import inventoryView from "../ui/InventoryView";
import UnableToPerformAction from "./UnableToPerformAction";

export default class UnequipAction extends _Action {
    constructor(entity, index) {
        super(entity);

        this.index = index;
    }

    perform() {
        const equipment = this.entity.getComponent("equipment");
        const inventory = this.entity.getComponent("inventory");

        if (inventory.canAdd()) {
            const itemRemoved = equipment.removeItem(this.index);
            inventory.add(itemRemoved);

            this.entity.getComponent("fighter").calculateStats();

            inventoryView.update();
            equipmentView.update();
            engine.needsRenderUpdate = true;
        } else {
            return UnableToPerformAction(this.entity, "No room in inventory!");
        }

        return this;
    }
}