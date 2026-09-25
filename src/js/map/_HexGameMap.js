import HexUtil from "../util/HexUtil";
import ArrayUtil from "../util/ArrayUtil";
import engine from "../Engine";
import sceneState from "../SceneState";
import parchmentFoldedCrinkledSrc from "../../assets/kenney/parchmentFoldedCrinkled.png";
import entityLoader from "../entity/EntityLoader";

export default class _HexGameMap {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.init();
    }

    init() {
        this.saveCache = null;

        this.tiles = ArrayUtil.create2dArray(this.rows);
        this.actors = [];
        this.items = [];

        this.map_background = new Image();
        this.map_background.src = parchmentFoldedCrinkledSrc;

        this.backgroundLoaded = false;
        const self = this;

        this.map_background.onload = () => {
            self.backgroundLoaded = true;
            engine.needsRenderUpdate = true;
        };

        this.savedBackground = null;
    }

    isInBounds(x, y) {
        return 0 <= x && x < this.rows && 0 <= y && y < this.cols;
    }

    create() { }

    draw() {
        const playerHex = engine.player.getComponent("hex");
        const topLeft = HexUtil.hexToArray(playerHex.q - 20, playerHex.r - 5);
        const botRight = HexUtil.hexToArray(playerHex.q + 21, playerHex.r + 6);

        const radius = 15;
        const qOffset = playerHex.q;
        const rOffset = playerHex.r;

        if (this.backgroundLoaded) {
            if (this.savedBackground) {
                sceneState.ctx.putImageData(this.savedBackground, 0, 0);
            } else {
                const drawXY = HexUtil.getHexDrawCoords(playerHex, qOffset, rOffset);
                const xOffset = HexUtil.getHexRadiusHScaled() * 26 * 1.3;
                HexUtil.drawHexAngleTop(sceneState.ctx, drawXY.x - xOffset, drawXY.y, 26);
                sceneState.ctx.closePath();
                sceneState.ctx.fillStyle = "rgba(150,150,150,1)";
                sceneState.ctx.fill();

                HexUtil.drawHexAngleTop(sceneState.ctx, drawXY.x + xOffset, drawXY.y, 26);
                sceneState.ctx.closePath();
                sceneState.ctx.fillStyle = "rgba(150,150,150,1)";
                sceneState.ctx.fill();

                sceneState.ctx.save();
                HexUtil.drawHexAngleTop(sceneState.ctx, drawXY.x, drawXY.y, 26);
                sceneState.ctx.closePath();
                sceneState.ctx.clip();
                const backgroundWidthRadius = HexUtil.getHexRadiusHScaled() * 13 * 1.75;
                const backgroundHeightRadius = HexUtil.getHexRadiusVScaled() * 13 * 1.75 * 1.15;
                sceneState.ctx.drawImage(this.map_background, 0, 0, 1024, 1024, drawXY.x - backgroundWidthRadius, drawXY.y - backgroundHeightRadius, backgroundWidthRadius * 2, backgroundHeightRadius * 2);

                sceneState.ctx.restore();

                this.savedBackground = sceneState.ctx.getImageData(0, 0, sceneState.canvas.width, sceneState.canvas.height);
            }
        }

        for (let i = topLeft.x; i < botRight.x; i++) {
            for (let j = topLeft.y; j < botRight.y; j++) {
                if (this.tiles[i] && this.tiles[i][j]) {
                    const tile = this.tiles[i][j];
                    const tileHex = tile.getComponent("hex");
                    if (playerHex.isInRange(tileHex, radius)) {
                        tile.draw(qOffset, rOffset);
                    }
                }
            }
        }

        for (const item of this.items) {
            const itemHex = item.getComponent("hex");
            const tile = engine.gameMap.getTileFromArrayCoords(itemHex.row, itemHex.col);
            const tileFov = tile.getComponent("fov");
            if (sceneState.debugRenderMap || (tileFov && tileFov.visible)) {
                if (playerHex.isInRange(itemHex, radius)) {
                    item.draw(qOffset, rOffset);
                }
            }
        }

        for (const item of this.items) {
            const itemHex = item.getComponent("hex");
            const tile = engine.gameMap.getTileFromArrayCoords(itemHex.row, itemHex.col);
            const tileFov = tile.getComponent("fov");
            if (tileFov && tileFov.visible) {
                item.draw();
            }
        }

        for (const actor of this.actors) {
            const actorHex = actor.getComponent("hex");
            const tile = engine.gameMap.getTileFromArrayCoords(actorHex.row, actorHex.col);
            const tileFov = tile.getComponent("fov");
            if (sceneState.debugRenderMap || (tileFov && tileFov.visible)) {
                if (playerHex.isInRange(actorHex, radius)) {
                    actor.draw(qOffset, rOffset);
                }
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
        if (this.tiles[xy.x]) {
            return this.tiles[xy.x][xy.y];
        }

        return null;
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

    getHexNeighbor(hex, direction) {
        switch(direction) {
            case 1: // N
                return {q: hex.q - 1, r: hex.r};
            case 2: // NE
                return {q: hex.q - 1, r: hex.r + 1};
            case 3: // SE
                return {q: hex.q, r: hex.r + 1};
            case 4: // S
                return {q: hex.q + 1, r: hex.r};
            case 5: // SW
                return {q: hex.q + 1, r: hex.r - 1};
            case 6: // NW
            default:
                return {q: hex.q, r: hex.r - 1};
        }
    }

    getTilesInRing(q, r, radius) {
        const tiles = [];

        // Start SW and go clockwise
        let hex = {
            q: q + radius,
            r: r - radius
        };
        for (let i = 1; i <= 6; i++) {
            for (let j = 0; j < radius; j++) {
                const tile = this.getTileFromHexCoords(hex.q, hex.r);
                if (tile) {
                    tiles.push(tile);
                }
                hex = this.getHexNeighbor(hex, i);
            }
        }

        return tiles;
    }

    getTilesInRadius(q, r, radius) {
        const tiles = [];

        for (let i = 1; i <= radius; i++) {
            tiles.push(...this.getTilesInRing(q, r, i));
        }

        return tiles;
    }

    getActorAtArrayLocation(xRow, yCol) {
        let foundActor = null;
        for (const actor of this.actors) {
            if (!actor.isAlive()) {
                continue;
            }
            const hex = actor.getComponent("hex");
            if (hex && xRow === hex.row && yCol === hex.col) {
                foundActor = actor;
                break;
            }
        }

        return foundActor;
    }

    getBlockingActorAtArrayLocation(xRow, yCol) {
        let blockingActor = null;
        for (const actor of this.actors) {
            const hex = actor.getComponent("hex");
            if (hex && xRow === hex.row && yCol === hex.col) {
                const component = actor.getComponent("blocksMovement");
                if (component && component.blocksMovement) {
                    blockingActor = actor;
                    break;
                }
            }
        }

        return blockingActor;
    }

    save() {
        if (this.saveCache) {
            return this.saveCache;
        }

        const saveData = {
            rows: this.rows,
            cols: this.cols
        };

        const tileArray = [];
        const letterArray = [];
        let key = "";
        let charCode = 65;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const tile = this.tiles[i][j];
                if (tile) {
                    const tileJson = tile.save();
                    tileJson.components.hex.row = 0;
                    tileJson.components.hex.col = 0;
                    const tileJsonString = JSON.stringify(tileJson);
                    const index = tileArray.indexOf(tileJsonString);
                    if (index > -1) {
                        key += letterArray[index];
                    } else {
                        tileArray.push(tileJsonString);
                        letterArray.push(String.fromCharCode(charCode));
                        key += String.fromCharCode(charCode);

                        charCode++;
                    }
                } else {
                    key += " ";
                }
            }
        }

        saveData["tiles"] = {};
        saveData["tiles"]["key"] = key;
        saveData["tiles"]["map"] = {};

        for (let i = 0; i < tileArray.length; i++) {
            saveData["tiles"]["map"][letterArray[i]] = tileArray[i];
        }

        const actorJson = [];
        for (const actor of this.actors) {
            actorJson.push(JSON.stringify(actor.save()));
        }
        saveData["actors"] = actorJson;

        const itemJson = [];
        for (const item of this.items) {
            itemJson.push(JSON.stringify(item.save()));
        }
        saveData["items"] = itemJson;

        this.saveCache = saveData;
        return saveData;
    }

    load(json) {
        this.rows = json.rows;
        this.cols = json.cols;
        this.init();

        const tilesToLoad = json.tiles;
        if (tilesToLoad) {
            const key = tilesToLoad.key;
            const map = tilesToLoad.map;

            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    const index = i * this.cols + j;
                    const tile = map[key[index]];

                    if (tile) {
                        this.tiles[i][j] = entityLoader.create(tile);
                        const tileHex = this.tiles[i][j].getComponent("hex");
                        tileHex.moveTo(i, j);
                    }
                }
            }

            const actors = json.actors;
            for (const actor of actors) {
                const createdActor = entityLoader.create(actor);
                if (createdActor.id === "player") {
                    engine.player = createdActor;
                }
                this.actors.push(createdActor);
            }

            const items = json.items;
            for (const item of items) {
                const createdItem = entityLoader.create(item);
                this.items.push(createdItem);
            }
        }
    }
}