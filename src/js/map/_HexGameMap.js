import HexUtil from "../util/HexUtil";
import ArrayUtil from "../util/ArrayUtil";

export default class _HexGameMap {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.init();
    }

    init() {
        this.tiles = ArrayUtil.create2dArray(this.rows);
        this.actors = [];
    }

    isInBounds(x, y) {
        return 0 <= x && x < this.rows && 0 <= y && y < this.cols;
    }

    create() {}

    draw() {
        for (let i = 0; i < this.rows; i++) {
            let y = 2 * HexUtil.HEX_RADIUS + (2 * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A)) * i;
            for (let j = 0; j < this.cols; j++) {
                const x = HexUtil.HEX_RADIUS + (HexUtil.HEX_RADIUS * (1 + Math.cos(HexUtil.HEX_A))) * j;
                y -= (-1) ** j * HexUtil.HEX_RADIUS * Math.sin(HexUtil.HEX_A);
                this.tiles[i][j].draw(x, y);
            }
        }

        for (const actor of this.actors) {
            actor.draw();
        }
    }
}