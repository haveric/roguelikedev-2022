import _HexGameMap from "./_HexGameMap";
import engine from "../Engine";

export default class CellularAutomataMap extends _HexGameMap {
    constructor(rows, cols) {
        super(rows, cols);

        this.percentAreWalls = .35; // 1 = 100%

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
                if (this.hexes[i][j].isEdge(this.hexes)) {
                    this.hexes[i][j].isWall = 1;
                } else if (i === rowsMiddle) {
                    this.hexes[i][j].isWall = 0;
                } else if (j === colsMiddle) { // Clear a row for better connections
                    this.hexes[i][j].isWall = 0;
                } else if (Math.random() < this.percentAreWalls) {
                    this.hexes[i][j].isWall = 1;
                } else {
                    this.hexes[i][j].isWall = 0;
                }
            }
        }
    }

    addRandomNoise() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (Math.random() < .02) {
                    this.hexes[i][j].isWall = 1;
                }

            }
        }
    }

    makeCaverns(repeat, delay) {
        this.addRandomNoise();
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.hexes[i][j].isWall = this.placeWallLogic(this.hexes[i][j]);
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

    placeWallLogic(hex) {
        const numWalls = hex.getNumAdjacentWalls(this.hexes);

        // Edges should always be walls
        if (hex.isEdge(this.hexes)) {
            return 1;
        }

        if (hex.isWall) {
            if (numWalls >= 2) {
                return 1;
            }
        } else {
            if (numWalls >= 4) {
                return 1;
            }
        }

        return 0;
    }
}