export default class HexNode {
    constructor(row, col, weight) {
        this.row = row;
        this.col = col;
        this.q = this.col;
        this.r = this.row - Math.floor(this.col / 2);
        this.s = -this.q - this.r;
        this.weight = weight;
    }

    getCost() {
        return this.weight;
    }

    isWall() {
        return this.weight === 0;
    }
}