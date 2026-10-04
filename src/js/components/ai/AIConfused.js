import _AI from "./_AI";
import messageManager from "../../message/MessageManager";
import WanderAction from "../../actions/WanderAction";
import componentLoader from "../ComponentLoader";

export default class AIConfused extends _AI {
    constructor(entity) {
        super(entity, "aiConfused");

        this.previousAI = null;
        this.turnsRemaining = 0;

        if (this.hasComponent()) {
            this.previousAI = this.loadArg("previousAI", null);
            this.turnsRemaining = this.loadArg("turnsRemaining", 0);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = this.getDefaultSaveJson();
        const typeJson = saveJson[this.type];

        if (this.previousAI !== null) {
            typeJson.previousAI = this.previousAI;
        }
        typeJson.turnsRemaining = this.turnsRemaining;

        this.cachedSave = saveJson;
        return saveJson;
    }

    setTurnsRemaining(turnsRemaining) {
        this.turnsRemaining = turnsRemaining;
        this.clearSaveCache();
    }

    perform() {
        if (this.turnsRemaining <= 0) {
            messageManager.text("The " + this.parentEntity.name + " is no longer confused.").build();

            const newAIComponent = componentLoader.create(this.parentEntity, this.previousAI);
            this.parentEntity.setComponent(newAIComponent);
        } else {
            this.setTurnsRemaining(this.turnsRemaining - 1);

            return new WanderAction(this.parentEntity).perform();
        }
    }
}