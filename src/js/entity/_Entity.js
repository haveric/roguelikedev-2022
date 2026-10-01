import componentLoader from "../components/ComponentLoader";
import Extend from "../util/Extend";
import ObjectUtil from "../util/ObjectUtil";

export default class _Entity {
    constructor(args) {
        this.type = args.type || "entity";
        this.id = args.id;
        this.name = args.name || "";
        this.description = args.description || "";
        this.sprites = args.sprites || [];
        this.letter = args.letter || "?";
        this.letterCorpse = args.letterCorpse || "?";
        this.color = args.color || "#fff";

        this.componentArray = [];
        this.components = {};
        if (args.components) {
            this.loadComponents(args, args.components);
            this.callEvent("onComponentsLoaded");
        }

        this.numSpritesLoaded = 0;
        this.numSprites = this.sprites.length;

        // Extra dynamic description (for Equippable items). Should not be saved.
        this.displayDescription = "";

        this.cachedSave = null;
    }

    spriteImageLoaded() {
        this.numSpritesLoaded ++;
        if (this.numSpritesLoaded === this.numSprites) {
            this.allSpritesLoaded();
        }
    }

    allSpritesLoaded() {}

    /**
     * @returns {_Entity}
     */
    clone() {
        console.error("Not implemented");
    }

    callEvent(event, args) {
        for (const component of this.componentArray) {
            component[event]?.(args);
        }

        this[event]?.(args);
    }

    draw(/*x, y*/) { }

    loadComponents(args, components) {
        const self = this;
        Object.keys(components).forEach(function(key) {
            const type = componentLoader.types.get(key);
            if (type) {
                const baseType = type.baseType;
                const existingComponent = self.getComponent(baseType);
                if (!existingComponent) {
                    self.setComponent(componentLoader.create(this, key, args), false);
                }
            }
        });

        this.clearSaveCache();
    }

    setComponent(component) {
        component.parentEntity = this;
        this.components[component.baseType] = component;
        this.componentArray.push(component);

        this.clearSaveCache();
    }

    getComponent(baseType) {
        return this.components[baseType];
    }

    removeComponent(baseType) {
        if (!this.components[baseType]) {
            return;
        }

        this.components[baseType] = undefined;
        for (const component of this.componentArray) {
            if (component.baseType === baseType) {
                const index = this.componentArray.indexOf(component);
                this.componentArray.splice(index, 1);
                break;
            }
        }

        this.clearSaveCache();
    }

    clearSaveCache() {
        this.cachedSave = null;
    }

    save() {
        if (this.cachedSave !== null) {
            return this.cachedSave;
        }

        const spritesJson = [];
        for (const sprite of this.sprites) {
            const spriteJson = {};
            spriteJson.path = sprite.path;
            if (sprite.color) {
                spriteJson.color = sprite.color;
            }
            spritesJson.push(spriteJson);
        }

        const json = {
            id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            sprites: spritesJson,
            letter: this.letter,
            color: this.color
        };

        json.components = {};
        for (const component of this.componentArray) {
            const save = component.save();
            if (!ObjectUtil.isEmpty(save)) {
                Extend.deep(json.components, save);
            }
        }

        this.cachedSave = json;
        return json;
    }
}