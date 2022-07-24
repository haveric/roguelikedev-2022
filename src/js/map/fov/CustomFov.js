import _BaseFov from "./_BaseFov";
import engine from "../../Engine";

export default class CustomFov extends _BaseFov {
    constructor() {
        super();
    }

    compute(entity, radius) {
        super.compute(entity, radius);

        this.exploreTileByHex(this.q, this.r);

        for (let i = 1; i <= 6; i++) {
            this.exploreDirection(this.q, this.r, i, radius);
        }
    }

    exploreDirection(q, r, dir, radius) {
        let dir2 = dir + 1;
        if (dir2 > 6) {
            dir2 = 1;
        }

        let move1 = false;
        let move2 = false;
        let hex1;
        let hex2;

        const direction1 = engine.gameMap.getTileNeighbor(q, r, dir);
        if (direction1) {
            hex1 = direction1.getComponent("hex");
            this.exploreTileByArray(hex1.row, hex1.col);

            if (!direction1.isWall()) {
                move1 = true;
            }
        }

        const direction2 = engine.gameMap.getTileNeighbor(q, r, dir2);
        if (direction2) {
            hex2 = direction2.getComponent("hex");
            this.exploreTileByArray(hex2.row, hex2.col);

            if (!direction2.isWall()) {
                move2 = true;
            }
        }

        radius--;

        if (radius > 1) {
            if (move1 || move2) {
                let diagonal;
                if (hex1) {
                    diagonal = engine.gameMap.getTileNeighbor(hex1.q, hex1.r, dir2);
                } else if (hex2) {
                    diagonal = engine.gameMap.getTileNeighbor(hex2.q, hex2.r, dir);
                }

                if (diagonal) {
                    const hexDiagonal = diagonal.getComponent("hex");
                    this.exploreTileByArray(hexDiagonal.row, hexDiagonal.col);
                }
            }

            if (move1) {
                this.exploreDirection(hex1.q, hex1.r, dir, radius);
            }

            if (move2) {
                this.exploreDirection(hex2.q, hex2.r, dir, radius);
            }
        }
    }
}