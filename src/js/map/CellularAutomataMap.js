import _HexGameMap from "./_HexGameMap";
import engine from "../Engine";
import entityLoader from "../entity/EntityLoader";
import chanceLoader from "./ChanceLoader";
import AStar from "../pathfinding/AStar";
import Graph from "../pathfinding/Graph";

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
        this.floodFillCreateRooms();
        this.createCorridors();
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

    floodFillCreateRooms() {
        this.rooms = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const tile = this.tiles[i][j];
                if (tile.isWall()) {
                    tile.searched = true;
                } else {
                    if (!tile.searched) {
                        const room = {
                            tiles: []
                        };
                        this.rooms.push(room);

                        this.floodFillRoom(room, tile);
                    }
                }
            }
        }
    }

    floodFillRoom(room, tile) {
        tile.searched = true;
        room.tiles.push(tile);

        const hex = tile.getComponent("hex");
        const neighborTiles = this.getUnsearchedTileNeighbors(hex.q, hex.r);

        while (neighborTiles.length > 0) {
            const neighbor = neighborTiles.pop();

            if (neighbor.searched || neighbor.isWall()) {
                continue;
            }

            this.floodFillRoom(room, neighbor);
        }
    }

    getUnsearchedTileNeighbors(q, r) {
        const neighbors = [];
        for (let i = 1; i <= 6; i++) {
            const neighbor = this.getTileNeighbor(q, r, i);
            if (neighbor && !neighbor.searched) {
                neighbors.push(neighbor);
            }
        }

        return neighbors;
    }

    createCorridors() {
        if (this.rooms.length > 1) {
            for (let i = 1; i < this.rooms.length; i++) {
                const room = this.rooms[i];
                const prevRoom = this.rooms[i - 1];

                const randomRoomTile = room.tiles[Math.floor(Math.random() * room.tiles.length)];
                const randomPrevRoomTile = prevRoom.tiles[Math.floor(Math.random() * prevRoom.tiles.length)];
                this.createCorridor(randomRoomTile, randomPrevRoomTile);
            }
        }
    }

    createCorridor(tile1, tile2) {
        const costArray = Array(this.rows).fill().map(() => Array(this.cols).fill(1));

        for (let i = 0; i < this.rows; i++) {
            costArray[i][0] = 0;
            costArray[i][this.cols - 1] = 0;
        }

        for (let j = 0; j < this.cols; j++) {
            costArray[0][j] = 0;
            costArray[this.rows - 1][j] = 0;
        }

        const costGraph = new Graph(costArray);
        const tile1Hex = tile1.getComponent("hex");
        const tile2Hex = tile2.getComponent("hex");
        const start = costGraph.grid[tile1Hex.row][tile1Hex.col];
        const end = costGraph.grid[tile2Hex.row][tile2Hex.col];
        const path = AStar.search(costGraph, start, end);
        for (const pathNode of path) {
            const entity = this.floorEntity.clone();
            entity.getComponent("hex").moveTo(pathNode.row, pathNode.col);
            this.tiles[pathNode.row][pathNode.col] = entity;
        }
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