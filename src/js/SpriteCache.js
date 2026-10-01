import ColorUtil from "./util/ColorUtil";

export default class SpriteCache {
    constructor() {}

    static images = {};
    static canvases = {};

    static getOrSet(sprite, callback) {
        const self = this;
        const image = this.images[sprite.path];
        if (image) {
            sprite.image = image;
            callback.call();
        } else {
            const image = new Image();
            image.src = sprite.path;
            image.onload = () => {
                self.images[sprite.path] = image;
                sprite.image = image;
                callback.call();
            };
        }
    }

    static getOrCreateCanvas(name, sprites, defaultColor) {
        if (this.canvases[name]) {
            return this.canvases[name];
        } else {
            const firstImage = sprites[0].image;
            const width = firstImage.width;
            const height = firstImage.height;
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext("2d");

            const imageDatas = [];
            for (const sprite of sprites) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(sprite.image, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                if (sprite.color !== undefined) {
                    let color;
                    if (sprite.color === "default") {
                        color = defaultColor;
                    } else {
                        color = sprite.color;
                    }

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
                }

                imageDatas.push(imageData);
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const imageData = imageDatas[0];
            for (let i = 1; i < imageDatas.length; i++) {
                const pixels = imageData.data;
                const addPixels = imageDatas[i].data;

                for (let i = 0; i < pixels.length; i += 4) {
                    if (pixels[i + 3] === 0 && addPixels[i + 3] !== 0) {
                        pixels[i] = addPixels[i];
                        pixels[i + 1] = addPixels[i + 1];
                        pixels[i + 2] = addPixels[i + 2];
                        pixels[i + 3] = addPixels[i + 3];
                    }
                }
            }
            ctx.putImageData(imageData, 0, 0);

            this.canvases[name] = canvas;
            return this.canvases[name];
        }
    }
}