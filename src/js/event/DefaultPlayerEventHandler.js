import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import BumpAction from "../actions/actionWithDirection/BumpAction";
import engine from "../Engine";
import WaitAction from "../actions/WaitAction";
import HexUtil from "../util/HexUtil";

export default class DefaultPlayerEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        let action = null;

        if (this.isPlayerTurn && engine.player.isAlive()) {
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
            } else if (controls.testPressed("wait")) {
                action = new WaitAction(engine.player);
            }
        }

        return action;
    }

    onMouseMove(e) {
        for (const tile of this.highlightedTiles) {
            tile.highlighted = false;
        }

        this.mouse.x = e.clientX;//(e.clientX / sceneState.canvas.offsetWidth) * 2 - 1;
        this.mouse.y = e.clientY;//-(e.clientY / sceneState.canvas.offsetHeight) * 2 + 1;

        const hex = HexUtil.pixelToHex(this.mouse);
        const tile = engine.gameMap.getTileFromHexCoords(hex.r, hex.q);
        if (tile) {
            const tileHex = tile.getComponent("hex");
            console.log(hex, tileHex.row, tileHex.col);
        }

        if (tile) {
            tile.highlighted = true;
            this.highlightedTiles.push(tile);
        }

        engine.needsRenderUpdate = true;
    }
}