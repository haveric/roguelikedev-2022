import Hex from "./Hex";

const hex_a = 2 * Math.PI / 6;
const hex_r = 50;

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
            let y = 2 * hex_r + (2 * hex_r * Math.sin(hex_a)) * i;
            for (let j = 0; j < this.cols; j++) {
                const x = hex_r + (hex_r * (1 + Math.cos(hex_a))) * j;
                y -= (-1) ** j * hex_r * Math.sin(hex_a);
                this.hexes[i][j].draw(x, y);
            }
        }

        for (const actor of this.actors) {
            actor.draw();
        }
    }
}