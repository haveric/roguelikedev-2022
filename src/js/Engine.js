import NoAction from "./actions/NoAction";
import UnableToPerformAction from "./actions/UnableToPerformAction";

class Engine {
    constructor() {
        this.eventHandler = null;
        this.player = null;
        this.gameMap = null;
        this.needsRenderUpdate = false;
    }

    handleEvents() {
        return this.processAction(this.eventHandler.handleInput());
    }

    processAction(action) {
        if (action && this.eventHandler.isPlayerTurn) {
            const performedAction = action.perform();
            if (performedAction instanceof NoAction || performedAction instanceof UnableToPerformAction) {
                return performedAction;
            }

            engine.needsRenderUpdate = true;
            engine.player.fov.compute(engine.player, 5);
            engine.player.fov.updateMap();

            this.handleEnemyTurns();

            return performedAction;
        }

        return null;
    }

    handleEnemyTurns() {
        this.eventHandler.isPlayerTurn = false;

        for (const actor of this.gameMap.actors) {
            if (actor !== this.player) {
                const ai = actor.getComponent("ai");
                if (ai) {
                    ai.perform();
                }
            }
        }

        this.eventHandler.isPlayerTurn = true;
    }
}

const engine = new Engine();
export default engine;