import sceneState from "../SceneState";

const hex_a = 2 * Math.PI / 6;
const hex_r = 50;

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
        sceneState.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            sceneState.ctx.lineTo(x + hex_r * Math.cos(hex_a * i), y + hex_r * Math.sin(hex_a * i));
        }
        sceneState.ctx.closePath();
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