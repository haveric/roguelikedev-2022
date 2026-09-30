import _Component from "../_Component";
import EquipmentType from "./EquipmentType";

export default class Equippable extends _Component {
    constructor(args = {}) {
        super(args, "equippable");

        this.slot = EquipmentType.MAIN_HAND;
        this.minDamage = 0;
        this.maxDamage = 0;
        this.power = 0;
        this.defense = 0;
        this.health = 0;
        this.lightRadius = 0;

        if (this.hasComponent()) {
            this.slot = this.loadArg("slot", EquipmentType.MAIN_HAND);
            this.loadRandArgRange("damage", "minDamage", "maxDamage", 0, 0);
            this.loadRandArg("power", 0);
            this.loadRandArg("defense", 0);
            this.loadRandArg("health", 0);
            this.loadRandArg("lightRadius", 0);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = this.getDefaultSaveJson();
        const typeJson = saveJson[this.type];

        typeJson.slot = this.slot;
        if (this.minDamage !== 0 || this.maxDamage !== 0) {
            if (this.minDamage === this.maxDamage) {
                typeJson.damage = this.minDamage;
            } else {
                typeJson.damage = this.minDamage + "," + this.maxDamage;
            }
        }

        if (this.power !== 0) {
            typeJson.power = this.power;
        }

        if (this.defense !== 0) {
            typeJson.defense = this.defense;
        }

        if (this.health !== 0) {
            typeJson.health = this.health;
        }

        if (this.lightRadius !== 0) {
            typeJson.lightRadius = this.lightRadius;
        }

        this.cachedSave = saveJson;
        return saveJson;
    }

    getDamageDisplay() {
        if (this.minDamage === this.maxDamage) {
            return this.minDamage;
        } else {
            return this.minDamage + " - " + this.maxDamage;
        }
    }
}