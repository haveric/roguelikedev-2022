import _Component from "./_Component";
import messageManager from "../message/MessageManager";

export default class Level extends _Component {
    constructor(args) {
        super(args, "level");

        this.level = 1;
        this.xp = 0;
        this.xpGiven = 0;

        if (this.hasComponent()) {
            this.level = this.loadArg("level");
            this.xp = this.loadArg("xp");
            this.xpGiven = this.loadArg("xpGiven");
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            level: {}
        };

        saveJson.level.level = this.level;
        saveJson.level.xp = this.xp;
        saveJson.level.xpGiven = this.xpGiven;

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

    levelUp() {
        this.level += 1;
        messageManager.text("You are now level " + this.level + "!").build();

        const fighter = this.parentEntity.getComponent("fighter");
        fighter.heal(fighter.maxHp);

        this.clearSaveCache();
    }
}