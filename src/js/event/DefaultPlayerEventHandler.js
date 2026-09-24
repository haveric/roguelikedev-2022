import _EventHandler from "./_EventHandler";
import controls from "../controls/Controls";
import BumpAction from "../actions/actionWithDirection/BumpAction";
import engine from "../Engine";
import WaitAction from "../actions/WaitAction";
import HexUtil from "../util/HexUtil";
import viewInfo from "../ui/ViewInfo";
import sceneState from "../SceneState";
import PickupAction from "../actions/PickupAction";
import inventoryView from "../ui/InventoryView";
import inventoryHoverModal from "../ui/InventoryHoverModal";
import inventoryActionModal from "../ui/InventoryActionModal";
import InventoryActionEventHandler from "./InventoryActionEventHandler";
import DropAction from "../actions/DropAction";
import NoAction from "../actions/NoAction";

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
                action = new BumpAction(engine.player, 0, -1);
            } else if (controls.testPressed("down")) {
                action = new BumpAction(engine.player, 0, 1);
            } else if (controls.testPressed("nw")) {
                action = new BumpAction(engine.player, -1, 0);
            } else if (controls.testPressed("ne")) {
                action = new BumpAction(engine.player, 1, -1);
            } else if (controls.testPressed("sw")) {
                action = new BumpAction(engine.player, -1, 1);
            } else if (controls.testPressed("se")) {
                action = new BumpAction(engine.player, 1, 0);
            } else if (controls.testPressed("wait")) {
                action = new WaitAction(engine.player);
            } else if (controls.testPressed("pickup")) {
                action = new PickupAction(engine.player);
            }
        }

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

                tile.highlightColor = "rgba(0,0,255,0.3)";
                tile.highlighted = true;
                this.targetedTile = tile;

                viewInfo.updatePositionDetails(engine, tile);

                engine.needsRenderUpdate = true;
            }

            // if (this.targetedTile !== tile) {
            //     for (const pathTile of this.pathTiles) {
            //         pathTile.highlighted = false;
            //     }
            //     if (this.targetedTile) {
            //         this.targetedTile.highlighted = false;
            //     }
            //
            //     tile.highlighted = true;
            //     this.targetedTile = tile;
            //
            //     const tileFov = tile.getComponent("fov");
            //     if (tileFov && tileFov.visible) {
            //         const costGraph = engine.player.fov.getCostGraph();
            //         const playerHex = engine.player.getComponent("hex");
            //         const tileHex = tile.getComponent("hex");
            //         const path = engine.player.fov.getPath(costGraph, playerHex, tileHex);
            //         for (const pathNode of path) {
            //             const newRow = pathNode.row + engine.player.fov.left;
            //             const newCol = pathNode.col + engine.player.fov.top;
            //
            //             const pathNodeTile = engine.gameMap.getTileFromArrayCoords(newRow, newCol);
            //             pathNodeTile.highlighted = true;
            //             this.pathTiles.push(pathNodeTile);
            //         }
            //     }
            // }
        }

        const inventoryHex = HexUtil.pixelToHex({"x": this.mouse.x, "y": this.mouse.y}, 1.5);
        let foundSlot = false;
        for (const slot of inventoryView.slots) {
            if (slot.q === inventoryHex.q && slot.r === inventoryHex.r) {
                foundSlot = true;
                if (slot === this.targetedSlot) {
                    if (slot.item) {
                        inventoryHoverModal.setPosition(this.mouse.x, this.mouse.y);
                        engine.needsRenderUpdate = true;
                    }
                } else {
                    if (this.targetedSlot) {
                        this.targetedSlot.highlighted = false;
                    }

                    slot.highlighted = true;
                    this.targetedSlot = slot;

                    if (slot.item) {
                        inventoryHoverModal.setPosition(this.mouse.x, this.mouse.y);
                        inventoryHoverModal.setItem(slot.item);
                        inventoryHoverModal.show();
                    } else {
                        inventoryHoverModal.hide();
                    }

                    engine.needsRenderUpdate = true;
                }
                break;
            }
        }

        if (!foundSlot) {
            if (this.targetedSlot) {
                this.targetedSlot.highlighted = false;
            }

            inventoryHoverModal.hide();
            this.targetedSlot = null;

            engine.needsRenderUpdate = true;
        }
    }

    onRightClick(e) {
        e.preventDefault();

        if (this.targetedSlot) {
            if (this.targetedSlot.item) {
                this.targetedSlot.highlighted = false;

                inventoryHoverModal.hide();

                inventoryActionModal.setPosition(this.mouse.x, this.mouse.y);
                const consumableComponent = this.targetedSlot.item.getComponent("consumable");
                if (consumableComponent) {
                    inventoryActionModal.buttons[0].actionOrComponent = consumableComponent;
                }
                inventoryActionModal.buttons[1].actionOrComponent = new DropAction(engine.player, this.targetedSlot.index);
                inventoryActionModal.buttons[2].actionOrComponent = new NoAction(engine.player);
                inventoryActionModal.show();

                engine.setEventHandler(new InventoryActionEventHandler());

                engine.needsRenderUpdate = true;
            }
        }
    }
}