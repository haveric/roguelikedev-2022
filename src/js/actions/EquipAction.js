import _Action from "./_Action";
import engine from "../Engine";
import equipmentView from "../ui/EquipmentView";
import inventoryView from "../ui/InventoryView";

export default class EquipAction extends _Action {
    constructor(entity, index) {
        super(entity);

        this.index = index;
    }

    perform() {
        const equipment = this.entity.getComponent("equipment");
        const inventory = this.entity.getComponent("inventory");

        const itemToEquip = inventory.get(this.index);
        const equippable = itemToEquip.getComponent("equippable");

        const equipmentSlot = equipment.getEquipmentSlot(equippable.slot);
        const equipmentItem = equipmentSlot.item;

        if (equipmentItem) {
            equipment.setItem(equipmentSlot.index, itemToEquip);
            inventory.set(this.index, equipmentItem);
        } else {
            equipment.setItem(equipmentSlot.index, inventory.remove(this.index));
        }

        this.entity.getComponent("fighter").calculateStats();

        inventoryView.update();
        equipmentView.update();
        engine.needsRenderUpdate = true;

        return this;
    }
}