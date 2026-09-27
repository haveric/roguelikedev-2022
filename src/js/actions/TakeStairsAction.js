import _Action from "./_Action";
import engine from "../Engine";
import messageManager from "../message/MessageManager";
import UnableToPerformAction from "./UnableToPerformAction";
import gameWorld from "../GameWorld";

export default class TakeStairsAction extends _Action {
    constructor(entity) {
        super(entity);
    }

    perform() {
        const entityHex = this.entity.getComponent("hex");
        const tile = engine.gameMap.getTileFromArrayCoords(entityHex.row, entityHex.col);
        if (tile.id === "stairs_down") {
            messageManager.text("You descend the staircase.").build();
            gameWorld.generateFloor();
        } else {
            return UnableToPerformAction("There are no stairs here.");
        }

        return this;
    }
}