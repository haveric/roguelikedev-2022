import Hex from "./Hex";
import HexUtil from "../util/HexUtil";

export default class HexGrid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.actors = [];

        this.init();
    }

    init() {
        this.hexes = [];
        for (let i = 0; i < this.rows; i++) {
            this.hexes[i] = [];

            for (let j = 0; j < this.cols; j++) {
                this.hexes[i][j] = new Hex(i - Math.floor(j / 2), j);
            }
        }
    }

    isInBounds(x, y) {
        return 0 <= x && x < this.rows && 0 <= y && y < this.cols;
    }

    draw() {
        for (let i = 0; i < this.rows; i++) {
            let y = 2 * HexUtil.HEX_RADIUS + (2 * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A)) * i;
            for (let j = 0; j < this.cols; j++) {
                const x = HexUtil.HEX_RADIUS + (HexUtil.HEX_RADIUS * (1 + Math.cos(HexUtil.HEX_A))) * j;
                y -= (-1) ** j * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A);
                this.hexes[i][j].draw(x, y);
            }
        }

        for (const actor of this.actors) {
            actor.draw();
        }
    }
}