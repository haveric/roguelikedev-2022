import _Entity from "./_Entity";
import sceneState from "../SceneState";
import Hex from "../map/Hex";

const hex_a = 2 * Math.PI / 6;
const hex_r = 50;

export default class Actor extends _Entity {
    constructor() {
        super();

        this.hex = new Hex(0, 10);
    }

    draw() {
        // TODO: Replace arbitrary 1.15
        const drawX = hex_r + (hex_r * (1 + Math.cos(hex_a))) * this.hex.getY();
        const drawY = 1.15 * hex_r + (2 * hex_r * Math.sin(hex_a)) * this.hex.getDisplayX();


        sceneState.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            sceneState.ctx.lineTo(drawX + hex_r * Math.cos(hex_a * i), drawY + hex_r * Math.sin(hex_a * i));
        }
        sceneState.ctx.closePath();
        sceneState.ctx.fillStyle="blue";
        sceneState.ctx.fill();

        sceneState.ctx.fillStyle="white";
        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "26px serif";
        sceneState.ctx.fillText("@", drawX, drawY);
    }
}