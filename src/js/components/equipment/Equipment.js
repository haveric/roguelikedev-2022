import _Component from "../_Component";
import EquipmentType from "./EquipmentType";
import EquipmentSlot from "./EquipmentSlot";
import entityLoader from "../../entity/EntityLoader";

export default class Equipment extends _Component {
    constructor(args) {
        super(args, "equipment");

        this.slots = [];
        this.slots.push(new EquipmentSlot(EquipmentType.MAIN_HAND));
        this.slots.push(new EquipmentSlot(EquipmentType.OFF_HAND));
        this.slots.push(new EquipmentSlot(EquipmentType.HELMET));
        this.slots.push(new EquipmentSlot(EquipmentType.AMULET));
        this.slots.push(new EquipmentSlot(EquipmentType.BODY_ARMOR));
        this.slots.push(new EquipmentSlot(EquipmentType.RING));
        this.slots.push(new EquipmentSlot(EquipmentType.GLOVES));
        this.slots.push(new EquipmentSlot(EquipmentType.BELT));
        this.slots.push(new EquipmentSlot(EquipmentType.BOOTS));
        this.slots.push(new EquipmentSlot(EquipmentType.TORCH));

        for (let i = 0; i < this.slots.length; i++) {
            const slot = this.slots[i];
            slot.index = i;
        }

        if (this.hasComponent()) {
            const slotsToLoad = this.loadArg("slots");
            for (let i = 0; i < slotsToLoad.length; i++) {
                const item = slotsToLoad[i];
                if (item) {
                    let createdItem;
                    if (item.load !== undefined) {
                        createdItem = entityLoader.createFromTemplate(item.load, item);
                    } else {
                        createdItem = entityLoader.create(item);
                    }
                    createdItem.parentEntity = this;
                    this.slots[i].item = createdItem;
                }
            }
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const itemJson = [];
        for (const slot of this.slots) {
            const item = slot.item;
            if (item) {
                itemJson.push(JSON.stringify(item.save()));
            } else {
                itemJson.push(null);
            }
        }

        const saveJson = this.getDefaultSaveJson();
        const typeJson = saveJson[this.type];

        typeJson.slots = itemJson.slots;

        this.cachedSave = saveJson;
        return saveJson;
    }

    getEquipmentSlot(slotToGet) {
        for (const equipmentSlot of this.slots) {
            if (slotToGet === equipmentSlot.slot) {
                return equipmentSlot;
            }
        }

        return null;
    }

    getItem(index) {
        return this.slots[index].item;
    }

    setItem(index, value) {
        this.slots[index].item = value;

        this.clearSaveCache();
    }

    removeItem(indexToRemove) {
        const slot = this.slots[indexToRemove];
        const item = slot.item;
        slot.item = null;
        this.clearSaveCache();
        return item;
    }
}