import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";

export default class Hex {
    constructor(q, r) {
        this.q = q;
        this.r = r;
        this.s = -q - r;
    }

    /**
     * @param {Hex} a
     * @param {Hex} b
     */
    static add(a, b) {
        return new Hex(a.q + b.q, a.r + b.r);
    }

    /**
     * @param {Hex} a
     * @param {Hex} b
     */
    static subtract(a, b) {
        return new Hex(a.q - b.q, a.r - b.r);
    }

    /**
     * @param {Hex} a
     * @param {number} k
     */
    static multiply(a, k) {
        return new Hex(a.q * k, a.r * k);
    }

    getDisplayX() {
        return this.q + (this.r / 2.0);
    }

    getX() {
        return Math.floor(this.q + (this.r / 2.0));
    }

    getY() {
        return this.r;
    }

    static hexToArray(q, r) {
        const x = Math.floor(q + (r / 2.0));

        return {
            x: x,
            y: r
        };
    }

    draw(x, y) {
        HexUtil.drawHex(sceneState.ctx, x, y);
        sceneState.ctx.stroke();

        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        sceneState.ctx.font = "18px serif";
        sceneState.ctx.fillStyle = "black";
        sceneState.ctx.fillText("(" + this.q + ", " + this.r + ")", x, y-10);

        const xy = Hex.hexToArray(this.q, this.r);
        sceneState.ctx.fillText("(" + xy.x + ", " + xy.y + ")", x, y+10);
    }
}