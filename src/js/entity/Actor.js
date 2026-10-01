import _Entity from "./_Entity";
import sceneState from "../SceneState";
import HexUtil from "../util/HexUtil";
import CustomFov from "../map/fov/CustomFov";
import engine from "../Engine";
import SpriteCache from "../SpriteCache";
import ObjectUtil from "../util/ObjectUtil";
import Extend from "../util/Extend";

export default class Actor extends _Entity {
    constructor(args = {}) {
        args.type = "actor";
        super(args);

        this.fov = new CustomFov();

        this.corpseSprites = args.corpseSprites || [];
        this.numSprites = this.sprites.length + this.corpseSprites.length;

        for (const sprite of this.sprites) {
            SpriteCache.getOrSet(sprite, this.spriteImageLoaded.bind(this));
        }

        for (const sprite of this.corpseSprites) {
            SpriteCache.getOrSet(sprite, this.spriteImageLoaded.bind(this));
        }
    }

    clone() {
        return new Actor(this.save());
    }

    save() {
        if (this.cachedSave !== null) {
            return this.cachedSave;
        }

        const spritesJson = [];
        for (const sprite of this.sprites) {
            const spriteJson = {};
            spriteJson.path = sprite.path;
            if (sprite.color) {
                spriteJson.color = sprite.color;
            }
            spritesJson.push(spriteJson);
        }

        const corpseSpritesJson = [];
        for (const sprite of this.corpseSprites) {
            const spriteJson = {};
            spriteJson.path = sprite.path;
            if (sprite.color) {
                spriteJson.color = sprite.color;
            }
            corpseSpritesJson.push(spriteJson);
        }

        const json = {
            id: this.id,
            type: this.type,
            name: this.name,
            description: this.description,
            sprites: spritesJson,
            corpseSprites: corpseSpritesJson,
            letter: this.letter,
            color: this.color
        };

        json.components = {};
        for (const component of this.componentArray) {
            const save = component.save();
            if (!ObjectUtil.isEmpty(save)) {
                Extend.deep(json.components, save);
            }
        }

        this.cachedSave = json;
        return json;
    }

    isAlive() {
        const fighter = this.getComponent("fighter");
        return fighter && fighter.hp > 0;
    }

    allSpritesLoaded() {
        if (this.sprites.length > 0) {
            this.canvas = SpriteCache.getOrCreateCanvas(this.id, this.sprites, this.color);
        }
        if (this.corpseSprites.length > 0) {
            this.canvasCorpse = SpriteCache.getOrCreateCanvas(this.id + "-corpse", this.corpseSprites, this.color);
        }

        engine.needsRenderUpdate = true;
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