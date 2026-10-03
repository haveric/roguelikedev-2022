import _Component from "./_Component";
import AIDead from "./ai/AIDead";
import messageManager from "../message/MessageManager";
import playerInfo from "../ui/PlayerInfo";
import engine from "../Engine";
import GameOverEventHandler from "../event/GameOverEventHandler";
import gameOver from "../ui/menu/GameOverMenu";
import sceneState from "../SceneState";
import MathUtil from "../util/MathUtil";

export default class Fighter extends _Component {
    constructor(args) {
        super(args, "fighter");

        this.baseHp = 0;
        this.hp = 0;
        this.maxHp = 0;
        this.baseDefense = 0;
        this.basePower = 0;
        this.baseLightRadius = 0;

        if (this.hasComponent()) {
            this.baseHp = this.loadArg("baseHp", 0);
            this.hp = this.loadArg("hp", 0);
            this.baseDefense = this.loadArg("defense", 0);
            this.basePower = this.loadArg("power", 0);
            this.baseLightRadius = this.loadArg("lightRadius", 0);
        }

        this.defense = 0;
        this.power = 0;
        this.maxHp = 0;
        this.minDamage = 0;
        this.maxDamage = 0;
        this.lightRadius = 0;
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = this.getDefaultSaveJson();
        const typeJson = saveJson[this.type];

        typeJson.baseHp = this.baseHp;
        typeJson.hp = this.hp;
        typeJson.defense = this.baseDefense;
        typeJson.power = this.basePower;
        typeJson.lightRadius = this.baseLightRadius;

        this.cachedSave = saveJson;
        return saveJson;
    }

    setBasePower(newPower) {
        this.basePower = newPower;
        this.updateUI();
        this.clearSaveCache();
    }

    setBaseDefense(newDefense) {
        this.baseDefense = newDefense;
        this.updateUI();
        this.clearSaveCache();
    }

    setMaxHp(newMaxHp) {
        this.maxHp = newMaxHp;
        this.updateUI();
        this.clearSaveCache();
    }

    setHp(newHp) {
        this.hp = Math.max(0, Math.min(newHp, this.maxHp));
        this.updateUI();
        this.clearSaveCache();
    }

    calculateStats() {
        const entity = this.parentEntity;
        let powerBonus = 0;
        let defenseBonus = 0;
        let healthBonus = 0;
        let minDamageBonus = 0;
        let maxDamageBonus = 0;
        let lightRadiusBonus = 0;
        const equipment = entity.getComponent("equipment");
        if (equipment) {
            for (const slot of equipment.slots) {
                const item = slot.item;
                if (item) {
                    const equippable = item.getComponent("equippable");
                    powerBonus += equippable.power;
                    defenseBonus += equippable.defense;
                    healthBonus += equippable.health;
                    minDamageBonus += equippable.minDamage;
                    maxDamageBonus += equippable.maxDamage;
                    lightRadiusBonus += equippable.lightRadius;
                }
            }
        }

        this.power = this.basePower + powerBonus;
        this.defense = this.baseDefense + defenseBonus;
        this.maxHp = this.baseHp + healthBonus;
        if (this.hp === null || this.hp >= this.maxHp) {
            this.hp = this.maxHp;
        }

        this.minDamage = this.power + minDamageBonus;
        this.maxDamage = this.power + maxDamageBonus;

        if (this.isPlayer()) {
            const lastLightRadius = this.lightRadius;
            this.lightRadius = this.baseLightRadius + lightRadiusBonus;
            if (this.lightRadius !== lastLightRadius) {
                engine.player.fov.compute(engine.player, this.lightRadius);
                engine.player.fov.updateMap();

                engine.needsRenderUpdate = true;
            }
        }

        this.updateUI();
    }

    getDamageDisplay() {
        if (this.minDamage === this.maxDamage) {
            return this.minDamage;
        } else {
            return this.minDamage + " - " + this.maxDamage;
        }
    }

    getDamage() {
        if (this.minDamage === this.maxDamage) {
            return this.minDamage;
        } else {
            return MathUtil.randIntBetween(this.minDamage, this.maxDamage);
        }
    }

    getBlockedDamage() {
        return Math.floor(MathUtil.randFloatBetween(this.defense / 10, this.defense) / 10);
    }

    heal(amount) {
        if (this.hp === this.maxHp) {
            return 0;
        }

        const newHp = Math.min(this.maxHp, this.hp + amount);
        const healedHp = newHp - this.hp;
        this.setHp(newHp);

        return healedHp;
    }

    takeDamage(damage) {
        this.setHp(this.hp - damage);

        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        const entity = this.parentEntity;
        if (this.isPlayer()) {
            messageManager.text("You died!", "#f00").build();
        } else {
            messageManager.text(entity.name + " dies!", "#ffa030").build();
            const playerLevel = engine.player.getComponent("level");
            const entityLevel = entity.getComponent("level");
            if (playerLevel && entityLevel) {
                playerLevel.addXp(entityLevel.xp);
            }
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

        if (this.isPlayer()) {
            gameOver.setPosition(sceneState.center.x - 100, sceneState.center.y * .7);
            gameOver.show();
            engine.setEventHandler(new GameOverEventHandler());
            engine.needsRenderUpdate = true;
        }
    }

    updateUI() {
        if (this.isPlayer()) {
            playerInfo.updateHealth(this.hp, this.maxHp);
            playerInfo.updatePower(this.power);
            playerInfo.updateDefense(this.defense);
        }
    }

    onComponentsLoaded() {
        this.calculateStats();
    }
}