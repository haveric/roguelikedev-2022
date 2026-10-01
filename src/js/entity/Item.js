import _Entity from "./_Entity";
import HexUtil from "../util/HexUtil";
import sceneState from "../SceneState";
import engine from "../Engine";
import SpriteCache from "../SpriteCache";

export default class Item extends _Entity {
    constructor(args = {}) {
        args.type = "item";
        super(args);

        for (const sprite of this.sprites) {
            SpriteCache.getOrSet(sprite, this.spriteImageLoaded.bind(this));
        }
    }

    save() {
        return super.save();
    }

    clone() {
        return new Item(this.save());
    }

    allSpritesLoaded() {
        if (this.sprites.length > 0) {
            this.canvas = SpriteCache.getOrCreateCanvas(this.id, this.sprites, this.color);
        }

        engine.needsRenderUpdate = true;
    }

    draw(qOffset, rOffset) {
        const hex = this.getComponent("hex");
        const drawXY = HexUtil.getHexDrawCoords(hex, qOffset, rOffset);

        super.draw(drawXY.x, drawXY.y);

        if (this.canvas) {
            sceneState.ctx.drawImage(this.canvas, 0, 0, this.canvas.width, this.canvas.height, drawXY.x - (.5 * this.canvas.width * sceneState.scale), drawXY.y - (.5 * this.canvas.height * sceneState.scale), this.canvas.width * sceneState.scale, this.canvas.height * sceneState.scale);
        } else {
            sceneState.drawTextAt(this.letter, drawXY.x, drawXY.y, 26, this.color);
        }
    }
}