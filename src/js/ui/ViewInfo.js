import html from "../../html/ui/ViewInfo.html";
import _UIElement from "./_UIElement";
import engine from "../Engine";

class ViewInfo extends _UIElement {
    constructor() {
        super(html);
    }

    updatePlayerDetails() {
        const playerHex = engine.player.getComponent("hex");
        const tile = engine.gameMap.getTileFromArrayCoords(playerHex.row, playerHex.col);
        this.updatePositionDetails(tile, true);
    }

    getDetailsLine(innerText) {
        return "<span class='details__line'>" + innerText + "</span>";
    }

    updatePositionDetails(tile, skipPlayer) {
        let text;
        const tileFov = tile.getComponent("fov");
        if (tileFov && tileFov.explored) {
            text = this.getDetailsLine(tile.name);

            if (tileFov.visible) {
                const tileHex = tile.getComponent("hex");
                for (const actor of engine.gameMap.actors) {
                    if (skipPlayer && actor === engine.player) {
                        continue;
                    }

                    const actorHex = actor.getComponent("hex");
                    if (actorHex) {
                        if (tileHex.equals(actorHex)) {
                            text += this.getDetailsLine(actor.name);
                        }
                    }
                }
            }
        } else {
            text = this.getDetailsLine("You haven't explored here.");
        }

        this.dom.innerHTML = text;
    }
}

const viewInfo = new ViewInfo();
export default viewInfo;