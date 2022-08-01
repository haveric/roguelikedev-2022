import HexUtil from "../util/HexUtil";
import ArrayUtil from "../util/ArrayUtil";
import engine from "../Engine";

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
            let y = 2 * HexUtil.HEX_RADIUS_V + (2 * HexUtil.HEX_RADIUS_V * Math.sin(HexUtil.HEX_A)) * i;
            for (let j = 0; j < this.cols; j++) {
                const x = HexUtil.HEX_RADIUS_H + (HexUtil.HEX_RADIUS_H * (1 + Math.cos(HexUtil.HEX_A))) * j;
                y -= (-1) ** j * HexUtil.HEX_RADIUS_V * Math.sin(HexUtil.HEX_A);

                const tile = this.tiles[i][j];
                const tileFov = tile.getComponent("fov");
                if (tileFov && tileFov.explored) {
                    tile.draw(x, y);
                }
            }
        }

        for (const actor of this.actors) {
            const actorHex = actor.getComponent("hex");
            const tile = engine.gameMap.getTileFromArrayCoords(actorHex.row, actorHex.col);
            const tileFov = tile.getComponent("fov");
            if (tileFov && tileFov.visible) {
                actor.draw();
            }
        }
    }

    getTileFromArrayCoords(x, y) {
        if (this.tiles[x]) {
            return this.tiles[x][y];
        }

        return null;
    }

    getTileFromHexCoords(q, r) {
        const xy = HexUtil.hexToArray(q, r);
        return this.tiles[xy.x][xy.y];
    }

    getTileNeighbor(q, r, direction) {
        switch(direction) {
            case 1: // N
                return this.getTileFromHexCoords(q - 1, r);
            case 2: // NE
                return this.getTileFromHexCoords(q - 1, r + 1);
            case 3: // SE
                return this.getTileFromHexCoords(q, r + 1);
            case 4: // S
                return this.getTileFromHexCoords(q + 1, r);
            case 5: // SW
                return this.getTileFromHexCoords(q + 1, r - 1);
            case 6: // NW
            default:
                return this.getTileFromHexCoords(q, r - 1);
        }
    }

    getBlockingActorAtArrayLocation(x, y) {
        let blockingActor = null;
        for (const actor of this.actors) {
            const hex = actor.getComponent("hex");
            if (hex && x === hex.row && y === hex.col) {
                const component = actor.getComponent("blocksMovement");
                if (component && component.blocksMovement) {
                    blockingActor = actor;
                    break;
                }
            }
        }

        return blockingActor;
    }
}