import sceneState from "../SceneState";
import engine from "../Engine";
import HexUtil from "../util/HexUtil";
import elementDiamondSrc from "../../assets/kenney/elementDiamond.png";
import elementShieldSrc from "../../assets/kenney/elementShield.png";

class PlayerInfo {
    constructor() {
        this.healthString = "";
        this.powerString = "";
        this.defenseString = "";
        this.healthPercent = 1;

        this.init();
    }

    init() {
        this.powerImage = new Image();
        this.powerImage.src = elementDiamondSrc;
        this.powerImage.onload = () => {
            engine.needsRenderUpdate = true;
        };
        this.defenseImage = new Image();
        this.defenseImage.src = elementShieldSrc;
        this.defenseImage.onload = () => {
            engine.needsRenderUpdate = true;
        };
    }

    updateHealth(current, max) {
        this.healthPercent = current / max;
        this.healthString = current + " / " + max;
    }

    draw() {
        const player = engine.player;
        const playerHex = player.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(playerHex, playerHex.q, playerHex.r);
        const xOffset = HexUtil.getHexRadiusHScaled() * 13 * 1.3;
        const yOffset = HexUtil.getHexRadiusVScaled() * 16.7 * 1.3;

        sceneState.ctx.save();
        HexUtil.drawHexAngleTop(sceneState.ctx, drawXY.x - xOffset, drawXY.y + yOffset, 4.8);
        sceneState.ctx.closePath();

        const gradient = sceneState.ctx.createLinearGradient(drawXY.x - xOffset, drawXY.y + yOffset + (HexUtil.getHexRadiusVScaled() * 4.8), drawXY.x - xOffset, drawXY.y + yOffset - (HexUtil.getHexRadiusVScaled() * 4.8));
        gradient.addColorStop(0, "rgba(255,0,0,1)");
        gradient.addColorStop(Math.max(this.healthPercent - .001, 0), "rgba(255,0,0,1)");
        gradient.addColorStop(Math.max(this.healthPercent, 0), "rgba(230,230,230,1)");
        gradient.addColorStop(1, "rgba(230,230,230,1)");
        sceneState.ctx.fillStyle = gradient;
        sceneState.ctx.fill();
        sceneState.ctx.lineWidth = 5;
        sceneState.ctx.strokeStyle = "rgba(200, 0, 0, 1)";
        sceneState.ctx.stroke();
        sceneState.ctx.restore();

        sceneState.drawTextAt("HP", drawXY.x - xOffset, drawXY.y + yOffset - (40 * sceneState.scale), 26, "#222");
        sceneState.drawTextAt(this.healthString, drawXY.x - xOffset, drawXY.y + yOffset, 26, "#222");

        sceneState.ctx.drawImage(this.powerImage, 0, 0, 64, 64, drawXY.x - xOffset - (152 * sceneState.scale), drawXY.y + yOffset - (12 * sceneState.scale), 64 * sceneState.scale, 64 * sceneState.scale);
        sceneState.ctx.drawImage(this.defenseImage, 0, 0, 64, 64, drawXY.x - xOffset + (88 * sceneState.scale), drawXY.y + yOffset - (12 * sceneState.scale), 64 * sceneState.scale, 64 * sceneState.scale);

        sceneState.drawTextAt(this.powerString, drawXY.x - xOffset - (120 * sceneState.scale), drawXY.y + yOffset + (20 * sceneState.scale), 20, "#222");
        sceneState.drawTextAt("Power", drawXY.x - xOffset - (120 * sceneState.scale), drawXY.y + yOffset - (16 * sceneState.scale), 16, "#ddd");
        sceneState.drawTextAt(this.defenseString, drawXY.x - xOffset + (120 * sceneState.scale), drawXY.y + yOffset + (20 * sceneState.scale), 20, "#222");
        sceneState.drawTextAt("Defense", drawXY.x - xOffset + (120 * sceneState.scale), drawXY.y + yOffset - (16 * sceneState.scale), 16, "#ddd");

    }

    updatePower(power) {
        this.powerString = power;
    }

    updateDefense(defense) {
        this.defenseString = defense;
    }
}

const playerInfo = new PlayerInfo();
export default playerInfo;