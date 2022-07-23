import BlocksFov from "./BlocksFov";
import BlocksMovement from "./BlocksMovement";
import Fov from "./Fov";
import Hex from "./Hex";

class ComponentLoader {
    constructor() {
        this.types = new Map();

        this.init();
    }

    init() {
        this.load(new BlocksFov());
        this.load(new BlocksMovement());
        this.load(new Fov());
        this.load(new Hex());
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