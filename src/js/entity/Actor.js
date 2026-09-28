import _Entity from "./_Entity";
import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";
import CustomFov from "../map/fov/CustomFov";
import ColorUtil from "../util/ColorUtil";
import engine from "../Engine";

export default class Actor extends _Entity {
    constructor(args = {}) {
        args.type = "actor";
        super(args);

        this.fov = new CustomFov();
    }

    clone() {
        return new Actor(this.save());
    }

    isAlive() {
        const fighter = this.getComponent("fighter");
        return fighter && fighter.hp > 0;
    }

    allSpritesLoaded() {
        this.canvas = this.createSpriteCanvas(this.spriteImage, this.spriteBGImage, this.color);
        this.canvasCorpse = this.createSpriteCanvas(this.spriteCorpseImage, this.spriteCorpseBGImage, this.color);

        engine.needsRedraw = true;
    }

    createSpriteCanvas(spriteImage, spriteBGImage, color) {
        const canvas = new OffscreenCanvas(spriteImage.width, spriteImage.height);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(spriteImage, 0, 0, spriteImage.width, spriteImage.height, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        const colorRGB = ColorUtil.toRGB(color);

        const r = colorRGB[0] * .5;
        const g = colorRGB[1] * .5;
        const b = colorRGB[2] * .5;
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = pixels[i] * .5 + r;
            pixels[i + 1] = pixels[i + 1] * .5 + g;
            pixels[i + 2] = pixels[i + 2] * .5 + b;
        }

        ctx.putImageData(imageData, 0, 0);
        if (spriteBGImage) {
            ctx.drawImage(spriteBGImage, 0, 0, spriteBGImage.width, spriteBGImage.height, 0, 0, canvas.width, canvas.height);
        }

        return canvas;
    }

    draw(qOffset, rOffset) {
        const hex = this.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(hex, qOffset, rOffset);

        super.draw(drawXY.x, drawXY.y);

        if (this.isAlive()) {
            if (this.canvas) {
                sceneState.ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, drawXY.x - (.5 * this.canvas.width * sceneState.scale), drawXY.y - (.5 * this.canvas.height * sceneState.scale), this.canvas.width * sceneState.scale, this.canvas.height * sceneState.scale);
            } else {
                sceneState.drawTextAt(this.letter, drawXY.x, drawXY.y, 26, this.color);
            }
        } else {
            if (this.canvasCorpse) {
                sceneState.ctx.drawImage(this.canvasCorpse, 0, 0, this.canvasCorpse.width, this.canvasCorpse.height, drawXY.x - (.5 * this.canvasCorpse.width * sceneState.scale), drawXY.y - (.5 * this.canvasCorpse.height * sceneState.scale), this.canvasCorpse.width * sceneState.scale, this.canvasCorpse.height * sceneState.scale);
            } else {
                sceneState.drawTextAt(this.letterCorpse, drawXY.x, drawXY.y, 26, this.color);
            }
        }
    }


    setName(newName) {
        this.name = newName;
        this.clearSaveCache();
    }

    onEntityDeath() {
        // TODO: Handle this better
        this.setName("Remains of " + this.name);
    }
}