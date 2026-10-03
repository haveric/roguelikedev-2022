import _Component from "./_Component";
import messageManager from "../message/MessageManager";
import LevelUpEventHandler from "../event/LevelUpEventHandler";
import levelUp from "../ui/menu/LevelUpMenu";
import engine from "../Engine";
import sceneState from "../SceneState";

export default class Level extends _Component {
    constructor(args) {
        super(args, "level");

        this.level = 1;
        this.xp = 0;

        if (this.hasComponent()) {
            this.level = this.loadArg("level", 1);
            this.xp = this.loadArg("xp", 0);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = this.getDefaultSaveJson();
        const typeJson = saveJson[this.type];

        typeJson.level = this.level;
        typeJson.xp = this.xp;

        this.cachedSave = saveJson;
        return saveJson;
    }

    xpForLevel(level) {
        return 75 * ((level * level) + level);
    }

    requiresLevelUp() {
        return this.xp >= this.xpForLevel(this.level);
    }

    getPercentXPTowardsLevel() {
        const previousLevelXp = this.xpForLevel(this.level - 1);
        const levelXpAdjusted = this.xpForLevel(this.level) - previousLevelXp;
        const xpAdjusted = this.xp - previousLevelXp;
        return (xpAdjusted / levelXpAdjusted) * 100;
    }

    addXp(xp) {
        if (xp > 0) {
            this.xp += xp;
            if (this.requiresLevelUp()) {
                this.levelUp();
            }
        }

        this.clearSaveCache();
    }

    levelUp() {
        this.level += 1;
        messageManager.text("You are now level " + this.level + "!").build();

        const fighter = this.parentEntity.getComponent("fighter");
        fighter.heal(fighter.maxHp);

        levelUp.setPosition(sceneState.center.x - 150, sceneState.center.y * .7);
        levelUp.show();
        engine.setEventHandler(new LevelUpEventHandler());
    }

    increaseMaxHp(amount) {
        const fighter = this.parentEntity.getComponent("fighter");

        fighter.setMaxHp(fighter.maxHp + amount);
        fighter.setHp(fighter.hp + amount);

        messageManager.text("Your health has increased by " + amount + "!").build();
    }

    increasePower(amount) {
        const fighter = this.parentEntity.getComponent("fighter");
        fighter.setBasePower(fighter.power + amount);

        messageManager.text("Your power has increased by " + amount + ". You feel stronger!").build();
    }

    increaseDefense(amount) {
        const fighter = this.parentEntity.getComponent("fighter");
        fighter.setBaseDefense(fighter.defense + amount);

        messageManager.text("Your defense has increased by " + amount + ". Your movements are getting swifter!").build();
    }
}