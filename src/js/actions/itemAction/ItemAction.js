import _Action from "../_Action";

export default class ItemAction extends _Action {
    constructor(entity, item) {
        super(entity);

        this.item = item;
    }

    perform() {
        const consumable = this.item.getComponent("consumable");
        if (consumable) {
            return consumable.activate(this, this.tile);
        }
    }
}