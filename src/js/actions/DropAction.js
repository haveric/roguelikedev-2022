import _Action from "./_Action";
import engine from "../Engine";
import inventoryView from "../ui/InventoryView";

export default class DropAction extends _Action {
    constructor(entity, index) {
        super(entity);

        this.index = index;
    }

    perform() {
        const entityHex = this.entity.getComponent("hex");
        const droppedItem = this.entity.getComponent("inventory").remove(this.index);
        droppedItem.getComponent("hex").moveTo(entityHex.row, entityHex.col);
        engine.gameMap.items.push(droppedItem);

        inventoryView.update();
        engine.needsRenderUpdate = true;
        return this;
    }
}