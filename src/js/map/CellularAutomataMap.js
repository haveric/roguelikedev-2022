import _HexGameMap from "./_HexGameMap";
import engine from "../Engine";
import entityLoader from "../entity/EntityLoader";
import chanceLoader from "./ChanceLoader";

export default class CellularAutomataMap extends _HexGameMap {
    constructor(rows, cols) {
        super(rows, cols);

        this.percentAreWalls = .35; // 1 = 100%

        this.wallEntity = entityLoader.createFromTemplate("cave_wall", {components: {hex: {row: 0, col: 0}}});
        this.floorEntity = entityLoader.createFromTemplate("cave_floor", {components: {hex: {row: 0, col: 0}}});

        this.create();
    }

    create() {
        this.randomFillBuild();
        this.makeCaverns(15, 0);
    }

    randomFillBuild() {
        const rowsMiddle = Math.floor(Math.random() * this.rows);
        const colsMiddle = Math.floor(Math.random() * this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let entity;
                if (i === 0 || j === 0 || i === this.rows - 1 || j === this.cols - 1) {
                    entity = this.wallEntity.clone();
                } else if (i === rowsMiddle || j === colsMiddle) {
                    entity = this.floorEntity.clone();
                } else {
                    const isWall = Math.random() < this.percentAreWalls;

                    if (isWall) {
                        entity = this.wallEntity.clone();
                    } else {
                        entity = this.floorEntity.clone();
                    }
                }

                entity.getComponent("hex").moveTo(i, j);
                this.tiles[i][j] = entity;
            }
        }
    }

    addRandomNoise() {
        for (let i = 1; i < this.rows - 1; i++) {
            for (let j = 1; j < this.cols - 1; j++) {
                if (Math.random() < .02) {
                    const entity = this.wallEntity.clone();
                    entity.getComponent("hex").moveTo(i, j);
                    this.tiles[i][j] = entity;
                }
            }
        }
    }

    makeCaverns(repeat, delay) {
        this.addRandomNoise();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const isWall = this.placeWallLogic(this.tiles[i][j]);

                let entity;
                if (isWall) {
                    entity = this.wallEntity.clone();
                } else {
                    entity = this.floorEntity.clone();
                }

                entity.getComponent("hex").moveTo(i, j);
                this.tiles[i][j] = entity;
            }
        }

        repeat --;

        const self = this;
        if (repeat > 0) {
            if (delay > 0) {
                setTimeout(() => {
                    self.makeCaverns(repeat, delay);
                }, delay);
                engine.needsRenderUpdate = true;
            } else {
                self.makeCaverns(repeat);
            }
        } else {
            engine.needsRenderUpdate = true;
        }
    }

    placeWallLogic(tile) {
        const hex = tile.getComponent("hex");
        const numWalls = hex.getNumAdjacentWalls(this.tiles);

        // Edges should always be walls
        if (hex.isEdge(this)) {
            return true;
        }

        if (tile.isWall()) {
            if (numWalls >= 2) {
                return true;
            }
        } else {
            if (numWalls >= 4) {
                return true;
            }
        }

        return false;
    }

    placeEntities(generation, level, percentage, distFromPlayer) {
        const playerHex = engine.player.getComponent("hex");

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const tile = this.tiles[i][j];
                if (!tile.isWall()) {
                    const hex = tile.getComponent("hex");
                    if (!playerHex.isInRange(hex, distFromPlayer)) {
                        if (Math.random() < percentage) {
                            const actorId = chanceLoader.getActorForLevel(generation, level);
                            const actor = entityLoader.createFromTemplate(actorId, {components: {hex: {row: hex.row, col: hex.col}}});

                            this.actors.push(actor);
                        }
                    }
                }
            }
        }
    }
}