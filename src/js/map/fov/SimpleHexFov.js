import _BaseFov from "./_BaseFov";
import engine from "../../Engine";

export default class SimpleHexFov extends _BaseFov {
    constructor() {
        super();
    }

    compute(entity, radius) {
        super.compute(entity, radius);

        for (let i = this.left; i < this.right; i++) {
            for (let j = this.top; j < this.bottom; j++) {
                const toTile = engine.gameMap.getTileFromArrayCoords(i, j);
                if (toTile) {
                    const toHex = toTile.getComponent("hex");
                    if (this.hex.isInRange(toHex, radius)) {
                        this.exploreTile(i, j);
                    }
                }
            }
        }
    }
}