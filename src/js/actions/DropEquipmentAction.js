import _Action from "./_Action";
import engine from "../Engine";
import Hex from "../components/Hex";
import equipmentView from "../ui/EquipmentView";

export default class DropEquipmentAction extends _Action {
    constructor(entity, index) {
        super(entity);

        this.index = index;
    }

    perform() {
        const entityHex = this.entity.getComponent("hex");
        const droppedItem = this.entity.getComponent("equipment").removeItem(this.index);

        const droppedItemHex = droppedItem.getComponent("hex");
        if (droppedItemHex) {
            droppedItemHex.moveTo(entityHex.row, entityHex.col);
        } else {
            droppedItem.setComponent(new Hex({components: {hex: {row: entityHex.row, col: entityHex.col}}}));
        }
        engine.gameMap.items.push(droppedItem);

        equipmentView.update();

        this.entity.getComponent("fighter").calculateStats();

        engine.needsRenderUpdate = true;
        return this;
    }
}