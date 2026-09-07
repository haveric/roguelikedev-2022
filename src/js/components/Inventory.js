import _Component from "./_Component";

export default class Inventory extends _Component {
    constructor(args) {
        super(args, "inventory");

        this.capacity = 40;
        this.items = [];

        if (this.hasComponent()) {
            this.capacity = this.loadArg("capacity", 40);
            // TODO: Load items array
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            inventory: {}
        };

        // TODO:

        this.cachedSave = saveJson;
        return saveJson;
    }

    add(itemToAdd) {
        for (let i = 0; i < this.capacity; i++) {
            const item = this.items[i];
            if (!item) {
                itemToAdd.parentEntity = this;
                itemToAdd.index = i;
                this.items[i] = itemToAdd;
                return true;
            }
        }

        return false;
    }

    remove(indexToRemove) {
        const item = this.items[indexToRemove];
        this.items[indexToRemove] = null;
        return item;
    }

    use(item/*, amount = 1*/) {
        this.remove(item.index);
    }
}