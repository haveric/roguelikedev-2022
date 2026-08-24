import HexUtil from "../util/HexUtil";
import ArrayUtil from "../util/ArrayUtil";
import engine from "../Engine";
import sceneState from "../SceneState";
import parchmentFoldedCrinkledSrc from "../../assets/kenney/parchmentFoldedCrinkled.png";

export default class _HexGameMap {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;

        this.init();}

    init() {
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