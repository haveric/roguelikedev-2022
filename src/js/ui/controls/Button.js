import sceneState from "../../SceneState";

export default class Button {
    constructor(text, callback, x = 0, y = 0, width = 0, height = 0) {
        this.text = text;
        this.callback = callback;
        this.setPosition(x, y, width, height);

        this.hover = false;
    }

    setPosition(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.x2 = this.x + this.width;
        this.y2 = this.y + this.height;
        this.centerY = (this.y + (this.height / 2));

        this.padding = 15 * sceneState.scale;
    }

    isInside(x, y) {
        return x > this.x && x < this.x2 && y > this.y && y < this.y2;
    }

    draw() {
        if (this.hover) {
            sceneState.ctx.fillStyle = "rgba(120, 120, 120, 1)";
        } else {
            sceneState.ctx.fillStyle = "rgba(100, 100, 100, 1)";
        }

        sceneState.ctx.fillRect(this.x, this.y, this.width, this.height);
        sceneState.drawTextAt(this.text, this.x + this.padding, this.centerY, 26, "black", "left");

    }
}