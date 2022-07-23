import _Component from "./_Component";
import HexUtil from "../util/HexUtil";

export default class Hex extends _Component {
    constructor(args = {}) {
        super(args, "hex");

        this.row = 0;
        this.col = 0;
        this.q = 0;
        this.r = 0;
        this.s = 0;

        if (this.hasComponent()) {
            this.row = this.loadArg("row", 0);
            this.col = this.loadArg("col", 0);
        }

        this.updateHexCoords();
    }

    save() {
        if (this.cachedSave) {
            return this.cachedSave;
        }

        const saveJson = {
            hex: {}
        };

        if (this.row !== 0) {
            saveJson.hex.row = this.row;
        }

        if (this.col !== 0) {
            saveJson.hex.col = this.col;
        }

        this.cachedSave = saveJson;
        return saveJson;
    }

    moveTo(row, col) {
        this.row = row;
        this.col = col;

        this.updateHexCoords();
    }

    updateHexCoords() {
        this.q = this.row - Math.floor(this.col / 2);
        this.r = this.col;
        this.s = -this.q - this.r;
    }

    isEdge(map) {
        return this.row === 0 || this.col === 0 || this.row === map.rows - 1 || this.col === map.cols - 1;
    }

    getDisplayX() {
        return this.q + (this.r / 2.0);
    }

    getDisplayY() {
        return this.r;
    }

    getTileFromArray(map, q, r) {
        const xy = HexUtil.hexToArray(q, r);
        if (map[xy.x] && map[xy.x][xy.y]) {
            return map[xy.x][xy.y];
        }

        return null;
    }

    getNumAdjacentWalls(map) {
        const n = this.getTileFromArray(map, this.q, this.r - 1);
        const ne = this.getTileFromArray(map, this.q + 1, this.r - 1);
        const se = this.getTileFromArray(map, this.q + 1, this.r);
        const s = this.getTileFromArray(map, this.q, this.r + 1);
        const sw = this.getTileFromArray(map, this.q - 1, this.r + 1);
        const nw = this.getTileFromArray(map, this.q - 1, this.r);

        return this.isTileWall(n) + this.isTileWall(ne) + this.isTileWall(se) + this.isTileWall(s) + this.isTileWall(sw) + this.isTileWall(nw);
    }

    isTileWall(tile) {
        if (tile === null || tile.isWall()) {
            return 1;
        }

        return 0;
    }

    isInRange(otherHex, radius) {
        const distQ = Math.abs(this.q - otherHex.q);
        if (distQ < radius) {
            const distR = Math.abs(this.r - otherHex.r);
            if (distR < radius) {
                const distS = Math.abs(this.s - otherHex.s);
                if (distS < radius) {
                    return true;
                }
            }
        }

        return false;
    }
}