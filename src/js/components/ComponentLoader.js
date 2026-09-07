import AIDead from "./ai/AIDead";
import AIMeleeChase from "./ai/AIMeleeChase";
import BlocksFov from "./BlocksFov";
import BlocksMovement from "./BlocksMovement";
import Faction from "./Faction";
import Fighter from "./Fighter";
import Fov from "./Fov";
import Hex from "./Hex";
import HealingConsumable from "./consumable/HealingConsumable";
import Inventory from "./Inventory";

class ComponentLoader {
    constructor() {
        this.types = new Map();

        this.init();
    }

    init() {
        this.load(new AIDead());
        this.load(new AIMeleeChase());

        this.load(new HealingConsumable());

        this.load(new BlocksFov());
        this.load(new BlocksMovement());
        this.load(new Faction());
        this.load(new Fighter());
        this.load(new Fov());
        this.load(new Hex());
        this.load(new Inventory());
    }

    load(component) {
        this.types.set(component.type, component);
    }

    create(entity, type, args) {
        const component = this.types.get(type);
        const constructor = component.constructor;
        return new constructor(args);
    }
}

const componentLoader = new ComponentLoader();
export default componentLoader;