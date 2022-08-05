import engine from "../../Engine";
import Fov from "../../components/Fov";
import HexUtil from "../../util/HexUtil";
import Graph from "../../pathfinding/Graph";
import AStar from "../../pathfinding/AStar";

export default class _BaseFov {
    constructor() {
        this.previousVisibleTiles = [];
        this.visibleTiles = [];
        this.visibleActors = [];
    }

    compute(entity, radius) {
        this.previousVisibleTiles = this.visibleTiles;
        this.visibleTiles = [];
        this.visibleActors = [];

        this.hex = entity.getComponent("hex");
        this.q = this.hex.q;
        this.r = this.hex.r;

        this.tile = engine.gameMap.getTileFromHexCoords(this.q, this.r);
        const x = this.hex.row;
        const y = this.hex.col;

        let top = y - radius;
        if (top % 2 === 1) {
            top -= 1;
        }
        this.left = Math.max(0, x - radius);
        this.right = Math.min(engine.gameMap.rows, x + radius);
        this.top = Math.max(0, top);
        this.bottom = Math.min(engine.gameMap.cols, y + radius);
    }

    addVisibleTile(tile) {
        if (this.visibleTiles.indexOf(tile) === -1) {
            this.visibleTiles.push(tile);
        }
    }

    addVisibleActor(actor) {
        if (this.visibleActors.indexOf(actor) === -1) {
            this.visibleActors.push(actor);
        }
    }

    exploreTileByHex(q, r) {
        const xy = HexUtil.hexToArray(q, r);
        this.exploreTileByArray(xy.x, xy.y);
    }

    exploreTileByArray(row, col) {
        this.addVisibleTile(engine.gameMap.tiles[row][col]);

        for (const actor of engine.gameMap.actors) {
            const actorHex = actor.getComponent("hex");
            if (actorHex) {
                if (row === actorHex.row && col === actorHex.col) {
                    this.addVisibleActor(actor);
                }
            }
        }
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

    getCostGraph() {
        const fovWidth = this.right - this.left;
        const fovHeight = this.bottom - this.top;
        const cost = Array(fovWidth).fill().map(() => Array(fovHeight).fill(0));

        for (const tile of this.visibleTiles) {
            if (tile.isWall()) {
                continue;
            }

            const tileHex = tile.getComponent("hex");
            cost[tileHex.row - this.left][tileHex.col - this.top] += 10;
        }

        for (const actor of this.visibleActors) {
            if (actor.isAlive()) {
                const actorHex = actor.getComponent("hex");
                cost[actorHex.row - this.left][actorHex.col - this.top] += 100;
            }
        }

        return new Graph(cost);
    }

    getPath(costGraph, startHex, endHex) {
        const start = costGraph.grid[startHex.row - this.left][startHex.col - this.top];
        const end = costGraph.grid[endHex.row - this.left][endHex.col - this.top];

        return AStar.search(costGraph, start, end);
    }
}