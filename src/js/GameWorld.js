import engine from "./Engine";
import CellularAutomataMap from "./map/CellularAutomataMap";
import entityLoader from "./entity/EntityLoader";
import messageManager from "./message/MessageManager";

class GameWorld {
    constructor() {
        this.map_width = 40;
        this.map_height = 40;
    }

    generateFloor() {
        let level = 1;
        const lastMap = engine.gameMap;
        if (lastMap) {
            level = lastMap.level + 1;
        }

        const extraTiles = 5 * (level - 1);
        engine.gameMap = new CellularAutomataMap(this.map_width + extraTiles, this.map_height + extraTiles, level);

        if (!engine.player) {
            engine.player = entityLoader.createFromTemplate("player", {components: {hex: {row: 0, col: 0}}});
        }

        const playerHex = engine.player.getComponent("hex");
        let foundPlace = false;
        while(!foundPlace) {
            const playerRow = Math.floor(Math.random() * (engine.gameMap.rows - 4)) + 2;
            const playerCol = Math.floor(Math.random() * (engine.gameMap.cols - 4)) + 2;

            const tile = engine.gameMap.tiles[playerRow][playerCol];
            if (!tile.isWall()) {
                playerHex.moveTo(playerRow, playerCol);
                foundPlace = true;
            }
        }

        engine.gameMap.actors.push(engine.player);
        engine.gameMap.placeEntities("cave", level, .03, 5);
        engine.gameMap.placeItems("cave", level, .03, 5);

        engine.player.fov.compute(engine.player, 5);
        engine.player.fov.updateMap();

        engine.needsRenderUpdate = true;

        if (level === 1) {
            messageManager.text("Welcome to the dungeon.").build();
        } else {
            messageManager.text("You arrive on level " + level + " of the dungeon.").build();
        }
    }
}

const gameWorld = new GameWorld();
export default gameWorld;