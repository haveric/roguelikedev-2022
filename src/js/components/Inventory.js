import _Component from "./_Component";
import entityLoader from "../entity/EntityLoader";

export default class Inventory extends _Component {
    constructor(args) {
        super(args, "inventory");

        this.capacity = 40;
        this.items = [];

        if (this.hasComponent()) {
            this.capacity = this.loadArg("capacity", 40);

            const itemsToLoad = this.loadArg("items");
            for (let i = 0; i < itemsToLoad.length; i++) {
                const item = itemsToLoad[i];
                if (item) {
                    let createdItem;
                    if (item.load !== undefined) {
                        createdItem = entityLoader.createFromTemplate(item.load, item);
                    } else {
                        createdItem = entityLoader.create(item);
                    }
                    createdItem.parentEntity = this;
                    createdItem.index = i;
                    this.items.push(createdItem);
                } else {
                    this.items.push(null);
                }
            }
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const itemJson = [];
        for (const item of this.items) {
            if (item) {
                itemJson.push(JSON.stringify(item.save()));
            } else {
                itemJson.push(null);
            }
        }

        const saveJson = {
            inventory: {
                capacity: this.capacity,
                items: itemJson
            }
        };

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