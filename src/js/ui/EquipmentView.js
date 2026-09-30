import engine from "../Engine";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";
import InventorySlot from "./InventorySlot";
import Hex from "../components/Hex";

class EquipmentView {
    constructor() {
        this.numSlots = 10;
        this.slots = [];
        for (let i = 0; i < this.numSlots; i ++) {
            this.slots.push(new InventorySlot(i));
        }
    }

    update() {
        const playerEquipment = engine.player.getComponent("equipment");
        for (let i = 0; i < this.slots.length; i ++) {
            this.slots[i].item = playerEquipment.slots[i].item;
        }

        engine.needsUpdate = true;
    }

    draw() {
        const scale = 2.5;
        const hex = new Hex();
        const textQ = hex.q + 18;
        const textR = hex.r - 2.3;
        let drawXY = HexUtil.getHexDrawCoords(hex, textQ, textR, 1.5);
        const lastShadowColor = sceneState.ctx.shadowColor;
        sceneState.ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        sceneState.ctx.shadowBlur = 2;
        sceneState.ctx.shadowOffsetX = 1;
        sceneState.ctx.shadowOffsetY = 1;
        sceneState.drawTextAt("Equipment", drawXY.x + 10, drawXY.y, 32, "#000", "left");
        sceneState.ctx.shadowColor = lastShadowColor;

        const qStart = hex.q + 10;
        const rStart = hex.r - 2;
        const offsetX = 40;

        // Main hand
        drawXY = HexUtil.getHexDrawCoords(hex, qStart + 1, rStart - 2, scale);
        this.slots[0].draw(drawXY, scale, offsetX);
        this.slots[0].setPosition(-(qStart + 1), -(rStart - 2));

        // Off hand
        drawXY = HexUtil.getHexDrawCoords(hex, qStart - 1, rStart - 1, scale);
        this.slots[1].draw(drawXY, scale, offsetX);
        this.slots[1].setPosition(-(qStart - 1), -(rStart - 1));

        // Helmet
        drawXY = HexUtil.getHexDrawCoords(hex, qStart, rStart, scale);
        this.slots[2].draw(drawXY, scale, offsetX);
        this.slots[2].setPosition(-qStart, -rStart);

        // Amulet
        drawXY = HexUtil.getHexDrawCoords(hex, qStart + 1, rStart - 1, scale);
        this.slots[3].draw(drawXY, scale, offsetX);
        this.slots[3].setPosition(-(qStart + 1), -(rStart - 1));

        // Body Armor
        drawXY = HexUtil.getHexDrawCoords(hex, qStart, rStart - 1, scale);
        this.slots[4].draw(drawXY, scale, offsetX);
        this.slots[4].setPosition(-qStart, -(rStart - 1));

        // Ring
        drawXY = HexUtil.getHexDrawCoords(hex, qStart + 1, rStart - 3, scale);
        this.slots[5].draw(drawXY, scale, offsetX);
        this.slots[5].setPosition(-(qStart + 1), -(rStart - 3));

        // Gloves
        drawXY = HexUtil.getHexDrawCoords(hex, qStart - 1, rStart - 2, scale);
        this.slots[6].draw(drawXY, scale, offsetX);
        this.slots[6].setPosition(-(qStart - 1), -(rStart - 2));

        // Belt
        drawXY = HexUtil.getHexDrawCoords(hex, qStart, rStart - 2, scale);
        this.slots[7].draw(drawXY, scale, offsetX);
        this.slots[7].setPosition(-qStart, -(rStart - 2));

        // Boots
        drawXY = HexUtil.getHexDrawCoords(hex, qStart, rStart - 3, scale);
        this.slots[8].draw(drawXY, scale, offsetX);
        this.slots[8].setPosition(-qStart, -(rStart - 3));

        // Torch
        drawXY = HexUtil.getHexDrawCoords(hex, qStart - 1, rStart, scale);
        this.slots[9].draw(drawXY, scale, offsetX);
        this.slots[9].setPosition(-(qStart - 1), -rStart);
    }
}


const equipmentView = new EquipmentView();
export default equipmentView;