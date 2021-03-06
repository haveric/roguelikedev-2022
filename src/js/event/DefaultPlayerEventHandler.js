import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import BumpAction from "../actions/actionWithDirection/BumpAction";
import engine from "../Engine";

export default class DefaultPlayerEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        let action = null;

        if (this.isPlayerTurn) {
            if (controls.testPressed("up")) {
                action = new BumpAction(engine.player, -1, 0);
            } else if (controls.testPressed("down")) {
                action = new BumpAction(engine.player, 1, 0);
            } else if (controls.testPressed("nw")) {
                action = new BumpAction(engine.player, 0, -1);
            } else if (controls.testPressed("ne")) {
                action = new BumpAction(engine.player, -1, 1);
            } else if (controls.testPressed("sw")) {
                action = new BumpAction(engine.player, 1, -1);
            } else if (controls.testPressed("se")) {
                action = new BumpAction(engine.player, 0, 1);
            }
        }

        return action;
    }
}