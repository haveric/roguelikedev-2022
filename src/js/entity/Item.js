import _Entity from "./_Entity";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";
import engine from "../Engine";
import ColorUtil from "../util/ColorUtil";

export default class Item extends _Entity {
    constructor(args = {}) {
        args.type = "item";
        super(args);
    }

    save() {
        return super.save();
    }

    clone() {
        return new Item(this.save());
    }

    spriteImageLoaded() {
        this.canvas = new OffscreenCanvas(this.spriteImage.width, this.spriteImage.height);
        this.ctx = this.canvas.getContext("2d");

        this.ctx.drawImage(this.spriteImage, 0, 0, this.spriteImage.width, this.spriteImage.height, 0, 0, this.canvas.width, this.canvas.height);
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const pixels = imageData.data;

        const colorRGB = ColorUtil.toRGB(this.color);

        const r = colorRGB[0] * .5;
        const g = colorRGB[1] * .5;
        const b = colorRGB[2] * .5;
        for (let i = 0; i < pixels.length; i += 4) {
            pixels[i] = pixels[i] * .5 + r;
            pixels[i + 1] = pixels[i + 1] * .5 + g;
            pixels[i + 2] = pixels[i + 2] * .5 + b;
        }

        this.ctx.putImageData(imageData, 0, 0);

        engine.needsRedraw = true;
    }

    draw(qOffset, rOffset) {
        const hex = this.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(hex, qOffset, rOffset);

        super.draw(drawXY.x, drawXY.y);

        if (this.spriteImage) {
            if (this.canvas) {
                sceneState.ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, drawXY.x - (.5 * this.canvas.width * sceneState.scale), drawXY.y - (.5 * this.canvas.height * sceneState.scale), this.canvas.width * sceneState.scale, this.canvas.height * sceneState.scale);
            }
        } else {
            sceneState.drawTextAt(this.letter, drawXY.x, drawXY.y, 26, this.color);
        }
    }
}