import engine from "../Engine";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";
import InventorySlot from "./InventorySlot";
import Hex from "../components/Hex";

class InventoryView {
    constructor() {
        this.numSlots = 40;
        this.slots = [];
        for (let i = 0; i < this.numSlots; i ++) {
            this.slots.push(new InventorySlot(i));
        }
    }

    update() {
        const playerInventory = engine.player.getComponent("inventory");
        for (let i = 0; i < this.slots.length; i ++) {
            this.slots[i].item = playerInventory.items[i];
        }

        engine.needsUpdate = true;
    }

    draw() {
        const scale = 1.5;
        const hex = new Hex();
        const textQ = hex.q + 18;
        const textR = hex.r - 10.3;
        const drawXY = HexUtil.getHexDrawCoords(hex, textQ, textR, scale);
        const lastShadowColor = sceneState.ctx.shadowColor;
        sceneState.ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        sceneState.ctx.shadowBlur = 2;
        sceneState.ctx.shadowOffsetX = 1;
        sceneState.ctx.shadowOffsetY = 1;
        sceneState.drawTextAt("Inventory", drawXY.x, drawXY.y, 32, "#000", "left");
        sceneState.ctx.shadowColor = lastShadowColor;

        const qStart = hex.q + 12;
        const rStart = hex.r - 17;

        let i = 0;
        for (let r = rStart + 4; r >= rStart; r --) {
            let rOffset = 0;
            for (let q = qStart + 8; q >= qStart; q --) {
                if (r === rStart && q % 2 === 0) {
                    rOffset += 1;
                    continue;
                }

                const drawXY = HexUtil.getHexDrawCoords(hex, q, r + rOffset, scale);
                this.slots[i].q = -q;
                this.slots[i].r = -(r + rOffset);
                this.slots[i].draw(drawXY, scale);

                i++;

                if (q % 2 === 0) {
                    rOffset += 1;
                }
            }
        }
    }
}


const inventoryView = new InventoryView();
export default inventoryView;