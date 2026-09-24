import _AI from "./_AI";
import messageManager from "../../message/MessageManager";
import WanderAction from "../../actions/WanderAction";

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

        const saveJson = {
            aiConfused: {}
        };

        if (this.previousAI !== null) {
            saveJson.aiConfused.previousAI = this.previousAI;
        }
        saveJson.aiConfused.turnsRemaining = this.turnsRemaining;

        this.cachedSave = saveJson;
        return saveJson;
    }

    perform() {
        if (this.turnsRemaining <= 0) {
            messageManager.text("The " + this.parentEntity.name + " is no longer confused.").build();
            this.parentEntity.setComponent(this.previousAI);
        } else {
            this.turnsRemaining--;

            return new WanderAction(this.parentEntity).perform();
        }
    }
}