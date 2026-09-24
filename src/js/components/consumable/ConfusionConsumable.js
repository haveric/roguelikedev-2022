import _Consumable from "./_Consumable";
import SingleRangedEventHandler from "../../event/SingleRangedEventHandler";
import engine from "../../Engine";
import ItemAction from "../../actions/itemAction/ItemAction";
import UnableToPerformAction from "../../actions/UnableToPerformAction";
import messageManager from "../../message/MessageManager";
import AIConfused from "../ai/AIConfused";

export default class ConfusionConsumable extends _Consumable {
    constructor(args = {}) {
        super(args, "confusionConsumable");

        this.turns = 0;

        if (this.hasComponent()) {
            this.turns = this.loadArg("turns", 0);
        }
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            confusionConsumable: {}
        };

        saveJson.confusionConsumable.turns = this.turns;

        this.cachedSave = saveJson;
        return saveJson;
    }

    getAction() {
        const self = this;

        engine.setEventHandler(new SingleRangedEventHandler(
            (hex) => {
                return new ItemAction(self.getConsumer(), self.parentEntity, {"hex": hex});
            }
        ));

        return null;
    }

    activate(action) {
        const consumer = this.getConsumer();
        const hex = action.args.hex;
        if (!hex) {
            return new UnableToPerformAction(consumer, "No tile selected.");
        }

        const targetTile = engine.gameMap.getTileFromArrayCoords(hex.row, hex.col);
        if (!targetTile) {
            return new UnableToPerformAction(consumer, "No tile at that location");
        }

        const targetTileFov = targetTile.getComponent("fov");
        if (!targetTileFov || !targetTileFov.explored) {
            return new UnableToPerformAction(consumer, "You can't see that tile");
        }

        const targetActor = engine.gameMap.getActorAtArrayLocation(hex.row, hex.col);
        if (!targetActor) {
            return new UnableToPerformAction(consumer, "No target at that location");
        }

        if (consumer === targetActor) {
            return new UnableToPerformAction(consumer, "You can't confuse yourself!");
        }

        messageManager.text("The eyes of the " + targetActor.name + " look vacant, as it starts to stumble around!").build();

        const previousAI = targetActor.getComponent("ai");
        targetActor.setComponent(new AIConfused({components: {aiConfused: {turnsRemaining: this.turns, previousAI: previousAI}}}));

        this.consume();
    }
}