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
import inventoryActionModal from "../ui/menu/InventoryActionModal";
import InventoryActionEventHandler from "./InventoryActionEventHandler";
import DropInventoryAction from "../actions/DropInventoryAction";
import NoAction from "../actions/NoAction";
import mainMenu from "../ui/menu/MainMenu";
import MainMenuEventHandler from "./MainMenuEventHandler";
import TakeStairsAction from "../actions/TakeStairsAction";
import equipmentView from "../ui/EquipmentView";
import DropEquipmentAction from "../actions/DropEquipmentAction";
import UnequipAction from "../actions/UnequipAction";
import EquipAction from "../actions/EquipAction";

export default class DefaultPlayerEventHandler extends _EventHandler {
    constructor() {
        super();
    }

    teardown() {
        if (this.targetedTile) {
            this.targetedTile.highlighted = false;
        }

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
            } else if (controls.testPressed("stairs_down")) {
                action = new TakeStairsAction(engine.player);
            }
        }

        if (controls.testPressed("pause")) {
            mainMenu.setPosition(sceneState.center.x - 100, sceneState.center.y * .7);

            mainMenu.show();

            engine.setEventHandler(new MainMenuEventHandler());
            engine.needsRenderUpdate = true;
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
        } else {
            if (this.targetedTile) {
                this.targetedTile.highlighted = false;
                this.targetedTile = null;
                engine.needsRenderUpdate = true;
            }
        }

        let foundAnyItem = false;
        const inventoryHex = HexUtil.pixelToHex({"x": this.mouse.x, "y": this.mouse.y}, 1.5);
        let foundInventorySlot = false;
        for (const slot of inventoryView.slots) {
            if (slot.q === inventoryHex.q && slot.r === inventoryHex.r) {
                foundInventorySlot = true;
                if (slot === this.targetedInventorySlot) {
                    if (slot.item) {
                        inventoryHoverModal.setPosition(this.mouse.x, this.mouse.y);
                        engine.needsRenderUpdate = true;
                        foundAnyItem = true;
                    }
                } else {
                    if (this.targetedInventorySlot) {
                        this.targetedInventorySlot.highlighted = false;
                    }

                    slot.highlighted = true;
                    this.targetedInventorySlot = slot;

                    if (slot.item) {
                        inventoryHoverModal.setPosition(this.mouse.x, this.mouse.y);
                        inventoryHoverModal.setItem(slot.item);
                        inventoryHoverModal.show();
                        foundAnyItem = true;
                    }

                    engine.needsRenderUpdate = true;
                }
                break;
            }
        }

        if (!foundInventorySlot) {
            if (this.targetedInventorySlot) {
                this.targetedInventorySlot.highlighted = false;
            }

            this.targetedInventorySlot = null;

            engine.needsRenderUpdate = true;
        }

        const equipmentHex = HexUtil.pixelToHex({"x": this.mouse.x - 40, "y": this.mouse.y}, 2.5);
        let foundEquipmentSlot = false;
        for (const slot of equipmentView.slots) {
            if (slot.q === equipmentHex.q && slot.r === equipmentHex.r) {
                foundEquipmentSlot = true;
                if (slot === this.targetedEquipmentSlot) {
                    if (slot.item) {
                        inventoryHoverModal.setPosition(this.mouse.x, this.mouse.y);
                        engine.needsRenderUpdate = true;
                        foundAnyItem = true;
                    }
                } else {
                    if (this.targetedEquipmentSlot) {
                        this.targetedEquipmentSlot.highlighted = false;
                    }

                    slot.highlighted = true;
                    this.targetedEquipmentSlot = slot;

                    if (slot.item) {
                        inventoryHoverModal.setPosition(this.mouse.x, this.mouse.y);
                        inventoryHoverModal.setItem(slot.item);
                        inventoryHoverModal.show();
                        foundAnyItem = true;
                    }

                    engine.needsRenderUpdate = true;
                }
                break;
            }
        }

        if (!foundEquipmentSlot) {
            if (this.targetedEquipmentSlot) {
                this.targetedEquipmentSlot.highlighted = false;
            }
            this.targetedEquipmentSlot = null;

            engine.needsRenderUpdate = true;
        }

        if (!foundAnyItem) {
            inventoryHoverModal.hide();

            engine.needsRenderUpdate = true;
        }
    }

    onRightClick(e) {
        e.preventDefault();

        if (this.targetedInventorySlot) {
            if (this.targetedInventorySlot.item) {
                this.targetedInventorySlot.highlighted = false;

                inventoryHoverModal.hide();

                inventoryActionModal.setPosition(this.mouse.x, this.mouse.y);
                const consumableComponent = this.targetedInventorySlot.item.getComponent("consumable");
                const equippableComponent = this.targetedInventorySlot.item.getComponent("equippable");
                if (consumableComponent) {
                    inventoryActionModal.buttons[0].text = "Use";
                    inventoryActionModal.buttons[0].actionOrComponent = consumableComponent;
                } else if (equippableComponent) {
                    inventoryActionModal.buttons[0].text = "Equip";
                    inventoryActionModal.buttons[0].actionOrComponent = new EquipAction(engine.player, this.targetedInventorySlot.index);
                }
                inventoryActionModal.buttons[1].actionOrComponent = new DropInventoryAction(engine.player, this.targetedInventorySlot.index);
                inventoryActionModal.buttons[2].actionOrComponent = new NoAction(engine.player);
                inventoryActionModal.show();

                engine.setEventHandler(new InventoryActionEventHandler());

                engine.needsRenderUpdate = true;
            }
        }

        if (this.targetedEquipmentSlot) {
            if (this.targetedEquipmentSlot.item) {
                this.targetedEquipmentSlot.highlighted = false;

                inventoryHoverModal.hide();

                inventoryActionModal.setPosition(this.mouse.x, this.mouse.y);
                inventoryActionModal.buttons[0].text = "Unequip";
                inventoryActionModal.buttons[0].actionOrComponent = new UnequipAction(engine.player, this.targetedEquipmentSlot.index);
                inventoryActionModal.buttons[1].actionOrComponent = new DropEquipmentAction(engine.player, this.targetedEquipmentSlot.index);
                inventoryActionModal.buttons[2].actionOrComponent = new NoAction(engine.player);
                inventoryActionModal.show();

                engine.setEventHandler(new InventoryActionEventHandler());

                engine.needsRenderUpdate = true;
            }
        }
    }
}