import engine from "../Engine";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";
import messageManager from "../message/MessageManager";

class MessageConsole {
    constructor() {
        this.numLinesToShow = 28;
    }

    draw() {
        const playerHex = engine.player.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(playerHex, playerHex.q, playerHex.r);
        const xOffset = HexUtil.getHexRadiusHScaled() * 20 * 1.3;
        const yOffset = HexUtil.getHexRadiusVScaled() * 12 * 1.3;

        const yStart = drawXY.y - yOffset;
        const yLineHeight = HexUtil.getHexRadiusVScaled() * 1.15;
        let y = yStart;

        // Set font to measure text correctly
        sceneState.ctx.font = "bold " + (sceneState.scale * 18) + "px serif";
        const oldShadowColor = sceneState.ctx.shadowColor;
        sceneState.ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        sceneState.ctx.shadowBlur = 2;
        sceneState.ctx.shadowOffsetX = 1;
        sceneState.ctx.shadowOffsetY = 1;
        const messages = messageManager.messages;

        let linesLeft = this.numLinesToShow;
        for (let i = messages.length - 1; i >= 0; i--) {
            const message = messages[i];
            // TODO: Break up too long of messages/submessages
            let length = 0;
            for (const subMessage of message.subMessages) {
                const subMessageText = subMessage.text;
                sceneState.drawTextAt(subMessageText, drawXY.x + length + xOffset, y, 18, subMessage.color, "left");

                length += sceneState.ctx.measureText(subMessage.text).width;
            }

            if (message.count > 1) {
                sceneState.drawTextAt("  x" + message.count, drawXY.x + length + xOffset, y, 18, "#000", "left");
            }

            y += yLineHeight;
            linesLeft --;

            if (linesLeft <= 0) {
                break;
            }
        }

        sceneState.ctx.shadowColor = oldShadowColor;
    }
}

const messageConsole = new MessageConsole();
export default messageConsole;