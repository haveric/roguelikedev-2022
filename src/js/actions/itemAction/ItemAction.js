import _Action from "../_Action";

export default class ItemAction extends _Action {
    constructor(entity, item, args) {
        super(entity);

        this.item = item;
        this.argsJson = args;
    }

    perform() {
        const consumable = this.item.getComponent("consumable");
        if (consumable) {
            return consumable.activate(this, this.tile, this.args);
        }
    }
}