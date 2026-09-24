import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import engine from "../Engine";
import HexUtil from "../util/HexUtil";
import viewInfo from "../ui/ViewInfo";
import sceneState from "../SceneState";
import inventoryActionModal from "../ui/InventoryActionModal";
import DefaultPlayerEventHandler from "./DefaultPlayerEventHandler";

export default class AreaRangedEventHandler extends _EventHandler {
    constructor(callback, radius) {
        super();

        this.callback = callback;
        this.radius = radius;
        this.highlightedTiles = [];
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

                    for (const highlightedTile of this.highlightedTiles) {
                        highlightedTile.highlighted = false;
                    }
                    this.highlightedTiles = [];
                }
                /* TODO: Play with stripes
                var gradient = ctx.createLinearGradient(0, 0, 400, 0);
                gradient.addColorStop(0, 'darkred');
                gradient.addColorStop(0.08, 'red');
                gradient.addColorStop(0.5, 'white');
                gradient.addColorStop(0.92, 'red');
                gradient.addColorStop(1, 'darkred');
                */
                let highlightColor;
                if (playerHex.distanceTo(hex) <= this.range) {
                    highlightColor = "rgba(000,255,0,0.3)";
                } else {
                    highlightColor = "rgba(255,0,0,0.3)";
                }
                tile.highlightColor = highlightColor;
                tile.highlighted = true;

                this.targetedTile = tile;
                this.highlightedTiles = engine.gameMap.getTilesInRadius(hex.q + qOffset, hex.r + rOffset, this.radius);

                for (const highlightedTile of this.highlightedTiles) {
                    highlightedTile.highlightColor = highlightColor;
                    highlightedTile.highlighted = true;
                }
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

        for (const highlightedTile of this.highlightedTiles) {
            highlightedTile.highlighted = false;
        }
        this.highlightedTiles = [];

        engine.setEventHandler(new DefaultPlayerEventHandler());
        engine.needsRenderUpdate = true;
    }
}