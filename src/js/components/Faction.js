import _Component from "./_Component";

export default class Faction extends _Component {
    constructor(args = {}) {
        super(args, "faction");

        this.factions = [];
        this.enemies = [];

        if (this.hasComponent()) {
            this.factions = this.loadArgArray("factions");
            this.enemies = this.loadArgArray("enemies");
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = this.getDefaultSaveJson();
        const typeJson = saveJson[this.type];

        typeJson.factions = this.factions.toString();
        typeJson.enemies = this.enemies.toString();

        this.cachedSave = saveJson;
        return saveJson;
    }

    /**
     *
     * @param {Faction} otherFaction
     */
    isEnemyOf(otherFaction) {
        if (!otherFaction) {
            return false;
        }

        for (const faction of this.factions) {
            if (otherFaction.enemies.indexOf(faction) > -1) {
                return true;
            }
        }

        return false;
    }
}