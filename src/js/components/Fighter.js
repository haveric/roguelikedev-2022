import _Component from "./_Component";
import AIDead from "./ai/AIDead";

export default class Fighter extends _Component {
    constructor(args) {
        super(args, "fighter");

        this.hp = 0;
        this.maxHp = 0;
        this.defense = 0;
        this.power = 0;

        if (this.hasComponent()) {
            this.hp = this.loadArg("hp", 0);
            this.maxHp = this.loadArg("maxHp", 0);
            this.defense = this.loadArg("defense", 0);
            this.power = this.loadArg("power", 0);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            fighter: {}
        };

        saveJson.fighter.hp = this.hp;
        saveJson.fighter.maxHp = this.maxHp;
        saveJson.fighter.defense = this.defense;
        saveJson.fighter.power = this.power;

        this.cachedSave = saveJson;
        return saveJson;
    }

    setHp(newHp) {
        this.hp = Math.max(0, Math.min(newHp, this.maxHp));
    }

    takeDamage(damage) {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.die();
        }

        this.clearSaveCache();
    }

    die() {
        const entity = this.parentEntity;
        if (this.isPlayer()) {
            console.log("You died!");
        } else {
            console.log(entity.name + " dies!");
        }

        entity.callEvent("onEntityDeath");

        const ai = entity.getComponent("ai");
        if (ai) {
            const aiArgs = {
                components: {
                    aiDead: {
                        previousAI: ai.type
                    }
                }
            };

            entity.removeComponent("ai");
            entity.setComponent(new AIDead(aiArgs));
        }

        this.clearSaveCache();
    }
}