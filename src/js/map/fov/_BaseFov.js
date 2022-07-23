import engine from "../../Engine";
import Fov from "../../components/Fov";

export default class _BaseFov {
    constructor() {
        this.previousVisibleTiles = [];
        this.visibleTiles = [];
    }

    compute(entity, radius) {
        this.previousVisibleTiles = this.visibleTiles;
        this.visibleTiles = [];

        this.hex = entity.getComponent("hex");
        this.q = this.hex.q;
        this.r = this.hex.r;

        this.tile = engine.gameMap.getTileFromHexCoords(this.q, this.r);
        const x = this.hex.row;
        const y = this.hex.col;

        this.left = Math.max(0, x - radius);
        this.right = Math.min(engine.gameMap.rows, x + radius);
        this.top = Math.max(0, y - radius);
        this.bottom = Math.min(engine.gameMap.cols, y + radius);
    }

    exploreTile(row, col) {
        this.visibleTiles.push(engine.gameMap.tiles[row][col]);
    }

    updateMap() {
        for (const tile of this.previousVisibleTiles) {
            const fov = tile.getComponent("fov");
            if (fov) {
                fov.setVisible(false);
            }
        }

        for (const tile of this.visibleTiles) {
            const fov = tile.getComponent("fov");
            if (fov) {
                fov.setExplored(true);
                fov.setVisible(true);
            } else {
                tile.setComponent(new Fov({components: {fov: {explored: true, visible: true}}}));
            }
        }
    }
}