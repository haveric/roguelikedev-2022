import engine from "../Engine";
import MathUtil from "../util/MathUtil";

export default class _Component {
    constructor(argsJson = {}, baseType, type) {
        this.argsJson = argsJson;
        this.baseType = baseType || "component";
        this.type = type || this.baseType;
        this.parentEntity = argsJson.parentEntity;

        this.cachedSave = null;
    }

    clearSaveCache() {
        this.cachedSave = null;
        this.parentEntity?.clearSaveCache();
    }

    getDefaultSaveJson() {
        const json = {};
        json[this.type] = {};

        return json;
    }

    save() {
        return null;
    }

    hasComponent() {
        return this.argsJson.components && this.argsJson.components[this.type] !== undefined;
    }

    isPlayer(entity = this.parentEntity) {
        return entity === engine.player;
    }

    saveBoolean(arg, defaultValue) {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {};
        if (arg !== defaultValue) {
            saveJson[this.type] = arg;
        }

        this.cachedSave = saveJson;
        return saveJson;
    }

    loadBooleanOrObject(name) {
        const type = typeof this.argsJson.components[this.type];
        if (type === "boolean") {
            return this.argsJson.components[this.type];
        } else if (type === "object") {
            return this.argsJson.components[this.type][name];
        }
    }

    loadArg(name, defaultValue) {
        // TODO: 0 should be a valid value
        return this.argsJson.components[this.type][name] || defaultValue;
    }

    loadArgArray(name) {
        const array = [];
        const items = this.argsJson.components[this.type][name].split(",");
        for (const item of items) {
            array.push(item.trim());
        }

        return array;
    }

    loadRandArg(name, defaultValue) {
        this[name] = defaultValue;

        const arg = this.argsJson.components[this.type][name];
        if (arg !== undefined) {
            this[name] = this.parseRandIntBetween(arg);
        }
    }

    loadRandArgRange(name, minName, maxName, defaultMinValue, defaultMaxValue) {
        this[minName] = defaultMinValue;
        this[maxName] = defaultMaxValue;

        const arg = this.argsJson.components[this.type][name];
        if (arg !== undefined) {
            const type = typeof arg;
            if (type === "string") {
                const values = arg.split(",");
                this[minName] = this.parseRandIntBetween(values[0]);
                if (values.length > 1) {
                    this[maxName] = this.parseRandIntBetween(values[1]);
                } else {
                    this[maxName] = this[minName];
                }
            } else {
                this[minName] = arg;
                this[maxName] = arg;
            }
        }
    }

    parseRandIntBetween(value) {
        if (typeof value === "string") {
            const split = value.trim().split("-");
            if (split.length > 1) {
                return MathUtil.randIntBetween(parseInt(split[0].trim()), parseInt(split[1].trim()));
            } else {
                return parseInt(split[0].trim());
            }
        } else {
            return value;
        }
    }
}