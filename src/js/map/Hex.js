import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";

export default class Hex {
    constructor(q, r) {
        this.q = q;
        this.r = r;
        this.s = -q - r;

        this.isWall = 0;
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

    static getHexFromArray(hexes, q, r) {
        const xy = Hex.hexToArray(q, r);
        if (hexes[xy.x] && hexes[xy.x][xy.y]) {
            return hexes[xy.x][xy.y];
        }

        return null;
    }

    getAdjacentHexes(hexes) {
        const n = Hex.getHexFromArray(hexes, this.q, this.r - 1);
        const ne = Hex.getHexFromArray(hexes, this.q + 1, this.r - 1);
        const se = Hex.getHexFromArray(hexes, this.q + 1, this.r);
        const s = Hex.getHexFromArray(hexes, this.q, this.r + 1);
        const sw = Hex.getHexFromArray(hexes, this.q - 1, this.r + 1);
        const nw = Hex.getHexFromArray(hexes, this.q - 1, this.r);

        const adjacentHexes = [];
        if (n !== null) {
            adjacentHexes.push(n);
        }
        if (ne !== null) {
            adjacentHexes.push(ne);
        }
        if (se !== null) {
            adjacentHexes.push(se);
        }
        if (s !== null) {
            adjacentHexes.push(s);
        }
        if (sw !== null) {
            adjacentHexes.push(sw);
        }
        if (nw !== null) {
            adjacentHexes.push(nw);
        }

        return adjacentHexes;
    }

    isEdge(hexes) {
        return this.getAdjacentHexes(hexes).length < 6;
    }

    getNumAdjacentWalls(hexes) {
        const n = Hex.getHexFromArray(hexes, this.q, this.r - 1);
        const ne = Hex.getHexFromArray(hexes, this.q + 1, this.r - 1);
        const se = Hex.getHexFromArray(hexes, this.q + 1, this.r);
        const s = Hex.getHexFromArray(hexes, this.q, this.r + 1);
        const sw = Hex.getHexFromArray(hexes, this.q - 1, this.r + 1);
        const nw = Hex.getHexFromArray(hexes, this.q - 1, this.r);

        return Hex.isWall(n) + Hex.isWall(ne) + Hex.isWall(se) + Hex.isWall(s) + Hex.isWall(sw) + Hex.isWall(nw);
    }

    static isWall(hex) {
        if (hex === null || hex.isWall) {
            return 1;
        }

        return 0;
    }

    draw(x, y) {
        HexUtil.drawHex(sceneState.ctx, x, y);
        if (this.isWall) {
            sceneState.ctx.fillStyle = "gray";
            sceneState.ctx.fill();
        }

        sceneState.ctx.stroke();

        sceneState.ctx.textAlign = "center";
        sceneState.ctx.textBaseline = "middle";
        /*
        sceneState.ctx.font = "18px serif";
        sceneState.ctx.fillStyle = "black";
        sceneState.ctx.fillText("(" + this.q + ", " + this.r + ")", x, y-10);

        const xy = Hex.hexToArray(this.q, this.r);
        sceneState.ctx.fillText("(" + xy.x + ", " + xy.y + ")", x, y+10);
         */
    }
}