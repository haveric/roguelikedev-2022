import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import engine from "../Engine";
import HexUtil from "../util/HexUtil";
import viewInfo from "../ui/ViewInfo";
import sceneState from "../SceneState";
import inventoryActionModal from "../ui/InventoryActionModal";
import DefaultPlayerEventHandler from "./DefaultPlayerEventHandler";

export default class SingleRangedEventHandler extends _EventHandler {
    constructor(callback) {
        super();

        this.callback = callback;
    }

    teardown() {
        super.teardown();
    }

    handleInput() {
        const action = null;

        // DEBUG Actions
        if (controls.testPressed("debug_map")) {
            sceneState.debugRenderMap = sceneState.debugRenderMap !== true;
            engine.needsRenderUpdate = true;
        }

        return action;
    }

    onMouseMove(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        const hex = HexUtil.pixelToHex({"x": this.mouse.x, "y": this.mouse.y});
        const playerHex = engine.player.getComponent("hex");

        const qOffset = playerHex.q;
        const rOffset = playerHex.r;
        const tile = engine.gameMap.getTileFromHexCoords(hex.q + qOffset, hex.r + rOffset);
        if (tile) {
            if (tile !== this.targetedTile) {
                if (this.targetedTile) {
                    this.targetedTile.highlighted = false;
                }
                /* TODO: Play with stripes
                var gradient = ctx.createLinearGradient(0, 0, 400, 0);
                gradient.addColorStop(0, 'darkred');
                gradient.addColorStop(0.08, 'red');
                gradient.addColorStop(0.5, 'white');
                gradient.addColorStop(0.92, 'red');
                gradient.addColorStop(1, 'darkred');
                */

                if (playerHex.distanceTo(hex) <= this.range) {
                    tile.highlightColor = "rgba(000,255,0,0.3)";
                } else {
                    tile.highlightColor = "rgba(255,0,0,0.3)";
                }
                tile.highlighted = true;
                this.targetedTile = tile;

                viewInfo.updatePositionDetails(engine, tile);

                engine.needsRenderUpdate = true;
            }
        }
    }

    onLeftClick(e) {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;

        const hex = HexUtil.pixelToHex({"x": this.mouse.x, "y": this.mouse.y});
        const playerHex = engine.player.getComponent("hex");

        const qOffset = playerHex.q;
        const rOffset = playerHex.r;
        const tile = engine.gameMap.getTileFromHexCoords(hex.q + qOffset, hex.r + rOffset);
        if (tile) {
            tile.highlighted = false;
            this.targetedTile = null;

            inventoryActionModal.hide();

            engine.processAction(this.callback(tile.getComponent("hex")));
        } else {
            engine.processAction(this.callback(null));
        }

        engine.setEventHandler(new DefaultPlayerEventHandler());
        engine.needsRenderUpdate = true;
    }
}