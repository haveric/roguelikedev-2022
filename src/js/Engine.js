import NoAction from "./actions/NoAction";
import UnableToPerformAction from "./actions/UnableToPerformAction";
import messageManager from "./message/MessageManager";
import Settings from "./Settings";

class Engine {
    constructor() {
        this.eventHandler = null;
        this.settings = new Settings();
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
            if (performedAction instanceof NoAction) {
                return false;
            } else if (performedAction instanceof UnableToPerformAction) {
                if (performedAction.reason) {
                    messageManager.text(performedAction.reason).build();
                    engine.needsRenderUpdate = true;
                }
                return false;
            }

            engine.needsRenderUpdate = true;
            const lightRadius = engine.player.getComponent("fighter").lightRadius;
            engine.player.fov.compute(engine.player, lightRadius);
            engine.player.fov.updateMap();

            this.handleEnemyTurns();
            return true;
        }
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

    setEventHandler(eventHandler) {
        if (this.eventHandler) {
            this.eventHandler.teardown();
        }
        this.eventHandler = eventHandler;
        this.needsRenderUpdate = true;
    }

    save(name) {
        const saveJson = {
            "version": 1,
            "name": name,
            "date": new Date(),
            "map": this.gameMap.save()
        };

        localStorage.setItem(name, JSON.stringify(saveJson));
    }
}

const engine = new Engine();
export default engine;