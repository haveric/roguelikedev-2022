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
        this.processAction(this.eventHandler.handleInput());
    }

    processAction(action) {
        if (action && this.eventHandler.isPlayerTurn) {
            const performedAction = action.perform();
            if (performedAction instanceof NoAction) {
                return false;
            }

            if (performedAction instanceof UnableToPerformAction) {
                if (performedAction.reason) {
                    console.log(performedAction.reason);
                    //messageConsole.text(performedAction.reason).build();
                }
                return false;
            } else {
                engine.needsRenderUpdate = true;
                engine.player.fov.compute(engine.player, 5);
                engine.player.fov.updateMap();

                this.handleEnemyTurns();

                return true;
            }
        }
    }

    handleEnemyTurns() {

    }
}

const engine = new Engine();
export default engine;