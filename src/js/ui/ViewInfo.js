import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";
import engine from "../Engine";

class ViewInfo {
    constructor() {
        this.header = "";
        this.lines = [];
    }

    updatePlayerDetails() {
        const playerHex = engine.player.getComponent("hex");
        const tile = engine.gameMap.getTileFromArrayCoords(playerHex.row, playerHex.col);
        this.updatePositionDetails(engine, tile, true);
    }

    addLine(text) {
        this.lines[this.lines.length] = text;
    }

    updatePositionDetails(engine, tile, skipPlayer) {
        console.log("updatePositionDetails");
        if (skipPlayer) {
            this.header = "At your location:";
        } else {
            this.header = "Looking at:";
        }

        this.lines = [];
        if (!tile) {
            return;
        }
        const tileFov = tile.getComponent("fov");
        if (tileFov && tileFov.explored) {
            this.addLine(tile.name);

            if (tileFov.visible) {
                const tileHex = tile.getComponent("hex");
                for (const actor of engine.gameMap.actors) {
                    if (skipPlayer && actor === engine.player) {
                        continue;
                    }

                    const actorHex = actor.getComponent("hex");
                    if (actorHex) {
                        if (tileHex.equals(actorHex)) {
                            this.addLine(actor.name);
                        }
                    }
                }

                for (const item of engine.gameMap.items) {
                    const itemHex = item.getComponent("hex");
                    if (itemHex) {
                        if (tileHex.equals(itemHex)) {
                            this.addLine(item.name);
                        }
                    }
                }
            }
        } else {
            this.addLine("You haven't explored here.");
        }
    }

    draw() {
        const playerHex = engine.player.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(playerHex, playerHex.q, playerHex.r);
        const xOffset = HexUtil.getHexRadiusHScaled() * 9 * 1.3;
        const yOffset = HexUtil.getHexRadiusVScaled() * 19 * 1.3;

        const yStart = drawXY.y - yOffset;
        const yLineHeight = HexUtil.getHexRadiusVScaled() * 1.15;
        let y = yStart;

        sceneState.drawTextAt(this.header, drawXY.x + xOffset, y - yLineHeight, 26, "#ddd", "left");
        for (const line of this.lines) {
            sceneState.drawTextAt(line, drawXY.x + xOffset, y, 18, "#ddd", "left");
            y += yLineHeight;
        }
    }
}

const viewInfo = new ViewInfo();
export default viewInfo;